import { Request, Response } from 'express';
import { User } from '../entity/User';
import { AppDataSource } from '../config/database';
import bcrypt from 'bcryptjs';
import { generateToken } from "../utils/jwt";

export const getUsers = async (req: Request, res: Response) => {
    try {
        const userRepository = AppDataSource.getRepository(User);
        const users = await userRepository.find();

        res.json(users.map((user: User) => {
            return {
                id: user.id,
                email: user.email,
            }
        }));
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users' });
    }
};

// Create a new user
export const createUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);  // 10 rounds of salt

        const userRepository = AppDataSource.getRepository(User);
        const user = new User();
        user.email = email;
        user.password = hashedPassword;

        await userRepository.save(user);
        res.status(201).json(user.email);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Error creating user' });
    }
};

// Login user and generate JWT token
export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

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

        // Generate JWT token
        const token = generateToken(user.email, user.password);

        res.status(200).json({ accessToken: token });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Error logging in user' });
    }
};
