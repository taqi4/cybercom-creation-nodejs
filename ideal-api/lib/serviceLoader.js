var fs =require("fs");
// var services = {};
// var files = fs.readdirSync("./services")
// .forEach((file)=>{
//     let [fileName,ext ] =file.split(".");
//     if(ext=="js"){
//         services[fileName]= require(`../services/${file}`);
//     }
// });
// module.exports.services = services;

var functions = {};
var controllers={};
var services={};
var middlewares={};
var importFunction = (object,path)=>{
    fs.readdirSync(path)
    .forEach((file)=>{
        let newPath = path + "/" + file;
        if(fs.lstatSync(newPath).isDirectory()){
            object[file] = {};
            importFunction(object[file],newPath);
        }else{
            let [fileName , ext ] = file.split(".");
            if(ext=="js"){
                let f = newPath.replace("/ideal-api","");
                object[fileName] = require(f);
            }
        }
    })
}
importFunction(functions,"../ideal-api/functions");
importFunction(controllers,"../ideal-api/controllers");
importFunction(services,"../ideal-api/services");
importFunction(middlewares,"../ideal-api/middlewares");
module.exports = {functions,services,controllers,middlewares};