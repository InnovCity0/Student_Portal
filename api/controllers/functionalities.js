require("dotenv").config();
const jwt = require("jsonwebtoken");
const studentModel = require("../models/register");
const studentCourseModel = require("../models/courses");
const bcrypt = require("bcrypt");
const { response } = require("express");

// For the Registration page to see if the user exist in the db
const checkIfStudentExist = async (firstName, middleName, surname) => {
  const query = {
    "personalDetails.fullName.firstName": firstName,
    "personalDetails.fullName.middleName": middleName,
    "personalDetails.fullName.surname": surname,
  };
  return await studentModel
    .findOne(query)
    .then((user) => {
      if (user) {
        return "This User Exist";
      }
    })
    .catch((err) => {
      return err;
    });
};

// :::::::: LOGIN PAGE FUNCTION
const loginFunction = async (matricNumber, password) => {
  const query = {
    "personalDetails.matricNumber": matricNumber,
  };
  return await studentModel.findOne(query).then(async (student) => {
    if (!student) {
      throw Error("Sorry This Student Does Not Exist");
    }

    // If there is a student
    else {
      const userPasswordInDB = student.personalDetails.password;
      const confirmPassword = await bcrypt.compare(password, userPasswordInDB);
      // If the password is not correct
      if (!confirmPassword) {
        throw Error("Sorry Matric Number or Password Is Incorrect");
      }

      // If the password is correct
      const secret_key = process.env.JWT_SECRET_KEY;
      const maxTime = 24 * 60 * 60; // 24 Hours
      const userToken = jwt.sign({ id: student._id }, secret_key, {
        expiresIn: maxTime,
      });
      return userToken;
    }
  });
};

// ::::::::::: For the Forgot Password and resetLink
const forgotPassword = async (email) => {
  const query = {
    "personalDetails.email": email,
  };
  return await studentModel.findOne(query).then((student) => {
    if (!student) {
      return "Sorry This User Does Not Exist";
    }
    const secret_key =
      process.env.JWT_SECRET_KEY + student.personalDetails.password;
    const maxAge = 23 * 60 * 60;
    const token = jwt.sign({ id: student._id }, secret_key, {
      expiresIn: maxAge,
    });

    const resetLink =
      process.env.BACKEND_MAIN_ROUTE + `reset-password/${student._id}/${token}`;
    return resetLink;
  });
};

// ::::::::::: Token Verifcation
const getUserToken = async (token) => {
  if (token) {
    const secret_key = process.env.JWT_SECRET_KEY;
    return jwt.verify(token, secret_key, (err, decodedToken) => {
      if (err) {
        throw Error(err.message);
      } else {
        return decodedToken.id;
      }
    });
  }
};

// ::::::::::::: Register Courses
const createCourses = async (token, courseTitle, courseCode, courseUnit) => {
  const studentID = await getUserToken(token);

  const query = [
    {
      courseTitle: courseTitle,
      courseCode: courseCode,
      courseUnit: courseUnit,
    },
  ];

  // // First get the check the user ID
  // const student = await studentCourseModel.findOne({_id: studentID}, {courses: 1, _id: 0});
  // console.log(student)


  // if (student) {
  //   // If the courses exist in the db
  //   const courseFound = await student['courses'].findOne({
  //     courses: {
  //       $elemMatch: {
  //         courseTitle: { $in: [courseTitle] },
  //         courseCode: { $in: [courseCode] },
  //       },
  //     },
  //   });
  // console.log(courseFound)
  //   if (courseFound) {
  //     return "course found";
  //   }
  // }

  // // To Register and save student courses
  // else {
  //   return await studentCourseModel
  //     .updateOne(
  //       { _id: studentID },
  //       { $push: { courses: { $each: query } } },
  //       { upsert: true }
  //     )
  //     .then((response) => {
  //       return response.acknowledged;
  //     });
  // }
};

// ::::::::::::: Get Student Registered Courses
const getStudentRegisteredCourses = async (token) => {
  const studentID = await getUserToken(token);
  const studentCourses = await studentCourseModel.findOne(
    { _id: studentID },
    { courses: 1, _id: 0 }
  );
  return studentCourses;
};

// Module Exports
module.exports = {
  checkIfStudentExist,
  loginFunction,
  forgotPassword,
  getUserToken,
  createCourses,
  getStudentRegisteredCourses,
};
