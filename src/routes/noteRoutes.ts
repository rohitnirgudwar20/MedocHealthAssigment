import express from "express";
const router = express.Router();
import {
  createNotes,
  deleteNote,
  getMyallNotes,
  updateNote,
} from "../controllers/notesController";
import { adminMiddleware, authMiddleware } from "../middlewares/middlewares";

router.post("/notes", authMiddleware, createNotes);
router.get("/notes", authMiddleware, getMyallNotes);
router.put("/notes/:id", authMiddleware, updateNote);
router.delete("/notes/:id", authMiddleware, deleteNote);
export default router;
