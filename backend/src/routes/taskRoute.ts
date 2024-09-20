import express from "express";
import { createTask, deleteTask, getTasks, updateTask } from "../controllers/taskController";
import { verifyJWT } from "../middlewares/authMiddlewave";

const router = express.Router();

router.post("/create", verifyJWT, createTask);
router.get("/getTasks", verifyJWT, getTasks);
router.put("/update/:id", verifyJWT, updateTask);
router.put("/delete/:id", verifyJWT, deleteTask);

export default router;
