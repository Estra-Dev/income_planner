import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { create, getReviews } from "../controller/review.controller.js";

const router = express.Router();

router.post("/create", verifyToken, create);
router.get("/getreviews", getReviews);

export default router;
