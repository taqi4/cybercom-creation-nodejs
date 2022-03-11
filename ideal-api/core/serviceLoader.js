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
var services={};
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
fs.readdirSync("../ideal-api/modules")
.forEach(moduleName =>{
    functions[moduleName] = {};
    services[moduleName]={};
    importFunction(functions[moduleName],`../ideal-api/modules/${moduleName}/functions`);
    importFunction(services[moduleName],`../ideal-api/modules/${moduleName}/services`);
});
importFunction(functions,"../ideal-api/functions");
importFunction(services,"../ideal-api/services");
module.exports = {functions,services};