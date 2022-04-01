const multer = require('multer');
const fs = require('fs');
const path = require('path');
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads")
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + Math.floor(Math.random() * 1E6) + file.originalname)
  }
});
const upload = multer({
  storage: fileStorage
});
var fields = [{
  name: "avatar",
  maxCount: 1
}]
fields.push({
  name: "video",
  maxCount: 2
});
var multerWares = {};

function createMulter(storagePath, fields, middlewareName) {
  let pathArray = storagePath.split("/");
  let temp = "";
  for (let i in pathArray) {
    temp = path.join(temp, pathArray[i])
    if (!fs.existsSync(temp)) {
      fs.mkdirSync(temp);
    }
  }
  var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, storagePath)
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + Math.floor(Math.random() * 1E6) + file.originalname)
    }
  });
  let uploadMiddleware = multer({
    storage: storage
  }).fields(fields);
  multerWares[middlewareName] = uploadMiddleware;
  return true;
}

createMulter("api/user/files",[{"name":"photos","maxCount":"1"}],"docs");

createMulter("api/user/files",[{"name":"photo2","maxCount":"1"}],"docs2");

createMulter("public/upload2",[{"name":"taqi","maxCount":"2"}],"docs3");

fields.push({name:"docs4",maxCount:2});



createMulter("api/user/files",[{"name":"photos","maxCount":1}],"nn");

module.exports = {multerWares,upload:upload.fields(fields)};