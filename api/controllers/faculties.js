const checkFaculty = async (courseOfStudy, facultyCheck) => {
  let faculty;
  let department;
  let deptCount = await getDeptCount(courseOfStudy)

  //::::::: ENGINEERING ::::::::::
  if (facultyCheck.includes("Engineering")) {
    faculty = "EG";

    //     Check department
    switch (courseOfStudy) {
      case "Computer Engineering":
        department = "01";
        break;
      case "Electrical Engineering":
        department = "02";
        break;
      case "Mechanical Engineering":
        department = "03";
        break;
    }
  } 
    // Management Science
  else if (facultyCheck.includes("Management Science")) {
    faculty = "M";

    //     Check department
    switch (courseOfStudy) {
      case "Accounting":
        department = "01";
        break;
      case "Banking and Finance":
        department = "03";
        break;
      case "Business Administration":
        department = "04";
        break;
    }
  } 
  
  else {
    faculty = "";
  }
  // console.log(faculty, department)
  return { faculty, department, deptCount };
};



async function getDeptCount(course_of_study) {
  try {
    const data = await fetch("http://localhost:5000/api/registered");
    const response = await data.json();

    const filteredArray = response.filter(item=> item._id.includes(course_of_study))
    const deptCOunt = filteredArray.reduce((acc,current)=>{
      return (current.total)
    }, 0)
    return(deptCOunt)

  } catch (err) {
    console.log(err);
  }
}


module.exports = { checkFaculty };
