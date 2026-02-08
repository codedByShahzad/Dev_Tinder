
import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";

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
    const user = req.user;

    // validate keys
    const isAllowed = Object.keys(data).every((k) =>
      allowedUpdates.includes(k),
    );

    if (!isAllowed) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid updates. Only firstName, lastName, skills, about are allowed.",
      });
    }

    // update logged-in user only
    const updatedUser = await User.findByIdAndUpdate(user._id, data, {
      new: true,
      runValidators: true,
      select: "-password",
    });

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

export const changePasswordController = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "currentPassword and newPassword are required",
      });
    }

    // 1) get user (must include password field)
    const user = await User.findById(req.user._id).select("+password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 2) verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    // 3) basic validation for new password
    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 8 characters",
      });
    }

    // optional: prevent setting same password again
    const isSame = await bcrypt.compare(newPassword, user.password);
    if (isSame) {
      return res.status(400).json({
        success: false,
        message: "New password must be different from current password",
      });
    }

    // 4) hash + save
    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error updating password",
      error: err.message,
    });
  }
};