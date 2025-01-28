import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { createIncome, getIncome } from "../controller/income.controller.js";

const router = express.Router();

router.post("/create", verifyToken, createIncome);
router.get("/get-income/:incomeSlug", verifyToken, getIncome);

export default router;
