const express = require('express');
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");


app.use(express.json());

app.post("/signup", async (req, res)=>{

    //creating a new instance of the User model
    const user = new User(req.body);

    try{
        await user.save();
        res.send("User added successfully");
    } catch(err){
        res.status(400).send("Error saving the user:" + err.message);
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
