import { Request, RequestHandler, Response } from "express";
import mongoose from "mongoose";
import Note from "../models/notesModel";
import User from "../models/userModels";

interface CreateNoteRequest extends Request {
  body: {
    title: string;
    description: string;
    status: string;
    userId: mongoose.Types.ObjectId;
  };
}
export const createNotes: RequestHandler = async (
  req: CreateNoteRequest,
  res: Response
) => {
  try {
    const { title, description, status } = req.body;
    const userId = req.user?.id; //this one chnages had been made
    console.log("Authenticated User ID:", userId);
    //  const userExists = await User.findById(userId);
    // if (!userExists) {
    //   return res.status(400).json({ success: false, message: "Invalid user ID" });
    // }
    const newNote = new Note({
      title,
      description,
      status,
      userId: new mongoose.Types.ObjectId(userId),
      date: new Date(),
    });
    await newNote.save();
    res
      .status(201)
      .json({ success: true, message: "Note created Successfully" });
    console.log(newNote);
    return;
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error Note not created " });
  }
};

export const getMyallNotes: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user?.id;
    console.log("Authenticated User:", userId);

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
    console.log("Fetched notes", notes);

    res.status(200).json({ success: true, notes });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error fetching notes" });
    return;
  }
};



export const updateNote: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const noteId = req.params.id;
    const userId = req.user?.id;
    if (!userId) {
      res
        .status(401)
        .json({ success: false, message: "User not authenticated" });
      return;
    }
    const note = await Note.findOne({
      _id: noteId,
      userId: new mongoose.Types.ObjectId(userId),
    });
    if (!note) {
      res.status(404).json({ success: false, message: "Note not found" });
    }
    const { title, description, status } = req.body;
    note.title = title || note.title;
    note.description = description || note.description;
    note.status = status || note.status;
    await note.save();
    res
      .status(200)
      .json({ success: true, message: "Note updated succeessfully", note });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error updating note" });
  }
};

export const deleteNote: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const noteId = req.params.id;
    const userId = req.user?.id;
    if (!userId) {
      res
        .status(401)
        .json({ success: false, message: "User is not authenticated" });
      return;
    }
    const note = await Note.findOne({
      _id: noteId,
      userId: new mongoose.Types.ObjectId(userId),
    });
    if (!note) {
      res.status(404).json({ success: false, message: "Note not found" });
      return;
    }
    await Note.deleteOne({ _id: noteId });
    res
      .status(200)
      .json({ success: true, message: "Note deleted successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error while deleting the notes" });
  }
};




export const getUserNotess: RequestHandler = async (
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

    console.log("Fetched notes", notes);

    res.status(200).json({ success: true, notes });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error fetching notes" });
    return;
  }
};


// export const getUserNotes: RequestHandler = async (
//   req: Request,
//   res: Response
// ) => {
//   try {
//     const userId = req.params.id;

//     if (!userId) {
//       res
//         .status(401)
//         .json({ success: false, message: "User  not authenticated" });
//       return;
//     }

//     console.log("Attempting to fetch notes for User ID:", userId);
//     const notes = await Note.find({
//       userId: new mongoose.Types.ObjectId(userId),
//     });

//     console.log("Fetched notess", notes);
    
//     res.status(200).json({ success: true, notes });
//     return;
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: "Error fetching notes" });
//     return;
//   }
// };

// export const deleteUserProfile: RequestHandler = async (
//   req: Request,
//   res: Response
// ) => {
//   try {
//     const userId = req.params.id;
//     if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
//       res
//         .status(401)
//         .json({ success: false, message: "User is not Available" });
//       return;
//     }

//     const user = await User.findOne( {_id:userId} );
//     if (!user) {
//       res.status(404).json({ success: false, message: "User not found" });
//       return;
//     }
//     await User.findByIdAndDelete(userId);
//     res
//       .status(200)
//       .json({ succeess: true, message: "User profile Deleted Succesfully" });
//     return;
//   } catch (error) {
//     console.log(error);
//     res
//       .status(500)
//       .json({ success: false, message: "Error deleting user profile" });
//   }
// };



// export const getallNotes: RequestHandler = async (
//   req: Request,
//   res: Response
// ) => {
//   try {
//     //   const {userId} = req.body;
//     const notes = await Note.find().populate("userId", "email");
//     // const notes = await Note.find();

//     res.status(200).json({ success: true, notes });
//     return;
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: "Error fetching notes" });
//     return;
//   }
// };
