// Notice that for the previous exercise, Account #5 did not appear in the listing. 
// Don’t come back here until you have re-checked the previous exercise and noticed for yourself that Account #5 is missing.
// The reason for this is because Account #5 does not have any AddressBook, so doing the JOIN left it out.
// Read and understand this article on SQL JOINs, more specifically about the LEFT JOIN.
// Based on your new understanding, create a similar program to Exercise #4.
// The only difference, if an account does not have any address book, print it like this:

// #3: x@yyy.com
//   --no address books--

var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : process.env.IP,
  user     : process.env.C9_USER,
  password : '',
  database : 'addressbook'
});

var theQuery = 
`
SELECT Account.id, Account.email, AddressBook.name
FROM Account
LEFT JOIN AddressBook
ON Account.id = AddressBook.accountId;
`

connection.query(theQuery, function(err, rows, fields) {
    if (err) console.log(err.stack);
    else {
        rows.forEach(function(row) {
            if(row.name === null) row.name = '-no addressbooks-';
            console.log('#' + row.id + ': ' + row.email);
            console.log('    ' + row.name);
            console.log('');
        });
    }
    connection.end();
});