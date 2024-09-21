import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import routes from "./routes/index";
import { connectDB } from "./db";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));

connectDB();

//health check
app.get("/", (req, res) => {
  return res.status(200).json({ message: "Server is running" });
});

app.use("/api/v1", routes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
