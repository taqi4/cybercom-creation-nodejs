global.framework = {};
require("./db/models/index");
framework = require("./core/serviceLoader");

global.jwt = {};
jwt = require("jsonwebtoken");
require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
global.colors = require("colors");
var fs = require("fs");
global.sequelize = require("./db/conn");
global.Sequelize = require("sequelize");
const csrf = require('csurf');
var csrfProtection = csrf({
  cookie: true
});
const passport = require('passport');
const cookieSession = require('cookie-session')
require('./core/passport-setup');
global.readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});
require("./core/migrationLoader");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser("secret"));
app.use(express.static(path.join(__dirname, 'public')));

app.use(csrfProtection);
// Initializes passport and passport sessions
app.use(cookieSession({
  name: 'tuto-session',
  keys: ['key1', 'key2']
}))
app.use(passport.initialize());
app.use(passport.session());

var {
  multerWares,
  upload
} = require("./core/middlewares/fileMiddleware");
framework.multerWares = multerWares;
var indexRouter = require('./core/route');
var coreRouter = require("./core/coreRoutes");

app.use(indexRouter);
app.use(coreRouter);
// app.use(upload);
// console.log(multerWares["docs"]);
Object.keys(multerWares).forEach(key => {
  app.use(multerWares[key])
});
// app.post('/profile',framework.multerWares.nn, function (req, res, next) {
//   // req.file is the `avatar` file
//   // req.body will hold the text fields, if there were any
//   console.log(Object.keys(req.files));
//   res.status(200).send('ok');
// });


// Example protected and unprotected routes

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// 
module.exports = app;