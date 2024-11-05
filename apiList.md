 # DevTinder APi's List


authRouter
 - POST/Signup
 - POST/Login
 - POST/logout

profileRouter
 - GET/profile/view
 - PATCH/profile/edit
 - PATCH/profile/password (Changepassword API)

connectionRequestRouter
 - POST/request/send/intersted/:userId
 - POST/request/send/ignored/:userId

 - We Will make dynamic API for the above both API's  POST/request/send/:status/:userId


 - POST/request/review/accepted/:requestId
 - POST/request/review/rejected/:requestId

userRouter
 - GET/user/connections
 - GET/user/requests/received
 - GET/user/feed - gets you the profiles of other users on platform


 Status : ignored, interested, accepted, rejected 