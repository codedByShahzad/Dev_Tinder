const express = require("express")

const app = express()
const PORT = 8000

// Request Handler
app.use("/test",(req, res)=>{
    res.send("Hello the test Data is Comming from the Server")
})
app.use("/",(req, res)=>{
    res.send("Data is Comming from the Server for Home page")
})


app.listen(PORT, ()=>{
    console.log(`Server Successfully Listening on Port ${PORT}`)
})

