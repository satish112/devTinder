const express = require('express');
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const {validateSignupdata} = require("./utils/validation")
const bcrypt = require('bcrypt');
const validator = require('validator');
const cookie = require('cookie-parser');
const jwt = require('jsonwebtoken');
const {userAuth} = require("./middlewares/auth");


app.use(express.json());
app.use(cookie());


app.post("/signup", async (req, res)=>{

    try{
        // Validate the data
        validateSignupdata(req);

        const {firstName , lastName, emailId, password} = req.body;

        // Encrypting the password 
        const encryptedPassword = await bcrypt.hash(password, 10);
        console.log(encryptedPassword);


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


app.post("/login", async (req, res)=>{

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

app.get('/profile', userAuth, async (req, res)=>{
try{
    user = req.user
    res.send(user);
} catch (err){
    res.status(404).send("Error:"+ err.message);
}
}) 

app.post("/sendConnectionRequest",userAuth, async (req, res)=>{

    const user = req.user;

    res.send (user.firstName + "Sending the Connection Request");
})


                                                                                        




connectDB()
.then(()=>{
    console.log("database connection successfull");
    app.listen((7777), ()=>{
        console.log("successfuly listening to port 7777.....");
    });
})
.catch(err =>{
    console.error("database cannot be connected ")
})
