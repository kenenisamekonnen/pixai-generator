import { Response } from "express";
import User from "../models/Users";
import { AuthenticateRequest } from "../middleware/auth";

export const getUserProfile = async (req: AuthenticateRequest, res: Response): Promise<void> => {
    try {
        const user = await User.findById(req.userId).select("-password");
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
