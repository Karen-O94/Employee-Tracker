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
  mainPrompt();
});

const mainPrompt = () => {
  inquirer.prompt({
    name: "action",
    type: "list",
    message: "What would you like to do?",
    choices: [
      "View all employees",
      "View all employees by role",
      "View all employees by department",
      "Add employee",
      "Add role",
      "Add department",
      "Update Employee",
    ]
  }).then((answer) => {
    switch (answer.action) {
      case 'View all employees':
        viewAllEmployees();
        break;

      case 'View all employees by role':
        viewAllEmpByRole();
        break;

      case 'View all employees by department':
        viewAllEmpByDept();
        break;

      case 'Add Employee':
        addEmployee();
        break;

      case 'Add Role':
        addRole();
        break;

      case 'Add Department':
        addDept();
        break;

      case 'Update Employee':
        updateEmployee();
        break;

      default:
        console.log(`Invalid action: ${answer.action}`);
        break;
    }
  });
};

//edit this function
const viewAllEmployees = () => {
    // Query from connection
    connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;",
      function(err, res) {
      if(err) return err;
      console.log("\n");

      // Display query results using console.table
      console.table(res);

      //Back to main menu
      mainPrompt();
  });
};

const viewAllEmpByRole = () => {
  connection.query("SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;", 
  function(err, res) {
  if (err) throw err
  console.table(res)
  mainPrompt()
  })
}

const viewAllEmpByDept = () => {
  connection.query("SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;", 
  function(err, res) {
    if (err) throw err
    console.table(res)
    mainPrompt()
  })
}

const addEmployee = () => {
  inquirer.prompt([
    {
      name: "firstname",
      type: "input",
      message: "Enter their first name "
    },
    {
      name: "lastname",
      type: "input",
      message: "Enter their last name "
    },
    {
      name: "role",
      type: "list",
      message: "What is their role? ",
      choices: selectRole()
    },
    {
        name: "choice",
        type: "rawlist",
        message: "Whats their managers name?",
        choices: selectManager()
    }
]).then(function (val) {
  var roleId = selectRole().indexOf(val.role) + 1
  var managerId = selectManager().indexOf(val.choice) + 1
  connection.query("INSERT INTO employee SET ?", 
  {
      first_name: val.firstName,
      last_name: val.lastName,
      manager_id: managerId,
      role_id: roleId
      
  }, function(err){
      if (err) throw err
      console.table(val)
      startPrompt()
  })

})
}