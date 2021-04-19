const inquirer = require('inquirer');
require('console.table');
const connection = require('./db/connection');


// Prompt user with questions re: intital options
function promptQuestions() {

    inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: "What would you like to do?",
            choices: [
                'View All Employees',
                'View All Departments',
                'View All Roles',
                "Add a Department",
                'Add an Employee Role',
                'Add an Employee',
                "Update an Employee Role",
                'EXIT'],

        }
    ])
        .then(answers => {
            switch (answers.choice) {
                case 'View All Employees':
                    viewAllEmployees();
                    break;

                case 'View All Departments':
                    viewAllDepartments();
                    break;

                case 'View All Roles':
                    viewAllRoles();
                    break;

                case 'Add a Department':
                    addDepartment();
                    break;

                case 'Add an Employee Role':
                    addEmployeeRole();
                    break;

                case 'Add an Employee':
                    addEmployee();
                    break;

                case 'Update an Employee Role':
                    employeeUpdate();
                    break;

                case 'EXIT':
                    exitApp();
                    break;

                default:
                    break;
            }
        })
}

// View all the employees in the database
function viewAllEmployees() {
    connection.query(
        'SELECT * FROM employees', (err, results) => {
            if (err) throw err;
            console.log("hit")
            console.table(results);
            promptQuestions();

        })
}

// View all the departments in the database
function viewAllDepartments() {
    connection.query(
        'SELECT * FROM departments', (err, results) => {
            if (err) throw err;
            console.table(results);
            promptQuestions();

        })
}

// View all the roles in the database
function viewAllRoles() {
    connection.query(
        'SELECT * FROM roles', (err, results) => {
            if (err) throw err;
            console.table(results);
            promptQuestions();

        })
}

// Add a new department to the database
function addDepartment() {
    inquirer
        .prompt([
            {
                name: 'newDepartment',
                type: 'input',
                message: 'Which department would you like to add?'
            }
        ]).then(function (answer) {
            connection.query(
                'INSERT INTO departments SET ?',
                {
                    name: answer.newDepartment
                });
            var query = 'SELECT * FROM departments';
            connection.query(query, function (err, res) {
                if (err) throw err;
                console.log('Your department has been added!');
                console.table('All Departments:', res);
                promptQuestions();
            })
        })
};

// Add a new roles to the database
function addEmployeeRole() {
    connection.query('SELECT * FROM departments', function (err, res) {
        if (err) throw err;

        inquirer
            .prompt([
                {
                    name: 'new_role',
                    type: 'input',
                    message: "What new role would you like to add?"
                },
                {
                    name: 'salary',
                    type: 'input',
                    message: 'What is the salary of this role? (Enter a number)'
                },
                {
                    name: 'Department',
                    type: 'list',
                    choices: function () {
                        var deptArry = [];
                        for (let i = 0; i < res.length; i++) {
                            deptArry.push(res[i].name);
                        }
                        return deptArry;
                    },
                }
            ]).then(function (answer) {
                let department_id;
                for (let a = 0; a < res.length; a++) {
                    if (res[a].name == answer.Department) {
                        department_id = res[a].id;
                    }
                }

                connection.query(
                    'INSERT INTO roles SET ?',
                    {
                        title: answer.new_role,
                        salary: answer.salary,
                        department_id: department_id
                    },
                    function (err, res) {
                        if (err) throw err;
                        console.log('Your new role has been added!');
                        console.table('All Roles:', res);
                        promptQuestions();
                    })
            })
    })
};

// Add a new employee to the database
function addEmployee() {
    connection.query('SELECT * FROM roles', function (err, res) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: 'first_name',
                    type: 'input',
                    message: "What is the employee's fist name? ",
                },
                {
                    name: 'last_name',
                    type: 'input',
                    message: "What is the employee's last name? "
                },
                {
                    name: 'manager_id',
                    type: 'input',
                    message: "What is the employee's manager's ID? "
                },
                {
                    name: 'role',
                    type: 'list',
                    choices: function () {
                        var roleArray = [];
                        for (let i = 0; i < res.length; i++) {
                            roleArray.push(res[i].title);
                        }
                        return roleArray;
                    },
                    message: "What is this employee's role? "
                }
            ]).then(function (answer) {
                let role_id;
                for (let a = 0; a < res.length; a++) {
                    if (res[a].title == answer.role) {
                        role_id = res[a].id;
                        console.log(role_id)
                    }
                }
                connection.query(
                    'INSERT INTO employees SET ?',
                    {
                        first_name: answer.first_name,
                        last_name: answer.last_name,
                        manager_id: answer.manager_id,
                        role_id: role_id,
                    },
                    function (err) {
                        if (err) throw err;
                        console.log('Your employee has been added!');
                        promptQuestions();
                    })
            })
    })
};

function employeeUpdate() {
    inquirer
        .prompt({
            name: "id",
            type: "input",
            message: "Enter employee id",
        })
        .then(function (answer) {
            var id = answer.id;

            inquirer
                .prompt({
                    name: "roleId",
                    type: "input",
                    message: "Enter role id",
                })
                .then(function (answer) {
                    var roleId = answer.roleId;

                    var query = "UPDATE employees SET role_id=? WHERE id=?";
                    connection.query(query, [roleId, id], function (err, res) {
                        if (err) {
                            console.log(err);
                        }
                        promptQuestions();
                    });
                });
        });
}

// exit the app
function exitApp() {
    connection.end();
};

promptQuestions();
