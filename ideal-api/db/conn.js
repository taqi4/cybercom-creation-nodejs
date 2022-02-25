var Sequelize = require("sequelize");

var sequelize =  new Sequelize("neel","root","Jigar11@",{
    dialect:"mysql",
    host:"localhost"
});
module.exports = sequelize;