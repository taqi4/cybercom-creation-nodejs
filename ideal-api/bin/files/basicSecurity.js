const express = require('express');
var router  = new express.Router();
var User = db.User;

const refreshToken = async(req,res)=>{
    try{
    var decoded = await jwt.verify(req.cookies["refresh-token"],process.env.REFRESH_TOKEN_KEY);
    if(decoded){
        var userExist = decoded.userServices;
        var accessToken = await jwt.sign({userExist},process.env.ACCESS_TOKEN_KEY,{expiresIn : 3600});
        var refreshToken = await jwt.sign({userExist}, process.env.REFRESH_TOKEN_KEY,{expiresIn:86400}) 
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
const loginService =async  (user)=>{
    let userExist = await User.findOne({where :{userName : user.userName}});
    console.log(userExist);
    if(userExist.password==user.password){
        var accessToken = await  jwt.sign({userExist},process.env.ACCESS_TOKEN_KEY,{  expiresIn: 3600 });
        var refreshToken = await jwt.sign({userExist}, process.env.REFRESH_TOKEN_KEY,{expiresIn :86400});  
        // let key = uuid.v4();
        // userExist.user_key = key;
        // userExist.refreshToken = refreshToken; 
        // await User.update(userExist,{where:{id:userExist.id}});;
        return {accessToken,refreshToken};
    }
    else{
        return false;
    }
}
const login =async (req,res)=>{

    var tokens  =await loginService(req.body);
    if(token){
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
router.post("/refresh-token",refreshToken);

module.exports = router;
