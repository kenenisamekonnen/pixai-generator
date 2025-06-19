import { Request, Response } from "express";
import User from "../models/Users";

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    try{
        const {
            fullName,
            email,
            password,
            profilePicture,
            bio,
            experience
        } = req.body;

        //validating if required fields exist
        if (!fullName || !email || !password) {
            res.status(400).json({ message: "you left required fields"});
        };

        // checking if user exist
        const userExist = await User.findOne({ email });
        if (userExist) {
            res.status(409).json({ message: "User already exist"});
        };

        const newUser = new User({
            fullName,
            email,
            password,
            ...(profilePicture && { profilePicture }),
            ...(bio && { bio }),
            ...(experience && { experience })
        });

        await newUser.save();

        res.status(201).json({ message: "User registered successfully" ,
            user: {
                id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePicture: newUser.profilePicture || "",
                bio: newUser.profilePicture || "",
                experience: newUser.experience || [],
                createdAt: newUser.createdAt,
            },
        });
    } catch (error){
        console.error("Error registering user: ", error);
        res.status(500).json({ message: "server error", error });
    }
}