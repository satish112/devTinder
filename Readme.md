Creating DevTinder - it's an Application that connects all the developers through out the network

Tech_Stack: (MERN - MongoDB, Express, React, Nodejs)
-
- Creating below two micro services 
- Front_end : React_js
- Back_end : NodeJs, Express
- Database : Mongo DB

- using mongoose library
- creating the userSchema
- createed signup API to add data into database
- pushed some documents using API call from postman
- Error handles using try catch block
- Adding the express as middleware
- making the singup API dynamic to receive data from the end user
- API - get user buy email - /user
- API - Feed API - GET/feed - get all the users from the database - /feed
- API - Delete user using by Id
- API - Updated the user with EmailID
- API level validations on patch request and signup API
- Add API validation fro each field 
- DATA Sanitizing - Add API validation for each field 
- VAlidate data in signup API (Create a helper/util function in seperate fodler)
- Install bcrypt package
- Created PasswordHash using bcrypt.hash & save the user is excrupted password
- created login api 
- compared passwords and throw errors if email or password is invalid 
- Installed cookei-parse
- sent a dummy cookie to user 
- created get/profile API and check if you get the cookie back 
- Installed JWT (jsonwebtoken)
- // In login APi, after email and password validation,  create a JWT token and send back to user in cookies
- read the cookies inside your profile API and find the logged in user.
- userAuth Middleware
- Add the userAuth middleware in profile API and a new send connection request API
- set the expiry of JWT token and cookies to 7 days
- created userschema method to getJWT()
- created userschema method to comaprepassword(passwordInputByUser)

- Exploring the TinderAPi's
- created the list of API's
- grouped the multiple routes under respective routers
- explored the documentation for express.router
- created the route folder for managing auth, profile, request routers
- created the authRouter, profileRouter, requestRouter
- Imported the those routers in app.js

