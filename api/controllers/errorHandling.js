const handleErrors = (err) =>{
     // console.log(err.message, err.code)
     const errors = {}

     if(err.code === 11000){
           errors['emailError'] = "This Email Has Been Registered Before"
     }

     else if(err.message.includes("Student_Profile validation failed")){
          Object.values(err.errors).forEach(async({path, message})=>{
               errors[path] = message
          })
     }
     else{
          errors['errorMessage'] = err.message
     }

     return(errors)
}

module.exports = {handleErrors}