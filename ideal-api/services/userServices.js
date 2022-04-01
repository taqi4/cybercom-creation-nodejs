var jwt = require("jsonwebtoken");
var db = require("../db/models/index")
var User = db.User;
var {v4:uuidv4} = require("uuid");
module.exports.register = async (user) => {
    console.log(user);
    let userExist = await User.findAll({
        where: {
            userName: user.userName
        }
    });
    if (userExist.length > 0) {
        return false;
    }
    user.user_key = null;
    user.refresh_token = null;
    await User.create({
        userName: user.userName,
        role: user.role,
        password: user.password
    }).then(data => {
        return true
    }).catch(e => {
        console.log(e);
        return false
    });
    return true;
}
// module.exports.loginSocial = async (user) => {
//     var email = user.emails[0].value;
//     let userExist = await User.findOne({where: {userName: email}});
//     if(!userExist){
//         await User.create({
//             userName: email,
//             role: "admin",
//             password: null
//         });
//         userExist = await User.findOne({where: {userName: email}});
//     }
//     var accessToken = await jwt.sign({userName:userExist.userName,role:userExist.role},process.env.ACCESS_TOKEN_KEY,{expiresIn:3600});
//     var refreshToken = await jwt.sign({userName:userExist.userName,role:userExist.role},process.env.REFRESH_TOKEN_KEY,{expiresIn:86400})
//     let key = uuidv4();
//     await User.update({refresh_token:refreshToken,user_key:key},{where:{id:userExist.id}});
//     return {accessToken,refreshToken,key};
// }

// module.exports.login =async  (user)=>{
//     let userExist = await User.findOne({where :{userName : user.userName}});
//     console.log(userExist);
//     if(userExist.password==user.password){
//         var accessToken = await  jwt.sign({userExist},process.env.ACCESS_TOKEN_KEY,{  expiresIn: 3600 });
//         var refreshToken = await jwt.sign({userExist}, process.env.REFRESH_TOKEN_KEY,{expiresIn :86400});  
//         let key = uuid.v4();
//         userExist.user_key = key;
//         userExist.refreshToken = refreshToken; 
//         await User.update(userExist,{where:{id:userExist.id}});;
//         return {accessToken,refreshToken};
//     }
//     else{
//         return false;
//     }
// }
