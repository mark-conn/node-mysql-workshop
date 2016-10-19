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
 SELECT Account.id, Account.email, GROUP_CONCAT(AddressBook.name) AS n
  FROM Account
  INNER JOIN AddressBook
  ON Account.id = AddressBook.accountId
  GROUP BY Account.id;
`

connection.query(theQuery, function(err, rows, fields) {
    if (err) console.log(err.stack);
    else {
        rows.forEach(function(row) {
            var splitNames = row.n.split(',');
            console.log('#' + row.id + ': ' + row.email);  
            
            for(var i = 0; i < splitNames.length; i++) {
                console.log(splitNames[i]);
            }
            console.log('');
        });
    }
    connection.end();
});