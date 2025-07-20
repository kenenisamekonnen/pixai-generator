import express from "express";
import { generateImage } from "../controllers/imageController";
import { Router } from "express";
import { protect } from "../middleware/auth";

const imageRouter = Router();

imageRouter.post("/generate-image", protect, generateImage);

export default imageRouter;