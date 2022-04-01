const { framework } = require("passport");

var validate1 = (req,res,next)=>{
    console.log("from validate 1");
    next();
}
module.exports.validate1 = validate1;