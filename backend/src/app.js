import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import { User } from "./models/userModel.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.post("/signup", async (req, res) => {
  const userData = req.body;

  //Creating a new instence of the User Model
  const user = new User(userData);

  try {
    await user.save();
    res.send("User Added Successfully");
  } catch (err) {
    res.status(499).send("Error Saving the User : ", err);
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
    res.status(400).send("Error Getting a User: ", err);
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
    res.status(400).send("Error Getting a User: ", err);
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
    res.status(400).send("Error Getting a User: ", err);
  }
});

// Update the user
app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    const updateUser = await User.findByIdAndUpdate(userId, data);
    res.send("User Updated Successfully");
  } catch (err) {
    res.status(400).send("Error Getting a User: ", err);
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
    console.log("Database Cannot be Connected", err);
  });
