var jwt  = require("jsonwebtoken");
var db = require("../db/models/index")
var User = db.User;
module.exports.register = async (user)=>{
    console.log(user);
    let userExist = await User.findAll({where :{userName : user.userName}});
    if(userExist.length >0){
        return false;
    }
    let key = uuid.v4();
    user.user_key = key;
    await User.create({user}).then(data=>{return true}).catch(e=>{console.log(e);return false});
    return true;
}

module.exports.login =async  (user)=>{
    let userExist = await User.findOne({where :{userName : user.userName}});
    console.log(userExist);
    if(userExist.password==user.password){
      var accessToken = await  jwt.sign({userExist},process.env.ACCESS_TOKEN_KEY,{  expiresIn: 3600 });
      var refreshToken = await jwt.sign({userExist}, process.env.REFRESH_TOKEN_KEY,{expiresIn :86400});  
        return {accessToken,refreshToken};
    }
    else{
        return false;
    }
}