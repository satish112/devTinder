const express = require('express');
const requestRouter = express.Router();
const { userAuth } = require('../middlewares/auth')
const connectionRequest = require('../models/connectionRequest')
const User = require('../models/user')


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


module.exports = requestRouter;