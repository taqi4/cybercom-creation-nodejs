var express = require('express');
var router = express.Router();
var data  = [1,2,3,4,5,6,7,8,9,10]
/* GET home page. */
router.get('/', function(req, res, next) {
  let pageNumber = req.query.page;
  let itemPerPage =  req.query.items;
  let page = pageNumber ? pageNumber : 1;
  let items = itemPerPage ? itemPerPage : 5;
  let start = (page - 1) * items;
  let end = Number(start) + Number(items);

  let result = {result: data.slice(start,end), count: data.length};

  res.send(result)//.render('index', { title: 'Express' });
});

module.exports = router;
