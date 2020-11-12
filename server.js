const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
const { allowedNodeEnvironmentFlags } = require("process");

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

//Main command Prompt
function mainMenu(){
    inquirer.prompt({
      name: "menu",
      type: "list",
      message: "Employee Tracker",
      choices: [
        "View Employees",
        "Update Employees",
        "Add Employees",
        "Delete Employee",
        "View Department",
        "Add Department",
        "View Roles",
        "Add Roles",
      ]
    }).then(function(data){
      switch (data.menu){
        case "View Employees":
          viewEmployees();
          break;
        case "View Department":
          viewDepartment();
          break;
        case "View Roles":
          viewRoles();
          break;
        case "Update Employees":
          updateEmployees();
          break;
        case "Add Employees":
          addEmployees();
        case "Add Department":
          addDepartment();
          break;
        case "Add Roles":
          addRoles();
        case "Delete Employee":
          deleteEmployee();
          break;
          default:
          break;
      }
    })
}

//Viewing Employees
function viewEmployees(){
  connection.query("SELECT * FROM employee", function(err, res){
    if (err) throw (err);
    console.log(res);
    mainMenu();
  })
};

//Viewing Departments
function viewDepartment(){
  connection.query("SELECT * FROM department", function(err, res){
    if (err) throw (err);
    console.log(res);
    mainMenu();
  })
};

//Viewing Roles
function viewRoles(){
  connection.query("SELECT * FROM roles", function(err, res){
    if (err) throw (err);
    console.log(res);
    mainMenu();
  })
};

//Update Employees
function updateEmployees(){
  console.log("update Employees");
  mainMenu();
};

//Adding Departments
function addDepartment(){
  inquirer.prompt([{
    name: "departmentName",
    message: "Department name",
    type: "input" 
    },
  ]).then(function(data){
    console.log (`${data.name}`);
    var query = connect.query(
      "INSTERT INTO department SET ?",
      [{department_name: data.name}],
      function(err, res) {
        if (err) throw err;

        console.log(res.affectedRows + "Names Inserted!\n");  
       
        //logs query
        console.log(query.sql);     
      }
    );
    mainMenu();
  })
};

//Adding Employees
function addEmployees(){
  inquirer.prompt([{
    name: "firstName",
    message: "Insert employee first name",
    type: "input"
    },
    {
    name: "lastName",
    message: "Instert employees last name",
    type: "input"
    },
    {
    name: "roleId",
    message: "Instert employees role ID",
    type: "input"
    },
    {
    name: "managerId",
    message: "Insert manager ID if any",
    type: "input"
    }
  ]).then(function(data){

  })
};

//Adding Roles
function addRoles(){
  inquirer.prompt([{
      name: "title",
      message: "Insert role",
      type: "input"
      },
      {
      name: "salary",
      message: "Input role salary",
      type: "input"
      },
      {
      name: "departmentId",
      message: "Insert department ID",
      type: "input"
      }
    ]).then(function(data){
      
    })
};
  
//Delete Employee
function deleteEmployee(){
  console.log("delete employee");
  mainMenu();
};
