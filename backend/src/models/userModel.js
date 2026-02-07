import mongoose from "mongoose";
import { jwt } from 'jsonwebtoken'
import dotenv from "dotenv"
import { bcrypt } from 'bcrypt';

const JWT_KEY = process.env.JWT_SECRET

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

userSchema.methods.getJWT = async function  (){
    const user = this
    const token = await jwt.sign({_id: user._id}, JWT_KEY, { expiresIn: "7d"})

    return token
}


// This is the user Collection that will be shown in Mongo DB Compass as devTinder(Database)/User(Collection)/data of the users in Document Form
export const User = mongoose.model("User", userSchema)


