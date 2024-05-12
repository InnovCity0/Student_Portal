require("dotenv").config();

const checkFaculty = async (courseOfStudy, facultyCheck) => {
  let faculty;
  let department;
  let deptCount = await getDeptCount(courseOfStudy);

  //::::::: FACULTY OF Basic Medical Science ::::::::::
  if (facultyCheck === "Basic Medical Science") {
    faculty = "BMS";

    //     Check department
    switch (courseOfStudy) {
      case "Medical Laboratory Science":
        department = "01";
        break;
      case "Radiography & Radiation Science":
        department = "02";
        break;
      // If the Department if not Found
      default:
        department = "Department Not Found";
        break;
    }
  }

  // ::::::: FACULTY OF EDUCATION ::::::
  else if (facultyCheck === "Education") {
    faculty = "ED";

    //     Check department
    switch (courseOfStudy) {
      case "Guidance & Counselling":
        department = "01";
        break;
      case "Education & English Language":
        department = "02";
        break;
      case "Education & Computer Science":
        department = "03";
        break;
      case "Library & Information Science":
        department = "04";
        break;
      case "Education (Economics)":
        department = "05";
        break;
      case "Business Education":
        department = "06";
        break;

      // If the Department if not Found
      default:
        department = "Department Not Found";
        break;
    }
  }

  // ::::::: FACULTY OF ENGINEERING ::::::
  else if (facultyCheck === "Engineering") {
    faculty = "EG";

    //     Check department
    switch (courseOfStudy) {
      case "Computer Engineering":
        department = "01";
        break;
      case "Electrical & Electronics Engineering":
        department = "02";
        break;
      case "Mechanical Engineering":
        department = "03";
        break;
      case "Civil Engineering":
        department = "04";
        break;

      // If the Department if not Found
      default:
        department = "Department Not Found";
        break;
    }
  }

  // ::::::: FACULTY OF Enviromental Science ::::::
  else if (facultyCheck === "Enviromental Science") {
    faculty = "EV";

    //     Check department
    switch (courseOfStudy) {
      case "Architecture":
        department = "01";
        break;
      case "Estate Management":
        department = "02";
        break;
      case "Surveying & Geo-Informatics":
        department = "03";
        break;

      // If the Department if not Found
      default:
        department = "Department Not Found";
        break;
    }
  }

  // ::::::: FACULTY OF Humanities ::::::
  else if (facultyCheck === "Humanities") {
    faculty = "H";

    //     Check department
    switch (courseOfStudy) {
      case "English Language":
        department = "01";
        break;
      case "History & International Studies":
        department = "02";
        break;
      case "Christian Studies":
        department = "03";
        break;
      case "Performing Arts":
        department = "04";
        break;
      case "Music":
        department = "05";
        break;

      // If the Department if not Found
      default:
        department = "Department Not Found";
        break;
    }
  }

  // ::::::: FACULTY OF Law ::::::
  else if (facultyCheck === "Law") {
    faculty = "L";

    //     Check department
    switch (courseOfStudy) {
      case "Law":
        department = "01";
        break;

      // If the Department if not Found
      default:
        department = "Department Not Found";
        break;
    }
  }

  // ::::::: FACULTY OF Management Science ::::::
  else if (facultyCheck === "Management Science") {
    faculty = "MS";

    //     Check department
    switch (courseOfStudy) {
      case "Accounting":
        department = "01";
        break;
      case "Banking & Finance":
        department = "03";
        break;
      case "Business Administration":
        department = "04";
        break;
      case "Industrial Relations & Personnel Management":
        department = "05";
        break;

      // If the Department if not Found
      default:
        department = "Department Not Found";
        break;
    }
  }

  // ::::::: FACULTY OF Media & Communication Studies ::::::
  else if (facultyCheck === "Media & Communication Studies") {
    faculty = "MC";

    //     Check department
    switch (courseOfStudy) {
      case "Mass Communication":
        department = "01";
        break;

      // If the Department if not Found
      default:
        department = "Department Not Found";
        break;
    }
  }

  // ::::::: FACULTY OF Natural Science ::::::
  else if (facultyCheck === "Natural Science") {
    faculty = "N";

    //     Check department
    switch (courseOfStudy) {
      case "Biochemistry":
        department = "01";
        break;
      case "Computer Science":
        department = "02";
        break;
      case "Industrial Chemistry":
        department = "03";
        break;
      case "Computer Science (ICT Option)":
        department = "04";
        break;
      case "Geology":
        department = "05";
        break;
      case "Microbiology":
        department = "06";
        break;
      case "Physics With Electronics":
        department = "07";
        break;
      case "Mathematics":
        department = "08";
        break;
      case "Statistics":
        department = "09";
        break;

      // If the Department if not Found
      default:
        department = "Department Not Found";
        break;
    }
  }


  
  // ::::::: FACULTY OF Social Science ::::::
  else if (facultyCheck === "Social Science") {
    faculty = "S";

    //     Check department
    switch (courseOfStudy) {
      case "Economics":
        department = "02";
        break;
      case "Peace Strategic & Conflict Resolution":
        department = "03";
        break;
      case "Political Science":
        department = "04";
        break;

      // If the Department if not Found
      default:
        department = "Department Not Found";
        break;
    }
  }


  // :::::::: IF THE FACULTY ENTERED DOES NOT EXIST
  else {
    return "Faculty Not Found";
  }
  return { faculty, department, deptCount };
};





// Fetch the registered departments and get the total count so as to increase the number according to the total num
async function getDeptCount(course_of_study) {
  try {
    const data = await fetch(
      process.env.BACKEND_MAIN_ROUTE + `api/getRegisteredStudent`
    );
    const response = await data.json();
    const filteredArray = response.filter((item) =>
      item._id.includes(course_of_study)
    );
    const deptCOunt = filteredArray.reduce((acc, current) => {
      return current.total;
    }, 0);
    return deptCOunt;
  } catch (err) {
    console.log(err);
  }
}

module.exports = { checkFaculty };
