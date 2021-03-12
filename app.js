const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

// Creating connection
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'employee_db',
});

// Error if connection isn't made 
connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
    connection.end();
});

const mainQuestions = () => {
    inquirer.prompt({
        name: "action",
      type: "list",
      message: "MAIN MENU",
      choices: [
        "View all employees",
        "View all employees by role",
        "View all employees by department",
        "View all employees by manager",
        "Add employee",
        "Add role",
        "Add department",
      ]
    }).then((response) => {

    })
}