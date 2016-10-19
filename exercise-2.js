// Write a program that fetches the first 5 accounts in the addressbook database
// For each account, console.log a line with the account’s ID and email, like this: #1:email@domain.com
// Use the colors NPM module with the .bold option to achieve this effect
var colors = require('colors');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : process.env.IP,
  user     : process.env.C9_USER,
  password : '',
  database : 'addressbook'
});

connection.query("SELECT id, email FROM Account LIMIT 5", function(err, rows, fields) {
  // In this callback, rows will be all the rows of the query, in a regular array of regular objects
  // fields is not used very often, but it will contain a listing of the columns with some metadata
  if (err) console.log(err.stack);
  else {
  rows.forEach(function(row) {
    var res = row.email.toString().bold;
    console.log('#' + row.id + ': ' + res);
  });
  // This code will output lines like:
  // #1: john@smith.com
  // #2: abc@def.com
  // #5: xx@yy.com
  }
  connection.end();
  // Note that IDs do not have to be contiguous. If we DELETE rows, there will be holes in the ID list. This is normal.
});