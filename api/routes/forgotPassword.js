const express = require("express")
const route = express.Router()
const {forgotPassword} = require("../controllers/functionalities")

route.post("/", async(req,res)=>{
     const {email} = req.body

     // This is to be sent to the email
     const resetTokenLink = await forgotPassword(email)
     console.log(resetTokenLink)
     res.status(200).json({token: resetTokenLink})
})


module.exports = route