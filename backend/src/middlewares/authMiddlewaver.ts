import User from "../models/user.js";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const verifyJWT = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      return res.status(401).json({ status: false, message: "No token provided" });
    }
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ status: false, message: "Not authorized. Try login again." });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };

    const user = await User.findById(decodedToken?.userId).select("-password");

    if (!user) {
      return res.status(401).json({ status: false, message: "Not authorized. Try login again." });
    }

    req.user = user;
    next();
  } catch (error: any) {
    console.log(error);

    return res.status(401).json({ status: false, message: "Not authorized. Try login again." });
  }
};
