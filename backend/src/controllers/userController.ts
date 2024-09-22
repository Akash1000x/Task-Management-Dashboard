import { Request, Response } from "express";
import User, { IUser } from "../models/user";
import { createJWT } from "../utils";

/**
 * register the user in the database
 *
 * @returns return the user and the token if the user is registered successfully
 */
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password }: { name: string; email: string; password: string } = req.body;

    /**
     * Check if the fields are provided or not if not return an error response
     */
    if (!name || !email || !password) {
      return res.status(400).json({
        status: false,
        message: "Please provide all the fields",
      });
    }

    /**
     * Check if the user already exists in the database or not if exists return an error response
     */
    const userExist: IUser | null = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({
        status: false,
        message: "User already exists",
      });
    }

    /**
     * Create a new user in the database
     */
    const user: IUser = await User.create({
      name,
      email,
      password,
    });

    /**
     * If the user is created successfully, create a JWT token and return the user and the token
     */
    if (user) {
      const token = createJWT(res, user._id as string);
      return res.status(201).json({ user, token, message: "User registered successfully" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ status: false, message: error instanceof Error ? error.message : "An error occurred" });
  }
};

/**
 * login the user by checking the email and password
 *
 * @returns return the user and the token if the user is logged in successfully
 */
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password }: { email: string; password: string } = req.body;

    /**
     * Check if the fields are provided or not if not return an error response
     */
    if (!email || !password) {
      return res.status(400).json({
        status: false,
        message: "Please provide all the fields",
      });
    }

    const user: IUser | null = await User.findOne({ email });

    /**
     * If the user does not exist in the database or the password is incorrect return an error response
     */
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({
        status: false,
        message: "Invalid email or password",
      });
    }

    /**
     * If the user is logged in successfully, create a JWT token and return the user and the token
     * to the client
     *
     */
    const token = createJWT(res, user._id as string);
    return res.status(200).json({ user, token, message: "Login successful" });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ status: false, message: error instanceof Error ? error.message : "An error occurred" });
  }
};

/**
 * get the current user details
 *
 * @returns return the current user details
 */
export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    if (req.user) {
      return res.status(200).json({ user: req.user });
    }
    return res.status(404).json({ message: "User not found" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "An error occurred" });
  }
};
