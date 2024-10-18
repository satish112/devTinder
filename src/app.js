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
        res.status(404).send("Error saving the user:" + err.message);
    }
    
});

//Get user by email id
app.get("/user", async (req, res)=>{
    const useremail = req.body.emaiId;

    try{
        const user = await User.findOne(useremail);
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

//Delete API - deleting the user using userid
app.delete("/delete", async (req, res)=>{
    const userid = req.body.userId
    console.log(userid)
    try{
        const user = await User.findByIdAndDelete({_id: userid});
        res.send("User deleted");
    }catch (err){
        res.status(404).send("Something went wrong");
    }
})

//Update the data of the user
app.patch("/patch/:userId", async (req, res)=>{
    const userid = req.params?.userId;
    const data = req.body;
    //console.log(data)
    try{
        const ALLOWED_UPDATES = ["userId", 'firstName','lastName','age','gender',"skills","photoUrl"]
        const isupdateAllowed = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k));
        if(!isupdateAllowed){
            throw new Error ("update is not allowed");
        }
        if (data?.skills.length > 10){
            throw new Error ("your skills shouldn't exceed than 10")
        }
        const user =  await User.findByIdAndUpdate(userid, data, {returnDocument :'before', runValidators : true});
        //console.log(user);
        res.send("user data successfully updated");

    }catch (err){
        res.status(404).send("Update failed " + err.message);
    }
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
