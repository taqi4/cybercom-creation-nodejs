var sql = require("mssql");

var config = {
    user: 'root',
    password: 'Jigar11@',
    server: 'localhost:3306', 
    database: 'exam' 
};
sql.connect(config,(err)=>{
    if(!err){
        console.log("Db connection succesfull ");
    }
    else{
        console.log(err);
    }

}); 