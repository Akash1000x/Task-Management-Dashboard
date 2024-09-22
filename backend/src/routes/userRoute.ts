import express from "express";
import { verifyJWT } from "../middlewares/authMiddlewaver";
import { getCurrentUser, loginUser, registerUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.get("/current-user", verifyJWT, getCurrentUser);
router.post("/login", loginUser);

export default router;
