var express = require('express');
var router = express.Router();
var routes = require("../routes/route-config.json") ?? [];
var fs = require("fs");
var path = require('path');
var importedFiles = {};

routes.forEach(route =>{
    importFile(route.controller.substr(0,route.controller.indexOf(".")),"controllers");
    const middlewares = route.middlewares.map(e=> {
        importFile(e.substr(0,e.indexOf(".")),"middlewares");
        return eval(`importedFiles.${e}`);
    });

    router[route.method](route.path,middlewares,eval(`importedFiles.${route.controller}`));});


function importFile(fileName,source){
    if(Object.keys(importedFiles).includes(fileName)){
        console.log("no need to import ",fileName);
        return true;
    }
    let filePath = findFile(`../ideal-api/${source}` ,fileName);  
    if(filePath){
        let f = filePath.replace("../ideal-api","..")
        console.log("imported ",fileName , " from ",f);
        
        importedFiles[fileName] = require(f);
        
        console.log(importedFiles);
        return true;
    }
    else{
        console.log("file not found");
        

    }
}

function findFile(startPath , fileName){
    console.log("-------------------------------");
    let files = fs.readdirSync(startPath);

    for(let i=0;i<files.length;i++){
        let newPath=startPath+"/"+files[i];
        if(files[i]==(fileName + ".js")){ //termination
            console.log(newPath);
            return newPath;
        }
        if(files[i]=="bin" || files[i]=="node_modules"){
            continue;
        }
        let stat = fs.lstatSync(newPath);
        console.log(files[i],stat.isDirectory());
        if (stat.isDirectory()){
             let result = findFile(newPath,fileName);
             if(result){
                 return result;
             } //recursion
        }     
    }
}

module.exports = router;
