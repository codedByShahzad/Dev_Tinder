import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/userModel.js";

dotenv.config();
const JWT_KEY = process.env.JWT_SECRET;

export const userAuth = async (req, res, next) => {
  try {
    if (!JWT_KEY) {
      return res.status(500).json({ message: "JWT_SECRET missing" });
    }

    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ message: "Please login first" });
    }

    const decoded = jwt.verify(token, JWT_KEY);

    const user = await User.findById(decoded._id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // 🔥 attach user to request
    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized",
      error: error.message,
    });
  }
};
