import express from "express";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ Message: "Welcome" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
