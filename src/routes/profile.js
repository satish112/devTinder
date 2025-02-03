const express = require('express');
const profileRouter = express.Router();
const { userAuth } = require('../middlewares/auth');
const { __esModule } = require('validator/lib/isAlpha');
const { validatePatchData } = require('../utils/validation');
const bcrypt = require('bcrypt');

profileRouter.get('/profile/view', userAuth, async (req, res)=>{
    try{
        user = req.user
        res.send(user);
    } catch (err){
        res.status(404).send("Error:"+ err.message);
    }
    }) 

profileRouter.patch('/profile/edit', userAuth, async(req, res) =>{
try{

    if(!validatePatchData(req)){
        throw new Error ("Unable to edit the requested field")
    }
    const user = req.user

    Object.keys(req.body).forEach(key => (user[key] = req.body[key]));

    await user.save()

    res.json({ 
        message : " Updated is successfull",
        data : user

    })

} catch (err){
    res.status(400).send("Error:"+ err.message);
   }
    
})

profileRouter.patch('/profile/changepassword', userAuth, async(req, res)=>{
    try {   
        const {current_password, new_password} = req.body
        const loggedinuser = req.user
        const PasswordValid = loggedinuser.validatePassword(current_password);
        if(PasswordValid){
            const NewEncryptedPassword = await bcrypt.hash(new_password,10);
            await loggedinuser.updateOne({password : NewEncryptedPassword})
            res.cookie("token", null, {expires: new Date(Date.now())})
            res.send("Password Updated successfully and please login again")
        }else{
            throw new Error ("Current_Password doesn't match")
        }
    } catch(err){
        res.status(400).send("Error:" + err.message);
    }


})

module.exports = profileRouter;