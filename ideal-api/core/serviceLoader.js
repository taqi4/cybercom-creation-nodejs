var fs =require("fs");

var functions = {};
var services={};
global.core = {};
core.middlewares ={};
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
fs.readdirSync("../ideal-api/api")
.forEach(moduleName =>{
    functions[moduleName] = {};
    services[moduleName]={};
    importFunction(functions[moduleName],`../ideal-api/api/${moduleName}/functions`);
    importFunction(services[moduleName],`../ideal-api/api/${moduleName}/services`);
});
importFunction(functions,"../ideal-api/functions");
importFunction(services,"../ideal-api/services");
importFunction(core.middlewares,"../ideal-api/core/middlewares");

module.exports = {functions,services};