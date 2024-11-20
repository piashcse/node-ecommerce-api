import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from './config/database';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';
import productRoutes from "./routes/productRoutes";
import cartRoutes from "./routes/cartRoutes";
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger/swaggerConfig';

const app = express();
app.use(bodyParser.json());
// load swagger ui for default url
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Initialize database connection
AppDataSource.initialize()
    .then(() => {
        console.log('Database connected successfully');

        // Register routes
        app.use('/user', userRoutes);
        app.use('/product', productRoutes);
        app.use('/cart', cartRoutes);

        // Define the port and start the server
        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
        });
    })
    .catch((error) => {
        console.error('Database connection error:', error);
    });
