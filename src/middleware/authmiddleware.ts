import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    // Verify the token and get decoded user info
    req.user = verifyToken(token);
    next(); // Proceed to the next middleware or route
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
