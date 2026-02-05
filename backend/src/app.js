import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/database.js"
import { User } from "./models/userModel.js"

dotenv.config()


const app = express()
const PORT = process.env.PORT

app.post("/signup", async (req, res)=>{
    const userData = {
        firstName: "Naqash",
        lastName: "Sohail",
        email: "naqash@gmail.com",
        password: "naqash1678",
        age: 19,
        gender: "Male"
    }

    //Creating a new instence of the User Model
    const user = new User(userData)

    try{
        await user.save()
        res.send("User Added Successfully")
    } catch(err){
        res.status(499).send("Error Saving the User : ", err)
    }

})

connectDB().then(()=>{
    console.log("Database Connection estblished... ")
    app.listen(PORT, ()=>{
    console.log(`Server Successfully Listening on Port ${PORT}`)
})

}).catch((err)=>{
    console.log("Database Cannot be Connected", err)
})


 