require("dotenv").config();
const jwt = require("jsonwebtoken");
const studentModel = require("../models/register");
const bcrypt = require("bcrypt");

const createToken=(id)=>{
  const maxAge = 23 * 60 * 60
  const secret_key = process.env.JWT_SECRET_KEY
  const token = jwt.sign({id}, secret_key, {expiresIn: maxAge})
  return token
}

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


const loginRegisteredUser = async (matricNumber, password) => {
  const query = {
    "personalDetails.matricNumber": matricNumber,
  };
  const student = await studentModel.findOne(query)
  if(student){
    const hashedPassword = student.personalDetails.password
    const isMatch = await bcrypt.compare(password, hashedPassword)

    // If isMatch is true i want to create  JWT token for the user so as to authorize the user login
    if(isMatch){
    return createToken(student._id)
    }
    else{
      console.log ("Sorry Wrong Credentials")
    }
  }
};


const forgotPassword = async(email)=>{
  
}

module.exports = { checkIfStudentExist, loginRegisteredUser };
