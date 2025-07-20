import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/jwt";

interface JwtPayload {
    id: string;
};

// export interface AuthenticateRequest extends Request {
//     userId?: string;
// };
export interface AuthenticateRequest extends Request {
  userId?: string;
}

export const protect = (req: AuthenticateRequest, res: Response, next: NextFunction): void => {

    if (!JWT_SECRET){
        throw new Error("JWT_SECRET is not defined in environment variables");
    };

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        res.status(401).json({ message: "No Authorized, no token"});
        return;
    };

    const token = authHeader.split(" ")[1];

    try {
        
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
        req.userId = decoded.id;
        next();
    } catch (error) {
        res.status(401).json({ message: "Not authorized, token failed"});
    };
};