const express = require('express');
const requestRouter = express.Router();
const { userAuth } = require('../middlewares/auth')
const connectionRequest = require('../models/connectionRequest')
const User = require('../models/user');


requestRouter.post("/sendConnectionRequest",userAuth, async (req, res)=>{

    const user = req.user;

    res.send (user.firstName + "Sending the Connection Request");
})
requestRouter.post("/request/send/:status/:userId", userAuth, async(req, res)=>{

   try {
        const fromUserId = req.user._id
        const toUserId = req.params.userId
        const status = req.params.status

        const allowedMethods = ['ignored', 'interested']

        if(!allowedMethods.includes(status)){
            return res.status(400).send("Status is not allowed")
        }
        const verifiedTouserId = await User.findById(toUserId)
        if (!verifiedTouserId){
            return res.status(400).send("required connection request is not registered with us")
        }
        const existingconnectionRequest = await connectionRequest.findOne({
            $or:[
                {
                    fromUserId, toUserId
                },{
                    fromUserId: toUserId, toUserId:fromUserId
                },
            ],
        })
        if (existingconnectionRequest){
            return res.status(400).json({
                message:"You cannot send the request to the same person again"
            })
        }
        const newconnectionRequest = new connectionRequest({fromUserId, toUserId, status})

        const data = await newconnectionRequest.save()

        res.json({
            message : req.user.firstName + "is" +status+ verifiedTouserId.firstName,
            data : data
        })
        
}catch(err){
    res.status(400).send("Error :"+err.message);
}

})

requestRouter.post("/request/review/:status/:requestId", userAuth, async(req, res)=>{
    try{
        const loggeInUser = req.user
        const {status, requestId} = req.params
        Allowed_status = ["accepted", "rejected"]
        if (!Allowed_status.includes(status)){
            return res.status(400).send({message : "Unidentified Status"})
        }
        const connectionrequest = await connectionRequest.findOne({
            _id : requestId,
            toUserId : loggeInUser._id,
            status : "interested"
        })
        if(!connectionrequest){
            return res.status(400).send({
                message : "Connection request is not found"
            })
        }

        connectionrequest.status = status;
        const data = await connectionrequest.save();
        res.json({
            message : " Connection request is " +status,
            data
        });

    }catch(err){
        res.status(400).send("Error:"+ err.message);
    }
})


module.exports = requestRouter;