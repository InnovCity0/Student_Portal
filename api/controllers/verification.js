const studentModel = require("../models/register");

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
        return ("This User Exist")
      }
    })
    .catch((err) => {
      return (err);
    });
};

module.exports = { checkIfStudentExist };
