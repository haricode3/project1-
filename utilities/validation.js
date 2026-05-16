function isEmpty(str){
     return !str || str.trim() === '' ;
}

function checkCredentials(email, password){
     return email && email.includes('@') 
          && password && password.trim().length >= 2 

}

function checkUserIsValid(email, name, password, street, postal){
     return (
          checkCredentials(email, password)
          && !isEmpty(name) && !isEmpty(street) && !isEmpty(postal)
     );

}

function checkValidPassword(password, confirmPassword){
     return password === confirmPassword ;
}


module.exports ={
     checkUserIsValid : checkUserIsValid,
     checkValidPassword : checkValidPassword
}