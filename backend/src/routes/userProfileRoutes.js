import express from "express";
import { userAuth } from "../middlewares/auth.js";
import { getProfileController, editProfileController, changePasswordController } from "../controllers/profileController.js";

const userProfileRoutes = express.Router();

userProfileRoutes.get("/profile/view", userAuth, getProfileController);
userProfileRoutes.patch("/profile/edit", userAuth, editProfileController);
userProfileRoutes.post("/profile/change-password", userAuth, changePasswordController);

export default userProfileRoutes;
