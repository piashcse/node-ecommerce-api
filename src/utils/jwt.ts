import jwt from "jsonwebtoken";

export interface JwtPayload {
  email: string;
  password: string;
}

export const verifyToken = (token: string): JwtPayload => {
  const secret = process.env.JWT_SECRET || "your-secret-key";
  try {
    const decoded = jwt.verify(token, secret);
    return decoded as JwtPayload;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};

export const generateToken = (
  email: string,
  password: string,
  role: string,
): string => {
  const payload = {
    email: email,
    password: password,
    role: role,
  };

  // Define the expiration time (e.g., 1 hour)
  const expiresIn = "1h";
  return jwt.sign(payload, process.env.JWT_SECRET || "your-secret-key", {
    expiresIn,
  });
};
