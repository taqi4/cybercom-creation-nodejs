const jwt  = require("jsonwebtoken");

module.exports.login =async (req,res)=>{

      var token  =await framework.services.userServices.login(req.body);
      if(token){
          res.status(200).send(token);
      }
      else{
          res.status(400).send("invalid login credentials");
      }
}
module.exports.register =async (req,res)=>{
    if(await framework.services.userServices.register(req.body)){
        res.status(201).send("user registered");
    }else{
        res.status(403).send("registration failed");
    }
}
module.exports.refreshToken = async(req,res)=>{
    var decoded = await jwt.verify(req.headers["x-access-token"],"qwertyuio");
    if(decoded){
    var userExist = decoded.userServices;
    var token = await jwt.sign({userExist},"qwertyuio",{expiresIn : 86400});
     res.status(200).send(token);
     return true;
    }
    res.status(403).send("please login first");
    return false;
}