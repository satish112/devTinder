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

const validatePatchData = (req) =>{
    const Allowed_Methods = ['firstName', 'lastName','emailId','age','gender','photoUrl','about', 'skills']

    isAllowedData = Object.keys(req.body).every(field => Allowed_Methods.includes(field))

    return isAllowedData;
}



module.exports = {validateSignupdata, validatePatchData};