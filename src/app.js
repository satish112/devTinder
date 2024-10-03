const express = require('express');

const app = express();



app.use("/user", (req, res)=>{
    res.send("using multiple scenarios");
})

//this will handle GET call to /user
app.get("/user", (req, res)=>{
     
    res.send({firstName : "satish", lastname: "rella"});
})


app.post("/user", (req, res)=>{
     res.send("data successfully post to the datbase");
})

app.delete("/user", (req, res)=>{
    res.send("data successfully deleted");
})


// this will match all the HTTP method API calls to /test
app.use("/test", (req,res)=>{
    res.send("Hello from the server");
})
app.listen((7777), ()=>{
    console.log("successfuly listening to prot 7777.....");
});