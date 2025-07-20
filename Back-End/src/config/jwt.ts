import dotenv from "dotenv";

dotenv.config();

export const JWT_SECRET =  process.env.JWT_SECRET;
export const REFRESH_SECRET = process.env.REFRESH_SECRET || "fallback_refresh_secret";
export const REFRESH_EXPIRES_IN = "7d";
export const JWT_EXPIRES_IN = "7d";