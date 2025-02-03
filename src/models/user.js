
const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: {
        type : String,
        required: true,
        minLength : 4,
        maxLength : 20
    },
    lastName:{
        type: String
    },
    emailId:{
        type: String,
        required: true,
        lowercase : true,
        trim : true,
        unique: true,
        index: true,
        validate(value){
            if (!validator.isEmail(value)){
                throw new Error ("Invalid Email" + value);
            }
        },
    },
    password:{
        type: String,
        required: true,
        unique : true,
        trim : true
    },
    age:{
        type: Number,
        min : 18,
        default: 30
    },
    gender:{
        type: String,
        validate(value){
            if(!["male", "female", "others"].includes(value)){
                throw new Error("Gender is not valid");      
            }
        },
        default: "male"
    },
    photoUrl:{
        type : String,
        default: "https://avatars.githubusercontent.com/u/24198342?s=400&u=ec23ebd4287c99299e972d0b5c5d5f5589faba29&v=4",
        validate(value){
           if (!validator.isURL(value)){
            throw new Error ("Photo URL is not valid");
           }
        }
    },
    about:{
        type : String,
        default: "This is default about the user !"
    },
    skills : {
        type : [String]
    }
},{
    timestamps:true
});

userSchema.methods.getJWT = async function(){
    const user = this
    const token = await jwt.sign({_id : user._id}, "DevTinder@734", {expiresIn : '7d'});
    return token
}

userSchema.methods.validatePassword = async function(passwordInputbyUser){

    const user = this;
    const ispasswordvalid = await bcrypt.compare(passwordInputbyUser, user.password);
    return ispasswordvalid;
}




module.exports = mongoose.model("User", userSchema);