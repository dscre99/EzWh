'use strict';
const express = require('express');
// init express
const app = new express();
const port = 3001;

app.use(express.json());

// *****SERVER APP PROTOTYPE*********
const DB = require('./EZWH_db/EZWH_db.js');
const User = require('./User/User.js');
const UserDAO = require('./User/UserDAO.js')
let firstDBtest = new DB('EZWH_db/EZWH_db');

/*firstDBtest.newUserTable().then(
  function(value) {console.log('user table created', value)},
  function(error) {console.log('user table not created', error)}
);*/

let test_user = new User();
test_user.getId();
new UserDAO().newUserTable();

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

//GET /api/userinfo
app.get('/api/userinfo', (req, res) => {
  console.log('GET /api/userinfo');

  let getUserInfoPromise = new UserDAO(firstDBtest).getUser();
  getUserInfoPromise.then(
    function(value) {
      console.log('getUser resolve');
      return res.status(200).json(value).end();
    },
    function(error) {
      console.log('getUser reject: ', error);
      return res.status(error).end();
    }
  ).catch(err => function(err) {
    console.log('getUser error: ', err);
    return res.status(500).end(err);
  });

});

//GET /api/suppliers
app.get('/api/suppliers', (req, res) => {

  console.log('GET /api/suppliers');

  let getSuppliersPromise = new UserDAO(firstDBtest).getSuppliers();
  getSuppliersPromise.then(
    function(value) {
      console.log('getSuppliers resolve');
      return res.status(200).json(value).end();
    },
    function(error) {
      console.log('getSuppliers reject: ', error);
      return res.status(error).end();
    }
  ).catch(err => function(err){
    console.log('getUser error: ', err);
    return res.status(500).end(err);
  });
});

//POST /api/newUser
app.post('/api/newUser', (req, res) => {

  console.log('POST /api/newUser');

  // check input
  if (Object.keys(req.body).length === 0) {
    return res.status(422).end(); // 422 Unprocessable Entity
  }

  let tmp_user_data = req.body;
  //console.log(tmp_user_data);

  // Request Body Validation
  const requiredKeys = ['name', 'surname', 'username', 'password', 'type']
  const customerTypes = ['customer', 'qualityEmployee', 'clerk', 'deliveryEmployee', 'supplier'];

  // checks passed number of fields is the required one
  if (Object.keys(tmp_user_data).length != requiredKeys.length) {
    return res.status(422).end(); // 422 Unprocessable Entity
  } else {
    requiredKeys.forEach(key => {
      //console.log(key);
      // checks for necessary field presence
      if(!Object.keys(tmp_user_data).includes(key)){
        return res.status(422).end(); // 422 Unprocessable Entity
      }
      // checks for fields not empty
      if(tmp_user_data[key] == undefined || tmp_user_data[key] == ''){
        return res.status(422).end(); // 422 Unprocessable Entity
      }
    });

    // checks for minimum password length (8 chars)
    if(tmp_user_data['password'].length < 8){
      return res.status(422).end(); // 422 Unprocessable Entity
    }

    if(!customerTypes.includes(tmp_user_data['type'])){
      return res.status(422).end(); // 422 Unprocessable Entity
    }
  }

  let tmp_user = new User(tmp_user_data['name'], tmp_user_data['surname'], tmp_user_data['username'], tmp_user_data['password'], tmp_user_data['type']);

  const addUserPromise = new UserDAO(firstDBtest).newUser(tmp_user);
  addUserPromise.then(
    function(value) {
      console.log('addUser resolve');
      return res.status(value).end();
    },
    function(error) {
      console.log('addUser reject: ', error);
      return res.status(error).end();
    }
  ).catch( err => function(err) {
    console.log('addUser catch error', err);
    console.log(err);
    return res.status(500).end(err);   // 500 Internal Server Error
  });
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