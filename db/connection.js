const mysql = require('mysql');


const connection = mysql.createConnection({
    host: 'localhost',
  
    
    port: 3306,
  
    
    user: 'root',
  
    
    password: 'Blue3000!',
    database: 'employee_db',
  });
  
  connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
    // connection.end();
  });

  module.exports = connection;