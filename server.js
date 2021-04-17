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

promptQuestions();