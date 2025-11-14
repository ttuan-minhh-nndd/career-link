// (Authorization): This file's job is to CHECK things. It protects routes.

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'; 
import { db } from '../config/db';
import { users } from '../models/schema';
import { eq } from 'drizzle-orm';

// Extend the Express Request type to have a 'user' property 
/**
 * What it is: This is a note for TypeScript only.
 * Human Language: This code tells TypeScript, "Hey, you know that req (request) object? I'm going to add a special 'back pocket' to it called user. If I put anything in that pocket, it will be an object with the user's id, name, email, and role."
 * Why? We do this so that later, when we write req.user = ..., TypeScript doesn't get confused and say, "Hey! That req object doesn't have a user pocket!"
 */
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: number;
                name: string; 
                email: string; 
                role: string; 
            }; 
        }
    }
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
    let token;

    // Check for token in the 'Authorization' header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header (e.g., "Bearer <token>")
            token = req.headers.authorization.split(' ')[1]; 

            // Verify token 
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };

            // Get user from the token's id
            // We select only the non-sensitive fields
            const userResult = await db 
                .select({
                    id: users.id, 
                    name: users.name, 
                    email: users.email,
                    role: users.role, 
                })
                .from(users)
                .where(eq(users.id, decoded.id)); 
            
            if (userResult.length === 0) {
                return res.status(401).json({ message: "Not authorized, user not found" }); 
            }

            // Attach user to the request object
            req.user = userResult[0]; 

            // Continue to the next middleware/controller
            next(); 
        } catch (error) {
            console.error(error); 
            return res.status(401).json({ message: 'Not authorized, token failed' }); 
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' }); 
    }
};