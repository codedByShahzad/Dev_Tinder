const express = require("express")

const app = express()
const PORT = 8000

// Request Handler (Order of the Routes Matters)



app.get("/user/:name/:age/:role", (req, res)=>{
    console.log(req.params)
    res.send("User Data us Avalible")
})

app.post("/user", (req, res)=>{
    res.send("Send User Data ")
})




app.listen(PORT, ()=>{
    console.log(`Server Successfully Listening on Port ${PORT}`)
})

