import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

const DB_URI = process.env.DB_URI

const connectDB = async () => {
  await mongoose.connect(DB_URI);
};

export default connectDB;

