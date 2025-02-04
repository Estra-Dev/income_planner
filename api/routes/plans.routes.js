import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createPlan,
  deletePlan,
  getPlans,
} from "../controller/plan.controller.js";

const router = express.Router();

router.post("/create/:incomeId", verifyToken, createPlan);
router.get("/get-plans/:incomeId", verifyToken, getPlans);
router.delete("/deleteplan/:planId", verifyToken, deletePlan);

export default router;
