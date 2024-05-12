const { checkFaculty } = require("./faculty_code_gen");


const genMatricNumber = async (courseOfStudy, faculty) => {
  const currentYear = new Date().getFullYear();
  const startingNumber = currentYear % 100;
  const facultyInitials = await checkFaculty(courseOfStudy, faculty); 
  const lastDigit = lastDigitSet(`${facultyInitials.deptCount}`, `${facultyInitials.department}`);

  if(faculty === ""){
    throw Error ("Please Select A Faculty")
  }
  else if(courseOfStudy == ""){
    throw Error ("Please Select A Course")
  }
  else if(facultyInitials == "Faculty Not Found"){
    throw Error ("Sorry We Currently Don't Have this Faculty")
  }
  else if(facultyInitials.department == "Department Not Found"){
    throw Error ("This Department Is Not In This Faculty")
  }
  else{
    const matricNumber = `${startingNumber}${facultyInitials.faculty}${lastDigit}`;
    return(matricNumber)
  }
};

const lastDigitSet = (endDigit, departmentCode) => {
  let num = parseInt(endDigit, 10);
  num += 1;
  return num.toString().padStart(5, `${departmentCode}00`);
};

module.exports = { genMatricNumber };
