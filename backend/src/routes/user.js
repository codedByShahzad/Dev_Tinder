import express from "express"
import { userAuth } from "../middlewares/auth.js";
import { viewAllRequests } from "../controllers/requestController.js";

const router = express.Router()

//Get all the pending Connection Reequest
router.get("/user/request", userAuth, viewAllRequests )

export default router; 