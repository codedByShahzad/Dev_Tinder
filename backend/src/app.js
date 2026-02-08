import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import { User } from "./models/userModel.js";
import { validateSignUp } from "./utils/userValidation.js";
import bcrypt from "bcrypt";
import validator from "validator";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import { userAuth } from "./middlewares/auth.js";

import { authRouter } from "./routes/authRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const JWT_KEY = process.env.JWT_SECRET;

app.use(express.json());
app.use(cookieParser());


app.use(authRouter)

connectDB()
  .then(() => {
    console.log("Database Connection estblished... ");
    app.listen(PORT, () => {
      console.log(`Server Successfully Listening on Port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Database Cannot be Connected", err.message);
  });
