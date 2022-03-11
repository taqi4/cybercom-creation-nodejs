var jwt  = require("jsonwebtoken");
var db = require("../db/models/index")
var User = db.User;
module.exports.register = async (user)=>{
    console.log(user);
    let userExist = await User.findAll({where :{userName : user.userName}});
    if(userExist.length >0){
        return false;
    }
    await User.create({user}).then(data=>{return true}).catch(e=>{console.log(e);return false});
    return true;
}

module.exports.login =async  (user)=>{
    let userExist = await User.findOne({where :{userName : user.userName}});
    console.log(userExist);
    if(userExist.password==user.password){
      var token = await  jwt.sign({userExist},"qwertyuio",{  expiresIn: 86400 });
      console.log(token);
        return String(token);
    }
    else{
        return false;
    }
}