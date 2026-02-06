import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import { User } from "./models/userModel.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    const user = new User(req.body);
    
    
    if (req.body.skills?.length > 20) {
  throw new Error("Cannot add more than 20 skills");
}

    
    await user.save();
    res.status(201).json({
      success: true,
      message: "User Added Successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error saving the user",
      error: err.message, // 👈 THIS shows in Postman
    });
  }
});

// Get specific user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.email;

  try {
    const filteredUser = await User.findOne({ email: userEmail });

    if (filteredUser.length === 0) {
      res.status(404).send("User Not Found");
    }
    res.send(filteredUser);
    console.log(filteredUser);
  } catch (err) {
    res.status(400).send("Error Getting a User: ", err.message);
  }
});

// Get all the users
app.get("/all-users", async (req, res) => {
  try {
    const allUsers = await User.find({});

    if (allUsers.length === 0) {
      res.status(404).send("Users Not Found");
    }
    res.send(allUsers);
  } catch (err) {
    res.status(400).send("Error Getting a User: ", err.message);
  }
});

// Delete a user API
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;

  try {
    // const user = await User.findByIdAndDelete({_id: userId}) we can use this and also the below is the short form of this line
    const user = await User.findByIdAndDelete(userId);
    res.send("User Deleted Successfully");
  } catch (err) {
    res.status(400).send("Error Getting a User: ", err.message);
  }
});

// Update the user
app.patch("/user", async (req, res) => {
  const { userId, ...data } = req.body;

  try {
    const allowedUpdates = [
      "photoUrl",
      "about",
      "gender",
      "age",
      "skills",
      "firstName",
      "lastName",
    ];

    const isUpdateAllowed = Object.keys(data).every((k) => {
      allowedUpdates.includes(k);
    });

    if (!isUpdateAllowed) {
      throw new Error("Update not Allowed");
    }

    if(data.skills.length > 20){
      throw new Error ("Cannot add more than 20 skills")
    }
    const updatedUser = await User.findByIdAndUpdate(userId, data, {
      new: true, // return updated document
      runValidators: true, // ✅ run schema validators on update
    });

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      message: "User Updated Successfully",
      user: updatedUser,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Validation / Update error",
      error: err.message,
    });
  }
});

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
