
module.exports.authenticate = (roles)=>{
    return async (req,res,next)=>{
        if(roles.length>0){
            console.log(req.headers["x-access-token"]);
        var decoded = jwt.verify(req.headers["x-access-token"],"qwertyuio");
        console.log(decoded);
     if(decoded){
        if(roles.includes(decoded.userExist.role)){
            next();
        }else{
            res.status(403).send("not authorized");
            return false;
        }
     }else{
         res.status(401).send("invalid token");
         return false;
     }
    }else{
        next();
    }}
}