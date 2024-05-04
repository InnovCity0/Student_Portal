const express = require("express");
const routes = express.Router();
const studentModel = require("../models/register");
const { checkIfStudentExist } = require("../controllers/verification");
const { handleErrors } = require("../controllers/errorHandling");
const { genMatricNumber } = require("../controllers/matric_number_gen");

// ::::::::: POST METHOD ::::::::::::
routes.post("/", async (req, res) => {
  const { firstName, middleName, surname, email, phoneNumber, courseOfStudy, faculty} =
    req.body;
  const check_if_student_exist = await checkIfStudentExist(
    firstName,
    middleName,
    surname
  );

  try {
    //If the Student has no profile record
    if (check_if_student_exist === "This User Exist") {
      throw Error("This User HAs Been Registered Already");
    } else {
      const newStudent = await new studentModel({
        modeOfStudy: "Full-time",
        courseOfStudy: courseOfStudy,
        personalDetails: {
          recentPassport: "path/to/image.jpg",
          fullName: {
            firstName: firstName,
            middleName: middleName,
            surname: surname,
          },
          faculty: faculty,
          matricNumber: await genMatricNumber(courseOfStudy, faculty),
          postalAddress: "1234 Main St, City, Country",
          permanentHomeAddress: "1234 Main St, City, Country",
          password: await genMatricNumber(courseOfStudy, faculty),
          email: email,
          phoneNumber: phoneNumber,
          gender: "Male",
          maritalStatus: "Single",
          dateOfBirth: "1990-01-01",
          localGovernment: "City Council",
          stateOfOrigin: "State",
          nationality: "Country",
          religion: "Religion",
          nextOfKin: {
            name: "Jane Doe",
            address: "5678 Park Ave, City, Country",
          },
          sponsor: {
            nameAndAddress: "XYZ Corporation, 9876 Business Rd, City, Country",
          },
          physicalDisability: "None",
          referralID: "REF1234567",
        },
        educationalBackground: [
          {
            institutionName: "University of Education",
            address: "123 University St, City, Country",
            qualificationObtained: "BSc Computer Science",
            period: "2010-2014",
          },
        ],
        employmentHistory: [
          {
            employerNameAndAddress: "ABC Tech, 7890 Tech Park, City, Country",
            statusAndSalaryGrade: "Senior Developer, Grade 2",
            period: "2015-2024",
          },
        ],
        referees: [
          {
            nameAndAddress: "Dr. Emily Smith, 4567 Medicine Rd, City, Country",
            phoneNumber: "+0987654321",
            relationship: "Professor",
          },
        ],
      });

      //     Register the Student
      const student = await studentModel.create(newStudent);
      if (student) {
        res.json({ message: "Student Registered Successfully" });
      } else {
        res.json({ message: "Student Registration Failed" });
      }
    }
  } catch(errors) {
    const error = handleErrors(errors);
    res.status(500).json({ message: error });
  }
});

module.exports = routes;
