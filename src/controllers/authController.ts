import { Request, Response, RequestHandler } from "express";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import User from "../models/userModels";
import dotenv from "dotenv";

dotenv.config();

export const signup: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res
        .status(400)
        .json({ success: false, message: "Email already exists " });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    res
      .status(201)
      .json({ success: true, message: "User register successfully" });
    return;
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: " Error registering User" });
    return;
  }
};

export const login: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ success: false, message: "Invalid Credentials" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ success: false, message: "Password not matched" });
      return;
    }

    const payload = { id: user._id, role: user.role, email: user.email };
    const token = Jwt.sign(payload, process.env.SECRET_KEY as string, {
      expiresIn: "72h",
    });
    res
      .status(200)
      .json({ success: true, message: "Login successfully", token: token });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error logging in" });
    return;
  }
};
