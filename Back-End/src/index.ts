import express from "express";
import dotenv from 'dotenv';
import connectDB from "./config/db";
import routeUser from "./routes/routeUser";
dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 5000

app.use(express.json());

app.use("/api/auth", routeUser)
app.listen(port, () => {
    console.log(`The server is connected or running on port ${port}`);
})