'use strict';
const router = require('./routes/routes');
const { use } = require('chai');
const express = require('express');
// init express
const app = new express();
const port = 3001;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/api', router);
app.use(express.json());

// *****SERVER APP PROTOTYPE*********

//new UserDAO().newUserTable();

// ***********************************

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
 
module.exports = app;