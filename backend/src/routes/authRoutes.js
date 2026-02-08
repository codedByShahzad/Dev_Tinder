import express from "express";
import validator from "validator";
import { User } from "../models/userModel.js";
import { signupController } from "../controllers/authController.js";

export const authRouter = express.Router();

authRouter.post("/signup", signupController);
