var module1Home = (req,res)=>{
    console.log("from controller of module 1 home");
    res.send("ok");
}
var module1Index = ()=>{
    console.log("from controller of module 1 index");
}
var profile = async(req,res)=>{
    console.log("from controller of module 1 profile");
    console.log(req.files["photos"][0]);
    res.send("ok");
}
module.exports = {module1Home,module1Index,profile};