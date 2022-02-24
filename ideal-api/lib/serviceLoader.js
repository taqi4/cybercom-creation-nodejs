var fs =require("fs");
var files = fs.readdirSync("./services")
.forEach((file)=>{
    let [fileName,ext ] =file.split(".");
    if(ext=="js"){
         process[fileName]= require(`../services/${file}`);
    }
});
