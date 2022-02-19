var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var ejs = require('ejs');
var path = require('path');
// ejs.renderFile(__dirname + "../views/mail.ejs", { name: 'taqi' }, function (err, data) {
//   if (err) {
//       console.log(err);
//   } else {
//       var mainOptions = {
//           from: 'mohammedtaqijigar@gmail.com',
//           to: 'ztaqi668@gmail.com',
//           cc:'hkjigar3@gmail.com',
//           subject: 'Account Activated server genrated',
//           html: data
//       }}});
//       transporter.sendMail(mailOptions,(err,data)=>{
//         if(err) console.log(err);
//         else console.log("message sent");
//       });
      

/* GET home page. */
router.get('/',  async (req, res, next)=> {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user:process.env.EMAIL,
      pass:process.env.PASSWORD
    }
  });
  transporter.verify((error, success) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Server is ready to take messages');
    }
  });
  
  const data = await   ejs.renderFile(path.join(__dirname , "../views","/mail.ejs"), { name: 'taqi' });
  console.log(data);
  var mailOptions = {
    from: 'mohammedtaqijigar@gmail.com',
    to: 'ztaqi668@gmail.com',
    cc:'hkjigar3@gmail.com',
    subject: 'Account Activated',
    // attachments :[
    //   {filename : "picture.jpeg" , path:"./picture.jpeg"}
    // ],
    html: data
  };
  


await transporter.sendMail(mailOptions,(err,data)=>{
  if(err) console.log(err);
  else console.log("message sent");
});
res.render('index', { title: 'Taqi' });
});
module.exports = router;
