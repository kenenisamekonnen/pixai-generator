import express from "express";
import dotenv from 'dotenv';
import connectDB from "./config/db";
import routeUser from "./routes/routeUser";
import imageRouter from "./routes/imageRoutes";
import cors from "cors";
dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 5000

app.use(express.json());
app.use(cors({
  origin: "https://pixai-delta.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
}));

app.use("/api/auth", routeUser);
app.use("/api/image", imageRouter);

app.listen(port, () => {
    console.log(`The server is connected or running on port ${port}`);
})