import { Request, Response } from "express"
import User from "../models/Users";
import FromData from "form-data";
import axios from "axios";
import dotenv from 'dotenv';
import { AuthenticateRequest } from "../middleware/auth";

dotenv.config();

export const generateImage = async (req: AuthenticateRequest, res: Response): Promise<void> => {
    try {

        const  userId  = req.userId;
        const {prompt} = req.body;

        const user = await User.findById(userId);
        if (!user || !prompt) {
            res.status(401).json({ success: false, message: "missing Detail"});
            return;
        };

        if (user.creditBalance === 0 || user.creditBalance < 0){
            res.status(401).json({ success: false, message: "No credit balance", creditBalance: user.creditBalance});
            return;
        }

        const formData = new FromData();
        formData.append("prompt", prompt);

        const {data} = await axios.post('https://clipdrop-api.co/text-to-image/v1', formData, {
            headers: {
                'x-api-key': process.env.CLIPDROP_API_KEY || ''
            },
            responseType: 'arraybuffer'
        });

        const base64Image = Buffer.from(data, 'binary').toString('base64');
        const resultImage = `data:image/png;base64, ${base64Image}`;
        console.log(resultImage);
        if (!resultImage) {
            res.status(400).json({ success: false, message: "Image generation failed"});
            return;
        }
        await User.findByIdAndUpdate(user._id, { creditBalance: user.creditBalance - 1})
        // creditBalance: user.creditBalance-1 -> this has to be in serted with resultImage res
        res.status(200).json({ success: true, message: "Image Generated", creditBalance: user.creditBalance-1, resultImage});

    } catch (error: any) {
        console.log(error.message);
        res.status(400).json({ success: false, message: error.message});
    }
}