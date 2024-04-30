const mongoose = require("mongoose");
const { isEmail, isMobilePhone } = require("validator");

const studentSchema = new mongoose.Schema({
  modeOfStudy: {
          type: String,
     },
  courseOfStudy: { 
          type: String, 
     },

     // :::::::::::: Personnal Study ::::::::::::
  personalDetails: {
    recentPassport: { 
          type: String, 
     },
    fullName: {
      firstName: { 
          type: String, 
          required: [true, "Enter Your First Name"]
     },
      middleName: { 
          type: String,
          required: [true, "Enter Your MiddleName"]
     },
      surname: { 
          type: String, 
          required: [true, "Enter Your Surname"]
     },
    },

    postalAddress: { 
          type: String, 
     },

    permanentHomeAddress: { 
          type: String, 
     },

    email: { 
          type: String, 
          required: [true, 'Please Enter Your Email'],
          unique: true,
          validate: [isEmail, "Please Enter A Valid Email"]
     },

    phoneNumber: { 
          type: String,
          validate: [isMobilePhone, "Please Enter A Valid Number"],
          required: [true, 'Please Enter Your PhoneNumber']
     },
    gender: { 
          type: String, 
     },
    maritalStatus: { 
          type: String, 
     },
    dateOfBirth: { 
          type: Date, 
     },
    localGovernment: { 
          type: String, 
     },
    stateOfOrigin: { 
          type: String, 
     },
    nationality: { 
          type: String, 
     },
    religion: { 
          type: String, 
     },


     // :::::::::::: Next of Kin ::::::::::::
    nextOfKin: {
      name: { 
          type: String, 
     },
      address: { 
          type: String, },
    },
    sponsor: {
      nameAndAddress: { 
          type: String, 
     },
    },
    physicalDisability: { 
          type: String 
     },
    referralID: { 
          type: String 
     },
  },

  // :::::::::::: educationalBackground ::::::::::::
  educationalBackground: [
    {
      institutionName: { type: String},
      address: { type: String},
      qualificationObtained: { type: String},
      period: { type: String},
    },
  ],

    // :::::::::::: employmentHistory ::::::::::::
  employmentHistory: [
    {
           employerNameAndAddress: { 
               type: String,
      },
           statusAndSalaryGrade: { 
               type: String,
      },
           period: { 
               type: String,
      },
    },
  ],

    // :::::::::::: referees ::::::::::::
  referees: [
    {
           nameAndAddress: { 
               type: String,
      },
           phoneNumber: { 
               type: String,
      },
           relationship: { 
               type: String,
      },
    },
  ],
}, {timestamps: true});


const studentModel = new mongoose.model('Student_Profile', studentSchema )


module.exports = studentModel