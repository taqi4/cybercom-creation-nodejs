
var express = require("express");
const  {getEmployees,addEmployee} = require( "../controller/employee-controller");

const router =  express.Router();

router.get('/', getEmployees);
router.post('/', addEmployee);



module.exports=  router;