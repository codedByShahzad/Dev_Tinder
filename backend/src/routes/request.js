import express from "express";
import { sendRequest, reviewRequest } from "../controllers/requestController.js";
import { userAuth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/send/:status/:toUserId", userAuth ,sendRequest);
router.post("/review/:status/:requestId", userAuth ,reviewRequest);

export default router; // 👈 THIS LINE WAS MISSING
