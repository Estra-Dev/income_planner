import express from "express";
import { signIn, signUp } from "../controller/auth.controller.js";

const route = express.Router();

route.post("/signup", signUp);
route.post("/signin", signIn);

export default route;
