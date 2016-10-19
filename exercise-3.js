// Write a program that fetches all the accounts and their addressbooks.
// Output one line for each account as in Exercise 4, followed by a listing of 
// all the address book names for that account, one per line
// Make the output look nice in any way you like
// Here is an example:
// #1: john@smith.com
//   business contacts
//   friends
// #2: jane@smith.com
//   ...

var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : process.env.IP,
  user     : process.env.C9_USER,
  password : '',
  database : 'addressbook'
});

var theQuery = `
SELECT Account.id, Account.email, AddressBook.name
FROM Account
JOIN AddressBook
ON Account.id = AddressBook.accountId;
`

connection.query(theQuery, function(err, rows, fields) {
    if (err) console.log(err.stack);
    else {
        rows.forEach(function(row) {
            console.log('#' + row.id + ': ' + row.email);
            console.log('    ' + row.name);
            console.log('');
        });
    }
    connection.end();
});