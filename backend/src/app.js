import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import cookieParser from "cookie-parser";

import { authRouter } from "./routes/authRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

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
