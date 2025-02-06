import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createPlan,
  deletePlan,
  editPlan,
  getPlans,
} from "../controller/plan.controller.js";

const router = express.Router();

router.post("/create/:incomeId", verifyToken, createPlan);
router.get("/get-plans", verifyToken, getPlans);
router.delete("/deleteplan/:planId/:userId", verifyToken, deletePlan);
router.put("/editplan/:planId/:userId", verifyToken, editPlan);

export default router;
