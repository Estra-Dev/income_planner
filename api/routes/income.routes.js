import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { createIncome } from "../controller/income.controller.js";

const router = express.Router();

router.post("/create/:userId", verifyToken, createIncome);

export default router;
