import User from "../models/user.js";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

/**
 * Verify the JWT token and if it is verified, call the next middleware
 *
 * @param next if the token is verified, call the next middleware
 * @returns if the token is not verified, return an error response to the user and stop the execution of the next middleware
 */
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

    /**
     * Verify the token
     */
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };

    /**
     * Find the user with the ID from the token
     */
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
