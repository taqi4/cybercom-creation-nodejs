var express = require('express');
var router = express.Router();
var {users ,options} = require("../helpers/constants");
var pdf = require("pdf-creator-node");
var ejs = require("ejs");
const path = require('path');
/* GET users listing. */

router.get('/pdf', async (req, res, next)=> {
try {
  const html = await ejs.renderFile(path.join(__dirname , "../views/pdf.ejs"),{users});
  console.log(html);
  const filename = Math.random() + '_doc' + '.pdf';
  const document = {
    html: html,
    data: {
        users
    },
    path: './public/docs/' + filename
};
    pdf.create(document, options)
    .then(res => {
        console.log(res);
    }).catch(error => {
        console.log(error);
    });
    const filepath = 'http://localhost:3000/docs/' + filename;

    res.render('download', {
        path: filepath
    });
  }
  catch(e){
    console.log(e);
  }
});

module.exports = router;
