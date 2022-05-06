'use strict';
const express = require('express');
// init express
const app = new express();
const port = 3001;

app.use(express.json());

// *****SERVER APP PROTOTYPE*********
const DB = require('./EZWH_db.js');
let firstDBtest = new DB('EZWH_db');
firstDBtest.newUserTable().then(
  function(value) {console.log('user table created', value)},
  function(error) {console.log('user table not created', error)}
);

firstDBtest.newSKUTable().then(
    function (value) { console.log('sku table created', value) },
    function (error) { console.log('sku table not created', error) }
)
// ***********************************

//GET /api/test
app.get('/api/test', (req,res)=>{
  /*let message = {
    message: 'Hello World!'
  }
  return res.status(200).json(message);*/

  // tests getUser function, json body sample is {"username":"user@mail.it"}
  firstDBtest.getUser(req.body).then(
    function(user) {return res.status(200).json(user);},
    function(error) {console.log(error);}
  );
});

//POST /api/newUser
app.post('/api/newUser', (req, res) => {
  // check input
  if (Object.keys(req.body).length === 0) {
    return res.status(422).json({
      error: 'Empty body request'
    });
  }

  // add user to DB
  firstDBtest.newUser(req.body).then(
    function(value) {console.log('user created', value)},
    function(error) {console.log('user not created', error)}
  );
  

  let message = {
    message: 'Received new User request',
    received: req.body
  }
  return res.status(201).json(message);
});

//POST /api/customerSessions
app.post('/api/customerSessions', (req, res) => {
  // check input
  if (Object.keys(req.body).length === 0) {
    return res.status(422).json({
      error: 'Empty body request'
    });
  }

  let customerInfo = {
    id:1,
    username:'test@ezwh.com',
    name:'John',
    surname:'Smith'
  }

  console.log('login received');
  return res.status(200).json(customerInfo);
});



// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
 
module.exports = app;