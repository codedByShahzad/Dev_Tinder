import express from "express"
import { userAuth } from "../middlewares/auth.js";
import { viewAllRequests, viewAllConnections, viewFeed } from "../controllers/requestController.js";

const router = express.Router()

//Get all the pending Connection Reequest
router.get("/request", userAuth, viewAllRequests )
router.get("/connections", userAuth, viewAllConnections )
router.get("/feed", userAuth, viewFeed )

export default router; 