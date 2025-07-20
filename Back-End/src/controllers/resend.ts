import { Request, Response } from 'express';
import User from '../models/Users';

export const emailConfirmation = async (req: Request, res: Response): Promise<void> => {

    const { emailToken } = req.query;

    if (!emailToken || typeof emailToken !== 'string') {
        res.status(400).json({ message: "Invalid or missing email token" });
        return;
    }

    const user = await User.findOne({
        emailToken,
        emailTokenExpires: { $gt: new Date() },
    });

    if (!user) {
        res.status(404).json({ message: "Token expired or invalid" });
        return;
    }

    user.isVerified = true;
    user.emailToken = undefined;
    user.emailTokenExpires = undefined;

    await user.save();
    res.send("Email confirmed successfully. You can now log in.");

    // Proceed with email confirmation logic
}