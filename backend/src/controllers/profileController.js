import { User } from "../models/userModel.js";

export const getProfileController = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(500).json({ message: "User missing" });
    }

    res.json({
      success: true,
      message: "User Found Successfully",
      data: user,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const editProfileController = async (req, res) => {
  try {
    const allowedUpdates = ["firstName", "lastName", "skills", "about"];

    // take updates from body
    const data = req.body;
    const user =req.user

    // validate keys
    const isAllowed = Object.keys(data).every((k) => allowedUpdates.includes(k));

    if (!isAllowed) {
      return res.status(400).json({
        success: false,
        message: "Invalid updates. Only firstName, lastName, skills, about are allowed.",
      });
    }

    // update logged-in user only
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      data,
      {
        new: true,
        runValidators: true,
        select: "-password",
      }
    );

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in Updating the User",
      error: error.message,
    });
  }
};
