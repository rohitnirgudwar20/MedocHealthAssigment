import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const authMiddleware: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  // console.log("token",token);

  if (!token) {
    res.status(401).json({
      success: false,
      message: "No token provided, authorization denied",
    });
    return;
  }
  // console.log("token",token);
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY as string);
    if (typeof decoded === "string") {
      res.status(401).json({ success: false, message: "Invalid token" });
      return;
    }
    req.user = decoded as {
      id: mongoose.Types.ObjectId;
      role: "user" | "admin";
      email: string;
    };
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Token is not valid" });
    return;
  }
};

export const adminMiddleware: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }

  res
    .status(403)
    .json({ success: false, message: "Access Denied. Admins Only" });
};
