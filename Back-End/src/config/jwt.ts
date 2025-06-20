import dotenv from "dotenv";

dotenv.config();

export const JWT_SECRET =  process.env.JWT_SECRET;
export const JWT_EXPIRES_IN = "7d";