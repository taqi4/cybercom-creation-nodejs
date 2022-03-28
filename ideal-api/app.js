global.framework={};
require("./db/models/index");
framework = require("./core/serviceLoader");

global.jwt = {};
jwt = require("jsonwebtoken");
require('dotenv').config()

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
})
require("./core/migrationLoader");

console.log(colors.red(process.env.CHECK));
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
var indexRouter = require('./core/route');
var coreRouter = require("./core/coreRoutes");

app.use(indexRouter);
app.use(coreRouter);

app.use(cookieSession({
  name: 'tuto-session',
  keys: ['key1', 'key2']
}))

// Auth middleware that checks if the user is logged in
const isLoggedIn = (req, res, next) => {
  if (req.user) {
      next();
  } else {
      res.sendStatus(401);
  }
}

// Initializes passport and passport sessions
app.use(passport.initialize());
app.use(passport.session());

// Example protected and unprotected routes
app.get('/', (req, res) => res.send('Example Home page!'))
app.get('/failed', (req, res) => res.send('You Failed to log in!'))

// In this route you can see that if the user is logged in u can acess his info in: req.user
app.get('/good', isLoggedIn,async (req, res) => {

  var tokens = await framework.services.userServices.loginSocial(req.user);
  if (tokens) {
    res.cookie("refresh-token", tokens.refreshToken, {
        secure: process.env.NODE_ENV !== "development",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    });
    console.log(tokens);
    res.status(200).send({
        accessToken: tokens.accessToken,
        user_key: tokens.key
    });
} else {
    res.status(400).send("invalid login credentials");
}
});

// Auth Routes
app.get('/login/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
function(req, res) {
  // Successful authentication, redirect home.
  console.log(req.user.emails[0].value);
  res.redirect('/good');
}
);
app.get("/login/facebook",passport.authenticate('facebook',{scope:['profile']}));
app.get("/facebook/callback",passport.authenticate('facebook',{failureRedirect:'/failed'}),
function(req,res){
  //successfull authentication,redirect home
  res.redirect('/good');
}
);
app.get('/logout', (req, res) => {
  req.session = null;
  req.logout();
  res.redirect('/');
})


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