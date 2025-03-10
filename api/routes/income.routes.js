import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createIncome,
  deleteIncome,
  editIncome,
  getIncome,
  getIncomes,
} from "../controller/income.controller.js";

const router = express.Router();

router.post("/create", verifyToken, createIncome);
router.get("/get-income/:incomeSlug", verifyToken, getIncome);
router.get("/get-incomes", verifyToken, getIncomes);
router.delete("/deleteincome/:incomeId/:userId", verifyToken, deleteIncome);
router.put("/editincome/:incomeId/:userId", verifyToken, editIncome);

export default router;
