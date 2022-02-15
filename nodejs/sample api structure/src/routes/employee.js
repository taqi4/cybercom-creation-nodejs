
var express = require("express");
const  {getEmployees,addEmployee} = require( "../controller/employee-controller");

module.exports= router =  express.Router();

router.get('/', getEmployees);
router.post('/', addEmployee);
console.log(router);
console.log(module.exports);

//module.exports=  router;