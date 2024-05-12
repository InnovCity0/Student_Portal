require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;

// ::::::::::  MiddleWares ::::::::::
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// :::::::::: Mongoose Connection ::::::::::
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log(`Connection Successful`);
  })
  .catch((err) => {
    console.log(err);
  });

// ::::::::::  ROUTE FUNCTIONS ::::::::::
// Registration and login section
const resigerRoute = require("./routes/signup");
const getRegisteredStudentsRoute = require("./routes/getRegisteredStudent");
const forgotPasswordRoute = require("./routes/forgotPassword");
const loginRoute = require("./routes/login");
const resetPasswordRoute = require("./routes/resetPassword");

// Main Section
const userDashboardRoute = require("./routes/userDashboard");
const userCoursesRoute = require("./routes/userCourses");

// ::::::::::  API ROUTES ::::::::::
// Registration and login section
app.use("/api/signup", resigerRoute);
app.use("/api/getRegisteredStudent", getRegisteredStudentsRoute);
app.use("/api/forgot-password", forgotPasswordRoute);
app.use("/login", loginRoute);
app.use("/reset-password", resetPasswordRoute);

// Main Section
app.use("/api/userDashboard", userDashboardRoute);
app.use("/api/userCourses", userCoursesRoute);

// :::::::::: PORT SETUP ::::::::::
app.listen(PORT, (req, res) => {
  console.log(`Server running on port ${PORT}`);
});
