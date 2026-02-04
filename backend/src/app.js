const express = require("express")

const app = express()
const PORT = 8000

// Request Handler (Order of the Routes Matters)
app.use( "/user",()=>{

})


app.listen(PORT, ()=>{
    console.log(`Server Successfully Listening on Port ${PORT}`)
})

 