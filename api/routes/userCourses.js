const express = require("express");
const routes = express.Router();
const { addCourses, getStudentRegisteredCourses, createStudentCourseDoc} = require("../controllers/functionalities");
const { handleErrors } = require("../controllers/errorHandling");


routes.get("/", async(req, res) => {
    const {token} = req.body
    await createStudentCourseDoc(token)
});

routes.post("/", async (req, res) => {
  const { token, courseTitle, courseCode, courseUnit } = req.body;
     try{
          if (courseTitle === "") {
            throw Error("Please Enter Course Title");
          } else if (courseCode === "") {
            throw Error("Please Enter Course Code");
          } else if (courseUnit === "") {
            throw Error("Please Enter Course Unit");
          }
          await addCourses(
            token,
            courseTitle,
            courseCode,
            courseUnit
          ).then((response) => {
              //  console.log(response)
              if(response === "course found"){
               res.status(500).json({message: "Sorry This Couse Has Been Registered"})
              }
              else if(response === true ){
               res.status(200).json({message: "Course Registered Successfully"})
              }
            })
     }
    catch(err){
      // console.log(err.message)
    //  const error = handleErrors(err)
      // res.json(error)
    };
});

module.exports = routes;
