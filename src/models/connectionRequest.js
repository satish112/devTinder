const mongoose = require('mongoose')

const connectionRequestSchema = new mongoose.Schema({
    fromUserId :{
        type: mongoose.Types.ObjectId,
        ref : "User", //reference to the user collection
        required : true,
    },
    toUserId :{
        type: mongoose.Types.ObjectId,
        ref : "User",
        required : true,
    },
    status :{
        type: String,
        required : true,
        enum : {
            values : ["ignored", "interested","accepted","rejected"],
            message : "${VALUE} is incorrect status type"
        }
        
    }
},{
    timestamps : true
})

connectionRequestSchema.index({fromUserId : 1, toUserId: 1})

connectionRequestSchema.pre("save", function (next){
    const connectionRequest = this;
    // check if the fromUserId and toUserId are equal
    if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        return res.status(400).send("you cannot send the request to yourself")
    }
    next();
});

module.exports = mongoose.model("connectionRequest", connectionRequestSchema);