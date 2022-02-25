
global.framework ={};
framework = require("./lib/serviceLoader");
console.log(framework);
var createError = require('http-errors');
var express = require('express');
var app = express();

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var colors = require("colors");
var fs = require("fs");
var sequelize = require("./db/conn");
require("./models/product")
// let files = fs.readdirSync("./services")
// .forEach((file)=>
//      {
//        services = {...services,...require(`./services/${file}`)}
//       });


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

app.use('/', indexRouter);

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

sequelize
.sync()
.catch(e=>console.log(e)); 

module.exports = app;
