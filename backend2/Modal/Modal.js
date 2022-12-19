const mysql = require("mysql");
const con =  mysql.createConnection({
    host: "XXX",
    user:"XXX",
    password: "XXX",
    database:"XXX"    
})

con.connect((err,result)=>{
    if (err) {
        console.log("database not connected", err.sqlMessage)
    }
    else(
        console.log("database connected")
    )
})
 module.exports ={con}