import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createIncome,
  getIncome,
  getIncomes,
} from "../controller/income.controller.js";

const router = express.Router();

router.post("/create", verifyToken, createIncome);
router.get("/get-income/:incomeSlug", verifyToken, getIncome);
router.get("/get-incomes", verifyToken, getIncomes);

export default router;
