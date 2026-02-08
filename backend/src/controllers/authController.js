import bcrypt from "bcrypt"
import validator from "validator"
import { User } from "../models/userModel.js";

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

    const hashPassword = await bcrypt.hash(password, 10)

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
}