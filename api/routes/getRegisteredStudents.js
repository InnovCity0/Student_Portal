require("dotenv").config()
const studentModel = require("../models/register");
const express = require("express");
const routes = express.Router();
const jwt = require("jsonwebtoken")

// For Signup  page to get the matric number count
routes.get("/", (req, res) => {
  const students = studentModel
    .aggregate([
      {
        $group: {
          _id: "$courseOfStudy",
          total: {
            $sum: 1,
          },
        },
      },
    ])
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
});



// const createToken=(id)=>{
//   const maxAge = 23 * 60 * 60
//   const secret_key = process.env.JWT_SECRET_KEY
//   const token = jwt.sign({id}, secret_key, {expiresIn: maxAge})
//   console.log(token)
// }

// createToken("6636057a52a5742b9748e037")

// Login page make a request to get the user that wants to login
routes.post("/", (req, res) => {
  const { matricNumber, password } = req.body;

  res.status(200).json({ matric: matricNumber, password: password });
});

module.exports = routes;
