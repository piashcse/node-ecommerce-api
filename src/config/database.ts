import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import {User} from "../entity/User";
import {Product} from "../entity/Product";

dotenv.config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME ,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,  // Automatically create database tables
    logging: false,
    entities: [
         User,
         Product
    ],
    subscribers: [],
    migrations: [],
});
