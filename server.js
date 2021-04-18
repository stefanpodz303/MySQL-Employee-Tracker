const inquirer = require('inquirer');
require('console.table');
const connection = require('./db/connection');



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
                "Update an Employee Role"],
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




            }
        })
}



function viewAllEmployees() {
    connection.query(
        'SELECT * FROM employees', (err, results) => {
            if (err) throw err;
            console.table(results);
            promptQuestions();

        })
}

function viewAllDepartments() {
    connection.query(
        'SELECT * FROM departments', (err, results) => {
            if (err) throw err;
            console.table(results);
            promptQuestions();

        })
}

function viewAllRoles() {
    connection.query(
        'SELECT * FROM roles', (err, results) => {
            if (err) throw err;
            console.table(results);
            promptQuestions();

        })
}

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
                connection.query(query, function(err, res) {
                if(err)throw err;
                console.log('Your department has been added!');
                console.table('All Departments:', res);
                promptQuestions();
                })
            })
};

function addEmployeeRole() {
    connection.query('SELECT * FROM departments', function(err, res) {
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
                choices: function() {
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
                    if(err)throw err;
                    console.log('Your new role has been added!');
                    console.table('All Roles:', res);
                    promptQuestions();
                })
        })
    })
};

promptQuestions();