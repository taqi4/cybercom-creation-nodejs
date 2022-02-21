var express = require('express');
var router = express.Router();
var routes = require("../core/route-config.json") ?? [];
var auth = require("../middlewares/auth");
var home = require("../controllers/home");
var product = require("../controllers/product");

routes.forEach(route =>{
    const middlewares = route.middlewares.map(e=> {return eval(e)});

    router[route.method](route.path,[...middlewares],eval(route.controller));
});

module.exports = router;
