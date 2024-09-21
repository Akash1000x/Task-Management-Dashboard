import express from "express";
import { verifyJWT } from "../middlewares/authMiddlewave";
import { getCurrentUser, loginUser, logoutUser, registerUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.get("/current-user", verifyJWT, getCurrentUser);
router.post("/login", loginUser);
router.post("/logout", verifyJWT, logoutUser);

export default router;
