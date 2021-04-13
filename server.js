const inquirer = require('inquirer');
require('console.table');
const connection = require('./db/connection');

function viewAllEmployees() {
    connection.query(
        'SELECT * FROM employees', (err, results) => {
            if (err) throw err;
            
    )
}

function promptQuestions() {

    inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: "What would you like to do?",
            choices: ['View All Employees', 'View Employees by Department', 'View Employees by Role', "Adde Department", 'Add Employee Role', 'Add Employee', "Update Employee Role"],
        }
    ])
    .then(answers => {
        switch (answers.choice) {
            case 'View All Employees':
                
        }
    })
}

 
