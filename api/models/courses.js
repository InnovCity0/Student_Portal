const mongoose = require("mongoose")

const coursesSchema = new mongoose.Schema({
     studentMatNum: {
          type: String,
          // required: true
     },
     courses: [
        {
          courseTitle: {
               type: String,
               // required: [true, "Please Choose A Course"]
          },
          courseCode: {
               type: String,
               // required: [true, "Please Select A Course Code"]
          },
          courseUnit: {
               type: String,
               // required: [true, "Please Select A Course Unit"]
          }
     }
     ]
})


const courseModel = new mongoose.model("course", coursesSchema)

module.exports = courseModel