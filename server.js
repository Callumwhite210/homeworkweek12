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
    mainMenu();
});
  
function mainMenu(){
    inquirer.prompt({
      name: "menu",
      type: "list",
      message: "Employee Tracker",
      choices: [
        "View Employees",
        "Update Employees",
        "Delete Employee"
      ]
    }).then(function(data){
      switch (data.menu){
        case "View Employees":
          viewEmployees();
          break;
      }
    })
}

function viewEmployees(){
  
};