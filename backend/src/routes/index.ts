import express from "express";
import userRoutes from "./userRoute";
import taskRoutes from "./taskRoute";

const router = express.Router();

router.use("/user", userRoutes);
router.use("/task", taskRoutes);

export default router;
