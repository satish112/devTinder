const jwt = require('jsonwebtoken');
const User = require("../models/user")


const userAuth = async (req, res, next)=>{
    //Read the token from the req cookies
    try{
    const { token } = req.cookies
    if(!token){
        throw new Error ("Invalid Token !!!!!!")
    }
    const decodedmessage = await jwt.verify(token, "DevTinder@734");

    const{_id} = decodedmessage;
    const user = await User.findById(_id);
    if(!user){
        throw new Error ("User not found")
    }
    req.user = user;
    next();
} catch (err){
    res.status(404).send("Error:" + err.message);
}

}

module.exports = {
    userAuth
}