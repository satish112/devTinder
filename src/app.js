const express = require('express');

const app = express();

app.use("/", (req,res)=>{
    res.send("Hello namaste from the dashboard from satish");
})

app.use("/test", (req,res)=>{
    res.send("Hello from the server");
})

app.use("/hello", (req,res)=>{
    res.send("Hello hello hello hello");
})

app.listen((7777), ()=>{
    console.log("successfuly listening to prot 7777.....");
});

