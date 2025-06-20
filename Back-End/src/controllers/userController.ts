import { Request, Response } from "express";
import User from "../models/Users";
import { validationResult } from "express-validator";
import { comparePassword } from "../util/bcypt";

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }

    try {
        const {
            fullName,
            email,
            password,
            profilePicture,
            bio,
            experience
        } = req.body;

        if (!fullName || !email || !password) {
            res.status(400).json({ message: "You left required fields" });
            return;
        }

        const userExist = await User.findOne({ email });
        if (userExist) {
            res.status(409).json({ message: "User already exists" });
            return;
        }

        const newUser = new User({
            fullName,
            email,
            password,
            ...(profilePicture && { profilePicture }),
            ...(bio && { bio }),
            ...(experience && { experience })
        });

        await newUser.save();

            res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePicture: newUser.profilePicture || "",
                bio: newUser.bio || "",
                experience: newUser.experience || [],
                createdAt: newUser.createdAt,
            },
        });
    } catch (error) {
        console.error("Error registering user: ", error);
        res.status(500).json({ message: "Server error", error });
    }
};


// login code
export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    };

    try{
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ message: "You left required fields" });
            return;
        }

        const user = await User.findOne({ email });
        
        if(!user){
            res.status(401).json({ message: "Invalid email or password" });
            return;
        };

        const isMatch = comparePassword(password, user.password);
        if (!isMatch) {
            res.status(401).json({ message: "Invalid email or password" });
            return;
        }

        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                profilePicture: user.profilePicture || "",
                bio: user.bio || "",
                experience: user.experience || [],
                createdAt: user.createdAt,
            },
        });

    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Server error", error });
    };
};
