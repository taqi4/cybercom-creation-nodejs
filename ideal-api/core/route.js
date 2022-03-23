var express = require('express');
var router = new express.Router();
var routes = require("../routes/route.json") ?? [];
var importedFiles = {};
var fs = require("fs");
var colors = require("colors");
var authenticate = require("./middlewares/middlewares1").authenticate;
var dups = [];
//for module route.json
fs.readdirSync("./api")
    .forEach(moduler => {
        let subRoutes = require(`../api/${moduler}/route.json`);


        subRoutes.forEach(subRoute => {

            try {
                validation(subRoute);
                let [controllerFile, controllerFunction] = subRoute.controller.split(".");
                // importFile(controllerFile,controllerFunction,`api/${moduler}/controllers`,moduler);
                let middlewares = subRoute.middlewares.map(e => {
                    let [middlewareFile, middlewareFunction] = e.split(".");
                    //importFile(middlewareFile,middlewareFunction ,`api/${moduler}/middlewares`,moduler);
                    return require(`../api/${moduler}/middlewares/${middlewareFile}`)[middlewareFunction];
                });
                let path = subRoutes.global ? `${subRoute.path}` : `/${moduler}+${subRoute.path}`;
                duplicate(path, subRoute.method);
                router[subRoute.method]
                    (path,
                        [core.middlewares.middlewares1.authenticate(subRoute.roles), ...middlewares],
                        require(`../api/${moduler}/controllers/${controllerFile}`)[controllerFunction]
                    );


            } catch (e) {
                console.log(e);
            }
        })
    });
//for global route.json
routes.forEach(route => {

    try {
        validation(route);
        let [controllerFile, controllerFunction] = route.controller.split(".");
        importFile(controllerFile, controllerFunction, "controllers", " ");

        const middlewares = route.middlewares.map(e => {
            let [middlewareFile, middlewareFunction] = e.split(".");

            importFile(middlewareFile, middlewareFunction, "middlewares", " ");
            return importedFiles[middlewareFile][middlewareFunction];
        });
        duplicate(route.path, route.method);
        router[route.method]
            (route.path,
                [core.middlewares.middlewares1.authenticate(route.roles), ...middlewares], eval(`importedFiles.${route.controller}`)
            );
    } catch (e) {
        console.log(colors.red(e.message, "error in \n", route));
    }
});
//to check duplicate routes
function duplicate(path, method) {
    if (dups.some(object => object.path == path && object.method == method)) {
        console.log(colors.yellow(`route  ${method}: ${path} already in use `));
        throw Error(`route  ${method}: ${path} already in use `);
    } else {
        dups.push({
            method,
            path
        });
    }
}

function importFile(fileName, functionName, source, moduler) {
    if (Object.keys(importedFiles).includes(fileName)) {
        return true;
    }
    if (!fs.existsSync(`./${source}`)) {
        throw Error(`directory not available ./${source}`)
    }
    let files = fs.readdirSync(`./${source}`);

    if (!files.includes(fileName + ".js")) {
        throw Error(`${fileName} does'nt exist in ${source} folder`);
    }
    if (moduler != " ") {
        importedFiles[moduler] = {
            [fileName]: require(`../${source}/${fileName}`)
        }
        //importedFiles[moduler][fileName] = require(`../${source}/${fileName}`);
        console.log("importing... moduler");
        console.log(colors.blue(`imported ${fileName} from ../${source}/${fileName}`));
    } else {
        importedFiles[fileName] = require(`../${source}/${fileName}`);
    }
    if (!importedFiles[fileName][functionName]) {
        throw Error(`no function named ${functionName} in ${fileName}`);
    }
    return true;
}


function validation({
    method,
    path,
    controller,
    middlewares
} = route) {
    if (!method || !path || !middlewares || !controller) {
        throw Error(`all 4 properties are neccesary ${route} `);
    }
    if (method != 'get' && method != "post" && method != "put" && method != "patch" && method != "delete") {
        throw Error(`${method } is not valid http method`);
    }
    if (typeof (method) != "string" || typeof (path) != "string" || typeof (controller) != "string") {
        throw Error(`method path and controller must be strings`);
    }
    if (typeof (middlewares) != "object") {
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