import express from "express";
const router = express.Router();
import { authMiddleware, adminMiddleware } from "../middlewares/middlewares";
import {
  deleteUserProfile,
  getallNotes,
  getAllUserProfiles,
  getUserDetail,
  getUserNotes,
} from "../controllers/admincontroller";

router.get("/users", authMiddleware, adminMiddleware, getAllUserProfiles);
router.get("/users/:id", authMiddleware, adminMiddleware, getUserDetail);
router.delete("/user/:id", authMiddleware, adminMiddleware, deleteUserProfile);
router.get("/audit/notes/:id", authMiddleware, adminMiddleware, getUserNotes);

//extra Added :- All notes only fetch  by the Admin only
router.get("/audit/notes", authMiddleware, adminMiddleware, getallNotes);
export default router;
