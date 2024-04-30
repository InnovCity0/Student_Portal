const handleErrors = (err) =>{
     // console.log(err.message, err.code)
     const errors = {}

     if(err.code === 11000){
           errors['emailError'] = "This Email Has Been Registered Before"
          console.log( errors )
     }

     else if(err.message.includes("Student_Profile validation failed")){
          Object.values(err.errors).forEach(({properties})=>{
               errors[properties.path] = properties.message
          })
     }
     else{
          errors['generalError'] = err.message
     }

     return(errors)
}

module.exports = {handleErrors}