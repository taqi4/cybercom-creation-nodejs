const multer  = require('multer')
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads")
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() +  Math.floor(Math.random() * 1E6)+ file.originalname)
  }
});
const upload = multer({storage:fileStorage});
var fields = [{name:"avatar",maxCount:1}]


fields.push({name:photo,maxCount:2});

module.exports = upload.fields(fields);