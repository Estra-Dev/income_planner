import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { connectDB } from "./config/db.js";
import authRoute from "./routes/auth.routes.js";
import incomeRouter from "./routes/income.routes.js";
import planRouter from "./routes/plans.routes.js";
import reviewRouter from "./routes/review.routes.js";
import path from "path";

const __dirname = path.resolve();

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/income", incomeRouter);
app.use("/api/plan", planRouter);
app.use("/api/review", reviewRouter);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server error";
  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
