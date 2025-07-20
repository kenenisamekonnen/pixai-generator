import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { REFRESH_SECRET } from "../config/jwt";
import { generateToken } from "../util/generateToken";

export const refreshAccessToken = (req: Request, res: Response): void => {
    
    const token = req.cookies.refreshToken;

    if (!token) {
        res.status(401).json({ message: "No refresh token provided" });
        return;
    }

    try {
        const decoded = jwt.verify(token, REFRESH_SECRET) as { id: string, email: string };
        const newAccessToken = generateToken(decoded.id, decoded.email);

        res.status(200).json({ accessToken: newAccessToken });
    } catch (error) {
        res.status(403).json({ message: "Invalid refresh token" });
    }
};
