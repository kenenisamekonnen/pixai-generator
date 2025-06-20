import { Router } from "express";
import { body } from "express-validator";
import { registerUser, loginUser } from "../controllers/userController";

const router = Router();

router.post("/register", [
    body("fullName").notEmpty().withMessage("Full name is required"),
    body("email").notEmpty().withMessage("Invalid email"),
    body("password").isLength({ min: 6}).withMessage("Password too short")
], registerUser);

router.post("/login", [
    body("email").notEmpty().withMessage("Invalid email"),
    body("password").isLength({ min: 6 }).withMessage("password too short")
], loginUser)


export default router;