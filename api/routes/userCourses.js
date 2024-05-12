const express = require("express");
const routes = express.Router();
const { createCourses, getStudentRegisteredCourses } = require("../controllers/functionalities");
const { handleErrors } = require("../controllers/errorHandling");


routes.get("/", async(req, res) => {
     const response = await getStudentRegisteredCourses("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NDAyYjRkZjdmNTdhZDAzZDRkY2QyOCIsImlhdCI6MTcxNTQ4MTQ1NCwiZXhwIjoxNzE1NTY3ODU0fQ.HLKq0q2nz1b1pLjtIRIh9wx4prSV-7wIpCrlNYID1yA")

     res.json(response);
});

routes.post("/", async (req, res) => {
  const { token, courseTitle, courseCode, courseUnit } = req.body;
     try{
          if (courseTitle === "") {
            throw Error("Please Enter Course Title");
          } else if (courseCode === " ") {
            throw Error("Please Enter Course Code");
          } else if (courseUnit === "") {
            throw Error("Please Enter Course Unit");
          }
          await createCourses(
            token,
            courseTitle,
            courseCode,
            courseUnit
          ).then((response) => {
               console.log(response)
              if(response === "course found"){
               res.status(500).json({message: "Sorry This Couse Has Been Registered"})
              }
              else if(response === true ){
               res.status(200).json({message: "Course Registered Successfully"})
              }
            })
     }
    catch(err){
     const error = handleErrors(err)
      console.log(error)
    };
});

module.exports = routes;
