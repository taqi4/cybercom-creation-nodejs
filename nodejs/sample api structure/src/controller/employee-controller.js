var sql = require("mssql");
var request = new sql.Request();


const getEmployees = async (req, res) => {
    try{
        // const employees = await  request.query('select * from employee', function (err, recordset) {
            
        //     if (err) console.log(err)
        //     console.log("hello");

            
        //     return recordset;
            
        //});
        
        //console.log( req.Header.Get("X-Real-Ip")  );
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        console.log(ip); 
       // console.log(req);
  console.log(req.headers); 

        const users = "taqi";
        res.send(users+ip).status(200);
    }catch( error ){
        res.status(404).json({ message: error.message })
    }
}

const addEmployee = async (req, res) => {
    try{
        // const employees = await  request.query('select * from employee', function (err, recordset) {
            
        //     if (err) console.log(err)
        //     console.log("hello");

            
        //     return recordset;
            
        //});
         const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log(req.headers); 
        const users = "taqi post";
        res.send(users+ip).status(200);
    }catch( error ){
        response.status(404).json({ message: error.message })
    }
}
module.exports = {
    getEmployees:getEmployees,
    addEmployee:addEmployee
};