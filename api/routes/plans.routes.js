import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { createPlan, getPlans } from "../controller/plan.controller.js";

const router = express.Router();

router.post("/create/:incomeId", verifyToken, createPlan);
router.get("/get-plans/:incomeId", verifyToken, getPlans);

export default router;
