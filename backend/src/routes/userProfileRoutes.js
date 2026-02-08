import express from "express";
import { userAuth } from "../middlewares/auth.js";
import { getProfileController, editProfileController } from "../controllers/profileController.js";

const userProfileRoutes = express.Router();

userProfileRoutes.get("/profile/view", userAuth, getProfileController);
userProfileRoutes.patch("/profile/edit", userAuth, editProfileController);

export default userProfileRoutes;
