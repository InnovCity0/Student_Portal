const { checkFaculty } = require("../controllers/faculties");


const genMatricNumber = async (courseOfStudy, faculty) => {
  const currentYear = new Date().getFullYear();
  const startingNumber = currentYear % 100;
  const facultyInitials = await checkFaculty(courseOfStudy, faculty); 
  const lastDigit = lastDigitSet(`${facultyInitials.deptCount}`, `${facultyInitials.department}`);
  const matricNumber = `${startingNumber}${facultyInitials.faculty}${lastDigit}`;
  return(matricNumber)
};

const lastDigitSet = (endDigit, departmentCode) => {
  let num = parseInt(endDigit, 10);
  num += 1;
  return num.toString().padStart(5, `${departmentCode}00`);
};

module.exports = { genMatricNumber };
