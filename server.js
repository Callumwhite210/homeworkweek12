const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

const connection = mysql.createConnection({
  
host: "localhost",
  
port: 3306,
  
user: "root", 

password: "localpass",
database: "department_db"
});
  
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection();
});
  
function afterConnection(){
    connection.query("SELECT * FROM employee", function(err, res){
      if (err) throw err;
      console.log(res);
      connection.end();
    });
  };