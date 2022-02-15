var sql = require("mssql");
var request = new sql.Request();


const getEmployees = async (req, res) => {
    try{
        // const employees = await  request.query('select * from employee', function (err, recordset) {
            
        //     if (err) console.log(err)
        //     console.log("hello");

            
        //     return recordset;
            
        //});
        const users = "taqi";
        res.send(users).status(200);
    }catch( error ){
        response.status(404).json({ message: error.message })
    }
}

const addEmployee = async (req, res) => {
    try{
        // const employees = await  request.query('select * from employee', function (err, recordset) {
            
        //     if (err) console.log(err)
        //     console.log("hello");

            
        //     return recordset;
            
        //});
        const users = "taqi post";
        res.send(users).status(200);
    }catch( error ){
        response.status(404).json({ message: error.message })
    }
}
module.exports = {
    getEmployees:getEmployees,
    addEmployee:addEmployee
};