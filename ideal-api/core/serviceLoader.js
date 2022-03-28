var fs =require("fs");
const { framework } = require("passport");

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
                let f = "../"+newPath;
                object[fileName] = require(f);
            }
        }
    })
}
fs.readdirSync("./api")
.forEach(moduleName =>{
    functions[moduleName] = {};
    services[moduleName]={};
    importFunction(functions[moduleName],`./api/${moduleName}/functions`);
    importFunction(services[moduleName],`./api/${moduleName}/services`);
});

importFunction(functions,"./functions");
importFunction(services,"./services");
importFunction(core.middlewares,"./core/middlewares");

module.exports= {functions,services};
