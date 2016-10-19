// Write a program that fetches all the databases in MySQL and prints them nicely on the screen.
var mysql = require('mysql');
var Table = require('cli-table');
var colors = require('colors');

var connection = mysql.createConnection({
  host     : process.env.IP,
  user     : process.env.C9_USER,
  password : '',
  database : 'addressbook'
});

connection.query("show databases", function(err, result) {
if(err) console.log(err);
else {
 var res = JSON.stringify(result, null, 4)
 console.log(res.rainbow);
} connection.end();
});