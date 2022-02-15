
var express = require("express");
const  getEmployees = require( "../controller/employee-controller");

const router = express.Router();

router.get('/', getEmployees);
//router.post('/', addEmployee);

module.exports = router;