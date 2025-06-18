import express from "express";
import dotenv from 'dotenv';
import connectDB from "./config/db";

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 5000

app.use(express.json());
app.listen(port, () => {
    console.log(`The server is connected or running on port ${port}`);
})