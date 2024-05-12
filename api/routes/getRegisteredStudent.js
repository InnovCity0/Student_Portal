const studentModel = require("../models/register");
const express = require("express");
const routes = express.Router();
const { loginRegisteredUser } = require("../controllers/functionalities");

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


module.exports = routes;
