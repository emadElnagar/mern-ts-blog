import JWT from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../models/User";

// Define the DecodedToken interface
interface DecodedToken {
  _id: string;
}

// Extend Express Request to include 'user'
export interface AuthRequest extends Request {
  user?: any;
}

// Middleware to check if the user is authenticated
export const isAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];

    try {
      const decoded = JWT.verify(
        token,
        process.env.JWT_SECRET!
      ) as DecodedToken;

      const user = await User.findById(decoded._id).select("-password");

      if (!user) {
        return res
          .status(401)
          .json({ message: "Not authorized, user not found" });
      }

      req.user = user;
      return next();
    } catch (err) {
      return res.status(401).json({ message: "Not authorized, token invalid" });
    }
  }

  return res.status(401).json({ message: "Not authorized, no token" });
};

// Middleware to check if the user is an admin
export const isAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): any => {
  if (req.user && req.user.role === "admin") {
    return next();
  } else {
    return res.status(403).json({ message: "Access denied" });
  }
};

export const generateToken = (user: {
  _id: object;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}) => {
  return JWT.sign(
    {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "1h",
    }
  );
};
