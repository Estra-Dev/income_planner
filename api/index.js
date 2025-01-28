import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { connectDB } from "./config/db.js";
import authRoute from "./routes/auth.routes.js";
import incomeRouter from "./routes/income.routes.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

connectDB();

app.get("/", (req, res) => {
  res.json({ Message: "Welcome" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/income", incomeRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server error";
  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
