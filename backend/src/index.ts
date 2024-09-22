import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import routes from "./routes/index";
import { connectDB } from "./db";

const app = express();
const PORT = process.env.PORT || 8000;

/**
 * Middlewares
 */
app.use(
  cors({
    origin: ["http://localhost:3000", "https://task-management-dashboard-mu.vercel.app"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

/**
 * Connect to the MongoDB database
 */
connectDB();

/**
 * Health check route
 */
app.get("/", (req, res) => {
  return res.status(200).json({ message: "Server is running" });
});

/**
 * Base route
 */
app.use("/api/v1", routes);

/**
 * Start the server
 */
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
