const express = require("express");
const { userAuth } = require("../middlewares/auth");
const userRouter = express.Router();
const connectionRequest = require("../models/connectionRequest");
const user = require("../models/user");


userRouter.get("/user/requests/received", userAuth, async (req, res)=>{
    try {
        const loggedinuser =req.user

        const receivedRequests = await connectionRequest.find({
            toUserId : loggedinuser._id,
            status:"interested"
        }).populate("fromUserId", " firstName lastName about skills emailId photoUrl");

        // if(receivedRequests.length === 0){
        //     return res.status(400).json({message:"There are no connection requests for you"})
        // }
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
            }).populate("fromUserId", "firstName lastName skills age gender photoUrl emailId about")
            .populate("toUserId", "firstName lastName skills age gender photoUrl emailId about");

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

userRouter.get("/feed", userAuth, async(req, res)=>{
    try{

        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit > 50 ? 50 : limit;
        const skip = (page - 1)*limit;
        
        const loggedinUser = req.user

        const allConnections = await connectionRequest.find({
            $or:[
                {fromUserId : loggedinUser._id},{toUserId : loggedinUser._id}
            ]
        }).select("fromUserId toUserId")

        const hideUsersFromFeed = new Set()

        allConnections.forEach((req) => {
            hideUsersFromFeed.add(req.fromUserId.toString())
            hideUsersFromFeed.add(req.toUserId.toString())
        });
      const getpeople = await user.find({
            $and:
            [
                    {_id: {$ne:loggedinUser._id}},
                    {_id: {$nin: Array.from(hideUsersFromFeed)}}
            ]
            
        }).skip(skip).limit(limit);

        res.json({
            data: getpeople
        })
    }catch(err){
        res.status(400).json({message:err.maessage})
    }
})

module.exports = userRouter;
