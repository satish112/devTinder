const validator = require('validator');

const validateSignupdata = (req) =>{


    const {firstName, lastName, emailId, password} = req.body
    
    if(!firstName || !lastName){
        throw new Error ("The Name is not valid");
    }
    else if(!validator.isEmail(emailId)) {
        throw new Error ("Email is not valid");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error ("Your password is not strong");
    }

}

module.exports = {validateSignupdata};