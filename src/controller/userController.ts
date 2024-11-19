import { Request, Response } from 'express';
import { User } from '../entity/User';
import { AppDataSource } from '../config/database';

export const getUsers = async (req: Request, res: Response) => {
    try {
        const userRepository = AppDataSource.getRepository(User);
        const users = await userRepository.find();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users' });
    }
};

// Create a new user
export const createUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const userRepository = AppDataSource.getRepository(User);
        const user = new User();
        user.email = email;
        user.password = password;

        await userRepository.save(user);
        res.status(201).json(user);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Error creating user' });
    }
};
