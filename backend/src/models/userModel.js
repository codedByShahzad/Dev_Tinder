import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
       
    },
    gender: {
        type: String,
         validate(value){
            if (!["Male", "Female", "Others"].includes(value)) {
                throw new Error("Gender Data is Not Valid")
            }
        }
    },
    photoUrl:{
        type: String
    },
    about:{
        type: String,
        default: "This is a Default About of the User"
    },
    skills:{
        type: [String]
    }
}, {
    timestamps: true
})

// This is the user Collection that will be shown in Mongo DB Compass as devTinder(Database)/User(Collection)/data of the users in Document Form
export const User = mongoose.model("User", userSchema)


