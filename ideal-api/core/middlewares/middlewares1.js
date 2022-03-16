
module.exports.authenticate = (roles)=>{
    return async (req,res,next)=>{
        try{
        if(roles.length>0){
            console.log(req.headers["x-access-token"]);
        var decoded = jwt.verify(req.headers["x-access-token"],process.env.ACCESS_TOKEN_KEY);
        console.log(decoded);
     if(decoded){
        if(roles.includes(decoded.userExist.role)){
            next();
        }else{
            res.status(403).send("not authorized");
            return false;
        }
     }else{
         res.status(402).send("invalid token");
         return false;
     }
    }else{
        next();
    }}catch(e){
        console.log(e.message);
    }}
}