import express from "express";
import { sendRequest } from "../controllers/requestController.js";
import { userAuth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/send/:status/:toUserId", userAuth ,sendRequest);

export default router; // 👈 THIS LINE WAS MISSING
