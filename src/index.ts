import express, { Request, Response } from "express";
import dotenv from "dotenv";
import dbConnect from "./config/config";
import userRoutes from "./routes/userRoutes";
import noteRoutes from "./routes/noteRoutes";
import adminRoutes from "./routes/adminRoutes";
import "./types/global";

const app = express();

dotenv.config();
dbConnect();

const PORT = process.env.PORT || 6500;

app.use(express.json());

app.use("/api/auth", userRoutes); //User:-for  Authentication {both user And Admin}

app.use("/api", noteRoutes); //for {creating, updating and deleting } notes

app.use("/api", adminRoutes); // for admin
app.listen(PORT, () => {
  console.log(`Sever started successfullt at ${PORT}`);
});

app.get("/", (req, res) => {
  res.send(`<h1> This is Homepage </h1>`);
});
