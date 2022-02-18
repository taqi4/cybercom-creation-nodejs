var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var hbs = require("hbs");
require("dotenv").config();


// var nodemailerHbs = require("nodemailer-express-handlebars");
// var nodemailer = require("nodemailer");

// let transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user:process.env.EMAIL,
//     pass:process.env.PASSWORD
//   }
// });
// transporter.use('compile', nodemailerHbs({
//   viewEngine : '',
//   viewPath:'./templates/views/'
// }
// ));

// let mailOptions = {
//   from : 'hkjigar3@gmail.com',
//   to :'ztaqi668@gmail.com',
//   cc:'mohammedtaqijigar@gmail.com',
//   subject:'do not reply testing',
//   text:"its working",
//   attachements : [
//     {filename : 'picture.jpeg', path:'./picture.jpeg'}
//   ],
//   template:'index'
// }

// transporter.sendMail(mailOptions,(err,data)=>{
//   if(err) console.log(err);
//   else console.log("message sent");
// });

var app = express();

// view engine setup
app.set('views', path.join(__dirname, './templates/views'));
app.set('view engine', 'hbs');

//register partial path
hbs.registerPartials(path.join(__dirname,"./templates/partials"));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

module.exports = app;
