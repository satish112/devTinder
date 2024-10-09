const express = require('express');

const app = express();




app.get("/getUserData", (req, res)=>{

    try{

        //logic of DB call and get user data
        throw new Error ("dadadadad");

        res.send("User Data Sent");
    }
    catch(err){
        res.status(500).send("Something error occured go support team ");
    }
    
})

app.use("/", (err, req, res, next)=>{
    if(err){
        //Log your error message 
        res.status(500).send("Something went wrong ");
    }
});


app.listen((7777), ()=>{
    console.log("successfuly listening to port 7777.....");
});

