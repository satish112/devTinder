const express = require('express');

const app = express();


//handle auth middleware for all request GET, POST, 
app.use("/admin", (req, res, next)=>{
    const token = "xyzdsdsds";
    const isAdminauthorized =  token === "xyz";
    if (!isAdminauthorized){
        res.status(401).send("unauthorized request")
    }
    else{
        next();
    }
})

app.get("/user",(req, res)=>{
    // logic of checking if the request is authorized
        res.send("User Data sent");
});


app.get("/admin/getAlldata",(req, res)=>{
    // logic of checking if the request is authorized
        res.send("All Data sent");
});


app.get("/admin/deleteUser",(req, res)=>{
    // Logic of fetching all data
    res.send("deleted user")
});

app.listen((7777), ()=>{
    console.log("successfuly listening to port 7777.....");
});

