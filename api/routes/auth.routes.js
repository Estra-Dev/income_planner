import express from "express";
import {
  google,
  signIn,
  signOut,
  signUp,
} from "../controller/auth.controller.js";

const route = express.Router();

route.post("/signup", signUp);
route.post("/signin", signIn);
route.post("/signout", signOut);
route.post("/google", google);

export default route;
