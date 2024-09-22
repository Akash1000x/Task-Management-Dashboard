import jwt from "jsonwebtoken";
import { Response } from "express";

export const createJWT = (res: Response, userId: string) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });

  return token;
};
