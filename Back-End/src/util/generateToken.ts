import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN, REFRESH_SECRET, REFRESH_EXPIRES_IN } from "../config/jwt";

export const generateToken = (userId: string, email: string): string => {
    if (!JWT_SECRET){
        throw new Error("JWT_SECRET is not defined in environment variables");
    };

    return jwt.sign({ id: userId, email: email }, 
        JWT_SECRET, 
        { expiresIn: JWT_EXPIRES_IN } 
    );
};

export const generateRefreshToken = (userId: string, email: string): string => {
    return jwt.sign({ id: userId, email: email }, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES_IN });
};
