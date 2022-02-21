module.exports.validate = (req,res,next)=>{
    console.log("validated");
    next();
}
module.exports.kick = (req,res,next)=>{
    console.log("(kicked)");
    next();
}