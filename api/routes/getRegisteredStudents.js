const studentModel = require("../models/register");
const express = require("express");
const routes = express.Router();
const { loginRegisteredUser } = require("../controllers/verification");

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



// Login page make a request to get the user that wants to login
routes.post("/", async (req, res) => {
  const { matricNumber, password } = req.body;

  const studentLoginToken = await loginRegisteredUser(matricNumber, password);
  console.log(studentLoginToken);
  res.cookie("USERSESSID", studentLoginToken, {HttpOnly: true, maxAge: (23 * 60 * 60 * 1000)});

  res.status(200).json({ matric: matricNumber, password: password });
});

module.exports = routes;
