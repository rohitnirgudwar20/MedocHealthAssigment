import mongoose, { Document, Schema } from "mongoose";

interface Iuser extends Document {
  name: string;
  email: string;
  id: number;
  password: string;
  role: "user" | "admin";
}
const UserSchema = new mongoose.Schema<Iuser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User ||mongoose.model<Iuser>("User", UserSchema);
export default User;
