
global.framework ={};
global.framework = require("./core/serviceLoader");
 require("./db/models/index");
global.jwt = {};
jwt = require("jsonwebtoken");


var createError = require('http-errors');
var express = require('express');
var app = express();
var {exec} = require("child_process");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
global.colors = require("colors");
var fs = require("fs");
global.sequelize = require("./db/conn");
global.Sequelize =  require("sequelize");

global.readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})
require("./core/migrationLoader");

console.log(colors.red(process.env.CHECK));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var indexRouter = require('./core/route');
app.use( indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// 
module.exports = app;
