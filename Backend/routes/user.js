const express = require("express");
const { UserSchema } = require("../schema");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");
const { Account } = require("../models/Account");

const router = express.Router;

router.post("/signup", async (req,res)=>{
    const {username ,password , firstName , lastName} = req.body();
    const {error} = UserSchema.validate({username ,password , firstName , lastName});
    if(error){
        return res.status(411).json({
            msg: "Form not valid."
        })
    }
    const existingUser = await  User.findOne({username : req.body.username});
    if(existingUser){
        res.status(411).json({
            msg: "Username is already taken . Please try another one."
        })
    }

    const user = await User.create({username ,password , firstName , lastName});
    const USER_ID = user._id;

    const account = await Account.create({
        userId : USER_ID ,
        Balance : 1+Math.random()*10000
    })
    const token = jwt.sign({USER_ID} , JWT_SECRET);

    res.json({
        msg:"User succesfully created",
        token : token
    });
});

router.get("/sign-in" ,async (req,res)=>{
    const {username , password} = req.body();
    const {error} = UserSchema.validate({username ,password});
    if(error){
        res.status(200).json({
            msg:"Please enter valid credentials"
        })
    }
    const user = await User.findOne({username,password});
    if(user){
        const token = jwt.sign({
            userId : user._id
        },JWT_SECRET);

        res.json({
            token : token
        })
        return
    }else{
        res.status(411).json({
            msg:"Error while logging in"
        })
    }
})

module.exports = {
    router
}