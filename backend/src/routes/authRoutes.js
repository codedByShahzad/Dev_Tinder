import express from "express";
import validator from "validator";
import { User } from "../models/userModel.js";
import { loginController, logoutController, signupController } from "../controllers/authController.js";
import { userAuth } from '../middlewares/auth.js';

export const authRouter = express.Router();

authRouter.post("/signup", signupController);
authRouter.post("/login", loginController)
authRouter.post("/logout", userAuth ,logoutController)