// src/types/express.d.ts
declare namespace Express {
    export interface Request {
        user?: { email: string; password: string }; // Define the structure of your user object
    }
}
