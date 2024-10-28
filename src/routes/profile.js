const express = require('express');
const profileRouter = express.Router();
const { userAuth } = require('../middlewares/auth');
const { __esModule } = require('validator/lib/isAlpha');

profileRouter.get('/profile', userAuth, async (req, res)=>{
    try{
        user = req.user
        res.send(user);
    } catch (err){
        res.status(404).send("Error:"+ err.message);
    }
    }) 

module.exports = profileRouter;