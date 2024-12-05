import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";

export const authenticateCustomerJWT = (
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
    const user = verifyToken(token);
    if (user.role !== "CUSTOMER") {
      return res.status(403).json({ message: "Access denied for non-CUSTOMER role" });
    }

    req.user = user; // Attach decoded user info to the request
    next(); // Proceed to the next middleware or route
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

export const authenticateSellerJWT = (
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
    const user = verifyToken(token);
    if (user.role !== "SELLER") {
      return res.status(403).json({ message: "Access denied for non-SELLER role" });
    }

    req.user = user; // Attach decoded user info to the request
    next(); // Proceed to the next middleware or route
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
