require("dotenv").config()
const express = require('express')
const app = express()
const mongoose  = require("mongoose")
const PORT = process.env.PORT || 5000


// ::::::::::  MiddleWares :::::::::: 
app.use(express.urlencoded({extended: true}))
app.use(express.json())


// :::::::::: Mongoose Connection :::::::::: 
mongoose.connect(process.env.DB_URL)
     .then(()=>{
          console.log(`Connection Successful`)
     })
     .catch(err=>{
          console.log(err)
     })

// ::::::::::  ROUTE FUNCTIONS :::::::::: 
const resigerRoute = require("./routes/signup")


// ::::::::::  API ROUTES :::::::::: 
app.use("/api/signup", resigerRoute)


// :::::::::: PORT SETUP :::::::::: 
app.listen(PORT, (req,res)=>{
     console.log(`Server running on port ${PORT}`)
})