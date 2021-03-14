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
      "Add Employee",
      "Add Role",
      "Add Department",
      "Update Employee",
      "Exit"
    ]
  }).then((val) => {
    switch (val.action) {
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

      case 'Exit':
        exitApp();
        break;

      default:
        console.log(`Invalid action: ${val.action}`);
        break;
    }
  });
};

const viewAllEmployees = () => {
  connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;",
    function (err, res) {
      if (err) throw err
      console.table(res)
      mainPrompt()
    })
};

const viewAllEmpByRole = () => {
  connection.query("SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;",
    function (err, res) {
      if (err) throw err
      console.table(res)
      mainPrompt()
    });
};

const viewAllEmpByDept = () => {
  connection.query("SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;",
    function (err, res) {
      if (err) throw err
      console.table(res)
      mainPrompt()
    });
};

var roleArr = [];
const selectRole = () => {
  connection.query("SELECT * FROM role", function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      roleArr.push(res[i].title);
    }

  })
  return roleArr;
}

//Select
var managersArr = [];
selectManager = () => {
  connection.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL", function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      managersArr.push(res[i].first_name);
    }

  })
  return managersArr;
}
//Add Employee//
const addEmployee = () => { 
    inquirer.prompt([
        {
          name: "firstName",
          type: "input",
          message: "Enter their first name "
        },
        {
          name: "lastName",
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
            message: "Whats their managers name? Press Enter key if there is no manager",
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
          mainPrompt()
      })

  });
};

  const updateEmployee = () => {
    connection.query(
        "SELECT * FROM employee;",
        (err, res) => {
            if (err) throw err;
            console.log(res);
            inquirer.prompt([ 
                {
                    type: "rawlist",
                    message: "Please specify the employee's last name:",
                    name: "lastName",
                    choices: () => {
                        var lastName = [];
                        for (var i = 0; i < res.length; i++) {
                            lastName.push(res[i].last_name);
                        }
                        return lastName;
                    }
                },
                {
                    type: "rawlist",
                    message: "Please specify the employee's new role:",
                    name: "role",
                    choices: selectRole()
                }
            ]).then((value) => {
                var roleId = selectRole().indexOf(value.role) + 1;
                connection.query(`UPDATE employee SET role_id = ${roleId} WHERE last_name = ?`,
                    [value.lastName],
                    (err, res) => {
                        if (err) throw err;
                        console.log("Your employee's role has been updated!");
                        console.table(res);
                        mainPrompt();
                    }
                )
            })
        })
};
//Add Employee Role 
function addRole() {
  connection.query("SELECT * FROM department", function(err, res) {
  if (err) throw err;
  inquirer
  .prompt([
      {
          name: "new_role",
          type: "input",
          message: "What is the Title of the new role?"
      },
      {
          name: "salary",
          type: "input",
          message: "What is the salary of this position? (Enter a number?)"
      },
      {
          name: "deptChoice",
          type: "rawlist",
          choices: function() {
              var deptArry = [];
              for (let i = 0; i < res.length; i++) {
              deptArry.push(res[i].name);
              }
              return deptArry;
          },
      }
  ]).then(function (answer) {
      let deptID;
      for (let j = 0; j < res.length; j++) {
          if (res[j].name == answer.deptChoice) {
              deptID = res[j].id;
          }
      }
      connection.query(
          "INSERT INTO role SET ?",
          {
              title: answer.new_role,
              salary: answer.salary,
              department_id: deptID
          },
          function (err, res) {
              if(err)throw err;
              console.log("Your new role has been added!");
              mainPrompt();
          }
      )
  })
  })
};

//Add Department
function addDept() { 

    inquirer.prompt([
        {
          name: "name",
          type: "input",
          message: "What Department would you like to add?"
        }
    ]).then(function(res) {
        var query = connection.query(
            "INSERT INTO department SET ? ",
            {
              name: res.name
            
            },
            function(err) {
                if (err) throw err
                console.table(res);
                mainPrompt();
            }
        )
    })
  }


const exitApp = () => {
  console.log("Thank you for trying out the app")
  connection.end();
  process.exit;
}