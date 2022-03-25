const express = require('express');
var router  = new express.Router();
var User = db.User;
const {v4 : uuidv4} = require('uuid');
var dayjs = require("dayjs");

const refreshToken = async(req,res)=>{
    try{
    var decoded = await jwt.verify(req.cookies["refresh-token"],req.cookies["_csrf"]);
    if(decoded){
        var userExist = decoded;
        var accessToken = await jwt.sign({userName:userExist.userName,role:userExist.role},req.cookies["_csrf"],{expiresIn : 3600});
        var refreshToken = await jwt.sign({userName:userExist.userName,role:userExist.role}, req.cookies["_csrf"],{expiresIn:86400}) 
    res.cookie("refresh-token",refreshToken,{
        secure: process.env.NODE_ENV !== "development",
        httpOnly: true,
        expires: dayjs().add(30, "days").toDate(),
      });
    res.status(200).send({accessToken});
     return true;
    }
    res.status(403).send("please login first");
    return false;}catch(e){
        console.log(e.message);
    }
}
const loginService =async  (user,req)=>{
    let userExist = await User.findOne({where :{userName : user.userName}});

    if(userExist.password==user.password){
        var accessToken = await  jwt.sign({userName:userExist.userName,role:userExist.role},req.cookies["_csrf"],{  expiresIn: 3600 });
        var refreshToken = await jwt.sign({userName:userExist.userName,role:userExist.role}, req.cookies["_csrf"],{expiresIn :86400});  
       
        return {accessToken,refreshToken};
    }
    else{
        return false;
    }
}
const login =async (req,res)=>{

    var tokens  =await loginService(req.body,req);
    if(tokens){
        res.cookie("refresh-token",tokens.refreshToken,{
          secure: process.env.NODE_ENV !== "development",
          httpOnly: true,
          expires: dayjs().add(30, "days").toDate(),
        });
        res.status(200).send(tokens.accessToken);
    }
    else{
        res.status(400).send("invalid login credentials");
    }
}

router.post("/login",login);
router.get("/refresh-token",refreshToken);

module.exports = router;
