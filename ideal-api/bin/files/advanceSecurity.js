const express = require('express');
var router  = new express.Router();
var User = db[modelToUse];

const refreshToken = async(req,res)=>{
    try{let user_key = req.params.user_key;
    let valid_key = await User.findAll({where:{user_key : user_key,refresh_token:req.cookies["refresh-token"]}});
    if(valid_key.length>1){
    res.status(420).send("try login again");        
    }
    var decoded = await jwt.verify(req.cookies["refresh-token"],process.env.REFRESH_TOKEN_KEY);
    if(decoded){
        var userExist = decoded.userServices;
        var accessToken = await jwt.sign({userExist},process.env.ACCESS_TOKEN_KEY,{expiresIn : 3600});
        var refreshToken = await jwt.sign({userExist}, process.env.REFRESH_TOKEN_KEY,{expiresIn:86400}) 
        valid_key.user_key = uuid.v4() ;
        valid_key.refresh_token = refreshToken;
        await User.update(valid_key,{where:{id:valid_key.id}});
    res.cookie("refresh-token",refreshToken,{
        secure: process.env.NODE_ENV !== "development",
        httpOnly: true,
        expires: dayjs().add(30, "days").toDate(),
      });
    res.status(200).send({accessToken,user_key : valid_key.user_key});
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
        let key = uuid.v4();
        userExist.user_key = key;
        userExist.refreshToken = refreshToken; 
        await User.update(userExist,{where:{id:userExist.id}});;
        return {accessToken,refreshToken,key};
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
        res.status(200).send({accessToken :tokens.accessToken,user_key : tokens.user_key});
    }
    else{
        res.status(400).send("invalid login credentials");
    }
}

router.post("/login",login);
router.post("/refresh-token/:user_key",refreshToken);

module.exports = router;
