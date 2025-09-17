import { Router } from "express";
import { body } from "express-validator";
import { registerUser, loginUser, userCredit } from "../controllers/userController";
import { protect } from "../middleware/auth";
import { getUserProfile } from "../controllers/userGetting";
import { refreshAccessToken } from "../middleware/refreshtoken";
import { logoutUser } from "../controllers/logout";
import { googleAuth } from "../controllers/googleAuthController";

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

router.post("/google", async (req, res, next) => {
  try {
    await googleAuth(req, res);
  } catch (err) {
    next(err);
  }
}); // new Google login/signup

// router.post("/refresh", refreshAccessToken);
// router.post("/logout", logoutUser);
// router.get("/profile", protect, getUserProfile);

router.get('/credits', protect, userCredit);

export default router;