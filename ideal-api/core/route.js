
const { warn } = require('console');
var express = require('express');
var router = new express.Router();
var routes = require("../routes/route-config.json") ?? [];
var fs = require("fs");
var colors = require("colors");
const { validate } = require('../middlewares/auth');
var importedFiles = {};
routes.forEach(route =>{

        try{
            validation(route);
            let [controllerFile,controllerFunction] = route.controller.split(".");
            importFile(controllerFile,controllerFunction,"controllers");

            const middlewares = route.middlewares.map(e=> {
                let [middlewareFile,middlewareFunction] = e.split(".");

                importFile(middlewareFile,middlewareFunction ,"middlewares");
                return eval(`importedFiles.${e}`);
            });
            
            router[route.method](route.path,middlewares,eval(`importedFiles.${route.controller}`));
        }catch(e){
            console.log(colors.red(e.message,"error in \n",route));
        }
});


function importFile(fileName,functionName,source){
    if(Object.keys(importedFiles).includes(fileName)){
        console.log("no need to import ",fileName);
        return true;
    }
    if(!fs.existsSync(`../ideal-api/${source}`)){
        throw Error(`directory not available ../ideal-api/${source}` )
    }
    let files = fs.readdirSync(`../ideal-api/${source}`);
    
    if(!files.includes(fileName+".js")){
        throw Error(`${fileName} does'nt exist in ${source} folder`);
    }

    importedFiles[fileName] = require(`../${source}/${fileName}`);
    console.log(colors.blue(`imported ${fileName} from ../${source}/${fileName}`));

    if(!importedFiles[fileName][functionName]){
        throw Error(`no function named ${functionName} in ${fileName}`);
    }
    return true;
}


function validation({method,path,controller,middlewares}= route){
    if(!method || !path || !middlewares || !controller){
        throw Error(`all 4 properties are neccesary ${route} `);
    }
    if(method!='get' && method!="post" && method!="put" && method!="patch" && method!="delete"){
    throw Error(`${method } is not valid http method`);
    }
    if(typeof(method)!="string" || typeof(path)!="string" || typeof(controller)!="string"){
        throw Error(`method path and controller must be strings`);
    }
    if(typeof(middlewares)!="object"){
        throw Error("middleware needs to be an array");
    }
}
module.exports = router;
// function findFile(startPath , fileName){
//     console.log("-------------------------------");
//     let files = fs.readdirSync(startPath);

//     for(let i=0;i<files.length;i++){
//         let newPath=startPath+"/"+files[i];
//         if(files[i]==(fileName + ".js")){ //termination
//             console.log(newPath);
//             return newPath;
//         }
//         if(files[i]=="bin" || files[i]=="node_modules"){
//             continue;
//         }
//         let stat = fs.lstatSync(newPath);
//         console.log(files[i],stat.isDirectory());
//         if (stat.isDirectory()){
//              let result = findFile(newPath,fileName);
//              if(result){
//                  return result;
//              } //recursion
//         }     
//     }
// }


