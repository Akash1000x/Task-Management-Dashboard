import jwt from "jsonwebtoken";
import { Response } from "express";

/**
 * Create a JWT token for the user
 * @param userId User ID to be included in the token
 * @returns returns the created JWT token
 */
export const createJWT = (res: Response, userId: string) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });

  return token;
};
