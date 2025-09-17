import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import User from "../models/Users";
import { generateToken } from "../util/generateToken";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleAuth = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ message: "Google token required" });
    }

    // Verify token with Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      return res.status(400).json({ message: "Invalid Google token" });
    }

    const { sub, email, name, picture } = payload;

    // Look for user by email first (could have signed up with credentials)
    let user = await User.findOne({ email });

    if (!user) {
      // New Google user
      user = await User.create({
        googleId: sub,
        email,
        fullName: name,
        picture,
      });
    } else if (!user.googleId) {
      // Link existing credential account to Google
      user.googleId = sub;
      user.picture = picture;
      await user.save();
    }

    // Generate JWT (same as credential flow)
    const jwtToken = generateToken(String(user._id), user.email);

    res.json({
      message: "Google login successful",
      token: jwtToken,
      user: {
        id: user._id,
        email: user.email,
        name: user.fullName,
        picture: user.picture,
      },
    });
  } catch (err) {
    console.error("Google Auth Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
