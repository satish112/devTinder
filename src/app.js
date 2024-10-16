const express = require('express');
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");


app.use(express.json());

//Get user by email id
app.get("/user", async (req, res)=>{
    const useremail = req.body.emailId;
    try{
        const user = await User.findOne({emailId :useremail});
        if(!user){
            res.status(404).send("User not found");
        } else{
            res.send(user);
        }
    }catch (err){
        res.status(404).send("Something went wrong");
    }
});

//Feed API - get all the users from the database

app.get("/feed", async (req, res)=>{
    try{
        const users = await User.find({});
        if (users.length === 0){
            res.status(404).send("There are no users in the database");
        }else{
            res.send(users);
        }
    } catch(err){
        res.status(404).send("something went wrong")
    }
})

app.post("/signup", async (req, res)=>{

    //creating a new instance of the User model
    const user = new User(req.body);

    try{
        await user.save();
        res.send("User added successfully");
    } catch(err){
        res.status(404).send("Error saving the user:" + err.message);
    }
    
});



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
