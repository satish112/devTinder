const express = require("express");
const { userAuth } = require("../middlewares/auth");
const userRouter = express.Router();
const connectionRequest = require("../models/connectionRequest");


userRouter.get("/user/requests/received", userAuth, async (req, res)=>{
    try {
        const loggedinuser =req.user

        const receivedRequests = await connectionRequest.find({
            toUserId : loggedinuser._id,
            status:"interested"
        }).populate("fromUserId", " firstName lastName about skills emailId photoUrl");

        if(receivedRequests.length === 0){
            return res.status(400).json({message:"There are no connection requests for you"})
        }
        res.json({
            message : "Data Fetched Successfully",
            data : receivedRequests
        })
    } catch(err){
        res.status(400).send("Error:" + err.message);
    }
})

userRouter.get("/user/connections", userAuth, async (req, res)=>{

    try
    {
            const loggedinUser =req.user
            const getConnections = await connectionRequest.find({
                $or:
                [   
                    {fromUserId : loggedinUser._id, status: "accepted"},
                    {toUserId : loggedinUser._id, status : "accepted"}
                ]
            })
            .populate("toUserId", "firstName lastName skills")
            .populate("fromUserId", "firstName lastName skills");

            const data = getConnections.map(row => {
                if (row.fromUserId._id.toString() === loggedinUser._id.toString()){
                    return row.toUserId
                }
                return row.fromUserId
            })
            res.json({Message : " connections fetched successfully",
                data : data
        })
    }
    catch(err){
        res.status(400).json({message : err.message})
    }
})

module.exports = userRouter;
