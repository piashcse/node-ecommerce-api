import { Request, Response } from 'express';
import { User } from '../entity/User';
import { AppDataSource } from '../config/database';
import bcrypt from 'bcryptjs';
import { generateToken } from "../utils/jwt";

// Get all users
export const getUsers = async (req: Request, res: Response) => {
    try {
        const userRepository = AppDataSource.getRepository(User);
        const users = await userRepository.find();

        res.json(users.map((user: User) => ({
            id: user.id,
            email: user.email,
            role: user.role,
        })));
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users' });
    }
};

// Create a new user
export const createUser = async (req: Request, res: Response) => {
    const { email, password, role } = req.body;

    if (!["CUSTOMER", "SELLER"].includes(role)) {
        return res.status(400).json({ message: 'Invalid role. Use CUSTOMER or SELLER.' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10); // 10 rounds of salt

        const userRepository = AppDataSource.getRepository(User);
        const user = new User();
        user.email = email;
        user.password = hashedPassword;
        user.role = role;

        await userRepository.save(user);
        res.status(201).json({ email: user.email, role: user.role });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Error creating user' });
    }
};

// Login user and generate JWT token
export const loginUser = async (req: Request, res: Response) => {
    const { email, password, role } = req.body;

    try {
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOneBy({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare provided password with stored hash
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        if (role != user.role){
            return res.status(401).json({ message: 'Invalid role' });
        }

        // Generate JWT token with role included
        const token = generateToken(user.email, user.password, user.role);

        res.status(200).json({ accessToken: token, role: user.role });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Error logging in user' });
    }
};
