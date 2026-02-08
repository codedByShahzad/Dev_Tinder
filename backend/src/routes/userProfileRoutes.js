import express from "express";
import { userAuth } from "../middlewares/auth.js";
import { getProfileController } from "../controllers/profileController.js";

const userProfileRoutes = express.Router();

userProfileRoutes.get("/profile", userAuth, getProfileController);

export default userProfileRoutes;
