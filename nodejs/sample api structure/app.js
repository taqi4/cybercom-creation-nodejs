const express = require('express');
//require('./src/db/conn');
const app = express();
const router = require('./src/routes/employee.js');
const path = require('path');
 require('dotenv').config();
console.log(1);
const PORT = process.env.PORT || '8080';
app.use(express.json());

app.use("/api",router);




var nodeHbs = require("nodemailer-express-handlebars");
var nodemailer = require("nodemailer");
var hbs = require('hbs');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user:process.env.EMAIL,
    pass:process.env.PASSWORD
  }
});

transporter.use('compile', nodeHbs({
  viewEngine : 'hbs',
  viewPath: './views/'
}
));

let mailOptions = {
  from : 'mohammedtaqijigar@gmail.com',
  to :'ztaqi668@gmail.com',
  cc:'hkjigar3@gmail.com',
  subject:'do not reply testing',
  text:"its working",
  attachments : [
    {filename : 'picture.jpeg', path:'./picture.jpeg'}
  ],
  template:'index'
}

transporter.sendMail(mailOptions,(err,data)=>{
  if(err) console.log(err);
  else console.log("message sent");
});

app.get("/",async (req,res) => {
    res.send("HEELO THIS IS TAQI");
});

app.listen(PORT,()=>{
    console.log(`connection is established on ${PORT}`);
});