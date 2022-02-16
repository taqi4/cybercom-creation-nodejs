const express = require('express');
//require('./src/db/conn');
const app = express();
const router = require('./src/routes/employee.js');
 require('dotenv');
console.log(1);
const PORT = process.env.PORT || '8080';
app.use(express.json());
app.use("/api",router);
app.get("/",async (req,res) => {
    res.send("HEELO THIS IS TAQI");
});

app.listen(PORT,()=>{
    console.log(`connection is established on ${PORT}`);
});