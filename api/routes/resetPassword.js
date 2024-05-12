require("dotenv").config();
const express = require("express");
const route = express.Router();
const jwt = require("jsonwebtoken");
const { handleErrors } = require("../controllers/errorHandling");
const studentModel = require("../models/register");
const bcrypt = require("bcrypt");

// This is where the password will be UPDATED
route.put("/:id/:token", (req, res) => {
  const { id, token } = req.params;
  const { password, confirmPassword } = req.body;

  studentModel
    .findOne({ _id: id })
    .then(async (student) => {
      if (!student) {
        throw Error("Sorry This Student Doesn't Exist");
      } else {
        const secret_key =
          process.env.JWT_SECRET_KEY + student.personalDetails.password;
        const verifiedStudent = jwt.verify(token, secret_key);

        //  If the token is verified and the passwords sent to
        if (verifiedStudent) {
          if (password == "") {
            throw Error("Please Enter Your Password");
          } else if (confirmPassword == "") {
            throw Error("Please Fill This Field");
          } else if (password !== confirmPassword) {
            throw Error("The Passwords do not match");
          }
          const saltRounds = 12;
          const salt = await bcrypt.genSalt(saltRounds);
          const newHashedPassword = await bcrypt.hash(password, salt);
          console.log(newHashedPassword);
          const query = {
            "personalDetails.password": newHashedPassword,
          };
          student.updateOne(query).then((response) => {
            console.log(response.acknowledged);
          });
        }
      }
    })
    .catch((err) => {
      const error = handleErrors(err);
      console.log(error);
    });
});

module.exports = route;
