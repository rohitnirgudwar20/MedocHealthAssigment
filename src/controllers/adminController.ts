import { Request, Response, RequestHandler } from "express";
import User from "../models/userModels";
import Note from "../models/notesModel";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

export const getAllUserProfiles: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const users = await User.find({}, { name: 1, _id: 1 });
    if (users.length === 0) {
      res.status(404).json({ success: false, message: "No users found" });
      return;
    }

    res.status(200).json({ success: true, users });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching user profiles" });
  }
};



export const getUserDetail: RequestHandler = async (req, res) => {
    try {
      const userId = req.params.id;
  
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        res.status(400).json({ success: false, message: "Invalid user ID format" });
        return;
      }
  
      const user = await User.findById(userId, { _id: 1, name: 1, email: 1,role:1 });
  
      if (!user) {
        res.status(404).json({ success: false, message: "User not found" });
        return;
      }
  
      res.status(200).json({
        success: true,
        user: { id: user._id.toString(), name: user.name, email: user.email,role:user.role },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Error fetching user profile" });
    }
  };
  


  export const getUserNotes: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
    try {
      const userId = req.params.id;
  
      if (!userId) {
        res
          .status(401)
          .json({ success: false, message: "User  not authenticated" });
        return;
      }
  
      console.log("Attempting to fetch notes for User ID:", userId);
      const notes = await Note.find({
        userId: new mongoose.Types.ObjectId(userId),
      });
  
      console.log("Fetched notess", notes);
      
      res.status(200).json({ success: true, notes });
      return;
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Error fetching notes" });
      return;
    }
  };


  export const deleteUserProfile: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
    try {
      const userId = req.params.id;
      if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
        res
          .status(401)
          .json({ success: false, message: "User is not Available" });
        return;
      }
  
      const user = await User.findOne( {_id:userId} );
      if (!user) {
        res.status(404).json({ success: false, message: "User not found" });
        return;
      }
      await User.findByIdAndDelete(userId);
      res
        .status(200)
        .json({ succeess: true, message: "User profile Deleted Succesfully",user: {name:user.name} });
      return;
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Error deleting user profile" });
    }
  };


  export const getallNotes: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
    try {
      //   const {userId} = req.body;
      const notes = await Note.find().populate("userId", "email");
      // const notes = await Note.find();
  
      res.status(200).json({ success: true, notes });
      return;
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Error fetching notes" });
      return;
    }
  };