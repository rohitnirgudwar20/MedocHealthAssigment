import mongoose, { Document, Schema } from "mongoose";

interface Inotes extends Document {
  title: string;
  description: string;
  date: Date;
  status: String;
  userId: mongoose.Types.ObjectId;
}
const noteSchema = new mongoose.Schema<Inotes>(
  {
    title: { type: String, required: true },
    status: {
      type: String,
      required: true,
      enum: ["active", "archived", "deleted"],
      default: "active",
    },
    description: { type: String },
    date: { type: Date, default: Date.now },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Note =mongoose.models.Note || mongoose.model<Inotes>("Note", noteSchema);
export default Note;
