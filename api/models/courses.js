const mongoose = require("mongoose")

const coursesSchema = new mongoose.Schema({
     _id: {
          type: String,
          required: true
     },
     courses: [
        {
          courseTitle: {
               type: String,
               unique: true,
               required: [true, "Please Choose A Course"]
          },
          courseCode: {
               type: String,
               unique: true,
               required: [true, "Please Select A Course Code"]
          },
          courseUnit: {
               type: String,
               unique: true,
               required: [true, "Please Select A Course Unit"]
          }
     }
     ]
})


const courseModel = new mongoose.model("course", coursesSchema)

module.exports = courseModel