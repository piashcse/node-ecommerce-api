import 'reflect-metadata';  // Required for TypeORM decorators
import express from 'express';
import { AppDataSource } from './config/database';  // Import AppDataSource
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello, World! API is working');
});

// Initialize database connection
AppDataSource.initialize()
    .then(() => {
        console.log('Database connected successfully');

        // Register routes
        app.use('/users', userRoutes);

        // Define the port and start the server
        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
        });
    })
    .catch((error) => {
        console.error('Database connection error:', error);
    });
