const jwt = require("jsonwebtoken");
var db = require("../db/models/index")
var User = db.User;
var uuid = require("uuid");
var dayjs = require("dayjs");

// module.exports.login =async (req,res)=>{

//       var tokens  =await framework.services.userServices.login(req.body);
//       if(token){
//           res.cookie("refresh-token",tokens.refreshToken,{
//             secure: process.env.NODE_ENV !== "development",
//             httpOnly: true,
//             expires: dayjs().add(30, "days").toDate(),
//           });
//           res.status(200).send(tokens.accessToken);
//       }
//       else{
//           res.status(400).send("invalid login credentials");
//       }
// }
module.exports.register = async (req, res) => {
    if (await framework.services.userServices.register(req.body)) {
        res.status(201).send("user registered");
    } else {
        res.status(403).send("registration failed");
    }
}
module.exports.registerForm = async (req, res) => {
    res.render("register", {
        csrfToken: req.csrfToken()
    })
}
module.exports.profile = async(req,res)=>{
    res.render("profile",{
        csrfToken:req.csrfToken()
    })
}
// module.exports.refreshToken = async(req,res)=>{
//     try{let user_key = req.params.user_key;
//     let valid_key = await User.findAll({where:{user_key : user_key,refresh_token:req.cookies["refresh-token"]}});
//     if(valid_key.length>1){
//     res.status(420).send("try login again");        
//     }
//     var decoded = await jwt.verify(req.cookies["refresh-token"],process.env.REFRESH_TOKEN_KEY);
//     if(decoded){
//         var userExist = decoded.userServices;
//         var accessToken = await jwt.sign({userExist},process.env.ACCESS_TOKEN_KEY,{expiresIn : 3600});
//         var refreshToken = await jwt.sign({userExist}, process.env.REFRESH_TOKEN_KEY,{expiresIn:86400}) 
//         valid_key.user_key = uuid.v4() ;
//         valid_key.refresh_token = refreshToken;
//         await User.update(valid_key,{where:{id:valid_key.id}});
//     res.cookie("refresh-token",refreshToken,{
//         secure: process.env.NODE_ENV !== "development",
//         httpOnly: true,
//         expires: dayjs().add(30, "days").toDate(),
//       });
//     res.status(200).send({accessToken});
//      return true;
//     }
//     res.status(403).send("please login first");
//     return false;}catch(e){
//         console.log(e.message);
//     }
// }