import { Request, Response } from 'express';
import { User } from '../entity/User';  // Make sure the import path is correct
import { AppDataSource } from '../config/database';  // Import your AppDataSource configuration

// Get all users
export const getUsers = async (req: Request, res: Response) => {
    try {
        const userRepository = AppDataSource.getRepository(User);  // Get the repository for User entity
        const users = await userRepository.find();  // Use the repository to fetch all users
        res.json(users);  // Send the users as a JSON response
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users' });
    }
};

// Create a new user
export const createUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const userRepository = AppDataSource.getRepository(User);  // Get the repository for User entity
        const user = new User();  // Create a new instance of the User entity
        user.email = email;
        user.password = password;

        await userRepository.save(user);  // Save the new user to the database using the repository
        res.status(201).json(user);  // Respond with the created user
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Error creating user' });
    }
};
