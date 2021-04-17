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
                'View Departments',
                'View Roles',
                "Add Department",
                'Add Employee Role',
                'Add Employee',
                "Update Employee Role"],
        }
    ])
        .then(answers => {
            switch (answers.choice) {
                case 'View All Employees':
                    viewAllEmployees();
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
promptQuestions();