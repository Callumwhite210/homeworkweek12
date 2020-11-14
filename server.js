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
          break;
        case "Add Department":
          addDepartment();
          break;
        case "Add Roles":
          addRoles();
          break;
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
  connection.query("SELECT * FROM employees", function(err, res){
    if (err) throw (err);
    
    let contable = [];
    for (let i = 0; i < res.length; i++){
      let tableRow = {};
      tableRow = res[i];
      contable.push(tableRow);
    }
    const table = cTable.getTable(contable);
    console.log(`\n${table}`);

    mainMenu();
  })
};

//Viewing Departments
function viewDepartment(){
  connection.query("SELECT * FROM department", function(err, res){
    if (err) throw (err);
    
    let contable = [];
    for (let i = 0; i < res.length; i++){
      let tableRow = {};
      tableRow = res[i];
      contable.push(tableRow);
    }
    const table = cTable.getTable(contable);
    console.log(`\n${table}`);

    mainMenu();
  })
};

//Viewing Roles
function viewRoles(){
  connection.query("SELECT * FROM roles", function(err, res){
    if (err) throw (err);
    
    let contable = [];
    for (let i = 0; i < res.length; i++){
      let tableRow = {};
      tableRow = res[i];
      contable.push(tableRow);
    }
    const table = cTable.getTable(contable);
    console.log(`\n${table}`);

    mainMenu();
  })
};

//Update Employees
function updateEmployees(){
  connection.query("SELECT * FROM employees", function(err, res){
    if (err) throw err;

    let selectedEmployee = res;
    inquirer.prompt([{
      name: "select",
      type: "list",
      message: "Please select employee you would like to update",
      choices: function(){
        var choiceArray = [];
          for (var i = 0; i < res.length; i++) {
            choiceArray.push((res[i].first_name)+" "+(res[i].last_name));
          }
          return choiceArray;
        }
    }]).then(function(data){
  })
  })};

//Adding Departments
function addDepartment(){
  inquirer.prompt([{
    name: "departmentName",
    message: "Department name",
    type: "input" 
    },
  ]).then(function(data){
    connection.query(`INSERT INTO department (department_name) VALUES ('${data.departmentName}')`,
    function(err,res){
      if (err) throw err;

      console.log(`${data.departmentName} has been add to the database!`);

      mainMenu();
    })
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
    message: "Instert employees role ID (Number)",
    type: "input"
    },
    {
    name: "managerId",
    message: "Insert manager ID if any (Number)",
    type: "input"
    }
  ]).then(function(data){
    connection.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('${data.firstName}', '${data.lastName}', '${data.roleId}', '${data.managerId}')`,
    function(err,res){
      if (err) throw err;

      console.log(`${data.firstName} ${data.lastName} has been add to the database!`);

      mainMenu();
    })
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
      message: "Insert department ID (Number)",
      type: "input"
      }
    ]).then(function(data){
      connection.query(`INSERT INTO roles (title, salary, department_id) VALUES ('${data.title}', '${data.salary}', '${data.departmentId}')`,
      function(err,res){
        if (err) throw err;
  
        console.log(`${data.title} has been add to the database!`);

        mainMenu();
      })
  })
};
  
//Delete Employee
function deleteEmployee(){
  mainMenu();
}