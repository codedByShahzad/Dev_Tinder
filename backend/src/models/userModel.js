import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    age: {
        type: Number
    },
    gender: {
        type: String
    },
})

// This is the user Collection that will be shown in Mongo DB Compass as devTinder(Database)/User(Collection)/data of the users in Document Form
export const User = mongoose.model("User", userSchema)


