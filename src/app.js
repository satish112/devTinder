const express = require('express');
const connectDB = require("./config/database");
const app = express();
const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/request');
const cookie = require('cookie-parser');
const userRouter = require('./routes/user');

app.use(express.json());
app.use(cookie());

app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', requestRouter);
app.use('/', userRouter)



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
