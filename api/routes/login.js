require("dotenv").config()
const express = require("express")
const route = express.Router()
const {loginFunction} = require("../controllers/functionalities")
const { handleErrors } = require("../controllers/errorHandling")


route.post("/", async(req,res)=>{
     const {matricNumber,password} = req.body
     // console.log(matricNumber, password)
      await loginFunction(matricNumber, password).then(token=>{
          res.status(200).json({token: token})
      })
      .catch(err=>{
          const error = handleErrors(err)
          res.status(500).json(error)
      })
})

module.exports = route