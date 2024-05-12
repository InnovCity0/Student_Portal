require("dotenv").config()
const express = require("express")
const route = express.Router()
const studentModel = require("../models/register")
const { handleErrors } = require("../controllers/errorHandling")
const { getUserToken } = require("../controllers/functionalities")

route.post("/", async(req,res)=>{
     const {token} = req.body
     await getUserToken(token).then(async studentToken=>{
          const student =  await studentModel.findOne({_id: studentToken})
          const studentDashboardDetails ={
               fullName: `${student.personalDetails.fullName.firstName} ${student.personalDetails.fullName.surname}`,
               matricNumber: `${student.personalDetails.matricNumber}`,
               userImage: `${student.personalDetails.recentPassport}`,
               userDepartment: `${student.courseOfStudy}`,
          }

          res.status(200).json({studentDetails: studentDashboardDetails})
     })
     .catch(err=>{
          const error= handleErrors(err)
          res.status(500).json(error)
     })
})

module.exports = route