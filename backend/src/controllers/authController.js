import bcrypt from "bcrypt";
import validator from "validator";
import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const signupController = async (req, res) => {
  try {
    const { firstName, lastName, email, password, skills, age, gender } =
      req.body;
    if (
      !firstName ||
      firstName.length < 3 ||
      firstName.length > 50 ||
      !lastName ||
      lastName.length < 3 ||
      lastName.length > 50 ||
      !email ||
      !password
    ) {
      throw new Error("Invalid Name Crediantials");
    }

    if (!validator.isEmail(email)) {
      throw new Error("Invalid Email");
    }

    if (!validator.isStrongPassword(password)) {
      throw new Error("Enter a Strong Password");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const data = new User({
      firstName,
      lastName,
      email,
      password: hashPassword,
      skills,
      age,
      gender,
    });

    await data.save();

    res.json({
      message: "User SignUp Successfully",
      user: data,
    });
  } catch (err) {
    res.status(404).send("Error During SignUp: " + err.message);
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User not Found");
    }

    const decryptPassword = await bcrypt.compare(password, user.password);

    if (!decryptPassword) {
      throw new Error("Invalid Password");
    }

    if (!JWT_SECRET) throw new Error("JWT_SECRET missing");

    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    console.log(token);
    res.cookie("token", token);
    res.json({
      success: true,
      message: "Login Successfull",
    });
  } catch (err) {
    res.status(404).send("Error During Log In: " + err.message);
  }
};
