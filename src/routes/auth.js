const express = require('express');
const authRouter = express.Router();
const {validateSignupdata} = require('../utils/validation');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const validator = require('validator');




authRouter.post("/signup", async (req, res)=>{

    try{
        // Validate the data
        validateSignupdata(req);

        const {firstName , lastName, emailId, password} = req.body;

        // Encrypting the password 
        const encryptedPassword = await bcrypt.hash(password, 10);


        //creating a new instance of the User model
        const user = new User({
            firstName, lastName, emailId, password:encryptedPassword,
        });

    
        await user.save();
        res.send("User added successfully");
    } catch(err){
        res.status(404).send("Error saving the user:" + err.message);
    }
    
});

authRouter.post("/login", async (req, res)=>{

    try{
        const{emailId, password} = req.body;

        if(!validator.isEmail(emailId)){
            throw new Error ("EmaiId is invalid ")
        }
        const user = await User.findOne({emailId: emailId});
        if (!user){
            throw new Error("email- Invalid Credentials")
        }

        const isPasswordValid = await user.validatePassword(password);
        if(!isPasswordValid){
            throw new Error("password - Invalid Credentials")
        }else {
            // create a JWT token 
            const token = await user.getJWT();

            // add the token to cookie and send the response back to the user
            res.cookie("token", token, { expires: new Date(Date.now() + 900000) });
            res.send("Login Successful")
        }

    }catch (err){
        res.status(404).send("ERROR : " + err.message);
    }

});

authRouter.post("/logout", async (req, res) => {
    res.cookie("token", null, {expires: new Date(Date.now())}).send("Logout Successfully");
});

module.exports = authRouter;
