import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URL}/image`);
        console.log("mongoDB connected");
    } catch (error) {
        console.error("Error connecting mongoDB", error);
        process.exit(1);
    }
};

export default connectDB;
process.env.MONGO_URL as string