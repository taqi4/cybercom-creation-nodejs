var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res, next) {
  const user = "someUser"
  res.render('index', { title: 'Taqi', user });
});

module.exports = router;
