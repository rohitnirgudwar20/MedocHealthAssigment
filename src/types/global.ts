// import { Request } from "express";
import mongoose from "mongoose";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: mongoose.Types.ObjectId;
        role: "user" | "admin";
        email: string;
      };
    //   headers: {
    //     authorization?: string;
    //     [key: string]: any;
    //   };
    }
  }
}
