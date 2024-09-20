import { Request, Response } from "express";
import User, { IUser } from "../models/user";
import { createJWT } from "../utils";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password }: { name: string; email: string; password: string } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        status: false,
        message: "Please provide all the fields",
      });
    }

    const userExist: IUser | null = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({
        status: false,
        message: "User already exists",
      });
    }

    const user: IUser = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      createJWT(res, user._id as string);
      return res.status(201).json({ user, message: "User registered successfully" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ status: false, message: error instanceof Error ? error.message : "An error occurred" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password }: { email: string; password: string } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: false,
        message: "Please provide all the fields",
      });
    }

    const user: IUser | null = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({
        status: false,
        message: "Invalid email or password",
      });
    }

    createJWT(res, user._id as string);
    return res.status(200).json({ user, message: "Login successful" });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ status: false, message: error instanceof Error ? error.message : "An error occurred" });
  }
};

export const logoutUser = (req: Request, res: Response) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ status: true, message: "Logout successful" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: "Error in logout" });
  }
};
