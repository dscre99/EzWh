const express = require('express');
const router = express.Router();
const DB = require('../EZWH_db/RunDB')
const DBinstance = DB.DBinstance;
const UserDAO = require('./UserDAO.js')
const UserDAOinstance = new UserDAO(DBinstance);

const userTypes = ['customer', 'qualityEmployee', 'clerk', 'deliveryEmployee', 'supplier'];

//GET /api/userinfo
async function get_user(req, res) {
    console.log('GET /api/userinfo');

    let getUserPromise = UserDAOinstance.getUser();
    await getUserPromise.then(
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
}

//GET /api/suppliers
async function get_suppliers(req, res) {

    console.log('GET /api/suppliers');

    let getSuppliersPromise = UserDAOinstance.getSuppliers();
    await getSuppliersPromise.then(
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
      return res.status(500).end();
    });
}

//GET /api/users
async function get_users(req, res) {

    console.log('GET /api/users');

    let getUsersPromise = UserDAOinstance.getUsers();
    await getUsersPromise.then(
        function(value) {
        console.log('getUsers resolve');
        return res.status(200).json(value).end();
        },
        function(error) {
        console.log('getUsers reject');
        return res.status(error).end();
        }
    ).catch(err => function(err) {
        console.log('getUsers error', err);
        return res.status(500).end();
    });
}

//POST /api/newUser
async function new_user(req, res) {

    console.log('POST /api/newUser');
  
    // check input
    if (Object.keys(req.body).length === 0) {
      return res.status(422).end(); // 422 Unprocessable Entity
    }
  
    let userData = req.body;
    //console.log(tmp_user_data);
  
    // Request Body Validation
    const requiredKeys = ['name', 'surname', 'username', 'password', 'type'];
  
    // checks passed number of fields is the required one
    if (Object.keys(userData).length != requiredKeys.length) {
      return res.status(422).end(); // 422 Unprocessable Entity
    } else {
      requiredKeys.forEach(key => {
        //console.log(key);
        // checks for necessary field presence
        if(!Object.keys(userData).includes(key)){
          return res.status(422).end(); // 422 Unprocessable Entity
        }
        // checks for fields not empty
        if(userData[key] == undefined || userData[key] == ''){
          return res.status(422).end(); // 422 Unprocessable Entity
        }
      });
  
      // checks for minimum password length (8 chars)
      if(userData['password'].length < 8){
        return res.status(422).end(); // 422 Unprocessable Entity
      }
  
      if(!userTypes.includes(userData['type'])){
        return res.status(422).end(); // 422 Unprocessable Entity
      }
    }
    console.log('after');
  
    //let tmp_user = new User(tmp_user_data['name'], tmp_user_data['surname'], tmp_user_data['username'], tmp_user_data['password'], tmp_user_data['type']);
  
    const addUserPromise = UserDAOinstance.newUser(userData);
    await addUserPromise.then(
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
}

//POST /api/managerSessions
async function manager_sessions(req, res) {
    // check input
    if (Object.keys(req.body).length === 0) {
    return res.status(422).json({
        error: 'Empty body request'
    });
    }
    let managerData = req.body;

    // Request Body Validation
    const requiredKeys = ['username', 'password'];

    requiredKeys.forEach(key => {
    //console.log(key);
    // checks for necessary field presence
    if(!Object.keys(managerData).includes(key)){
        return res.status(422).end(); // 422 Unprocessable Entity
    }
    // checks for fields not empty
    if(managerData[key] == undefined || managerData[key] == ''){
        return res.status(422).end(); // 422 Unprocessable Entity
    }
    });
    managerData['type'] = 'manager';

    let managerSessionsPromise = UserDAOinstance.userSession(managerData);
    await managerSessionsPromise.then(
    function(value) {
        console.log('managerSession resolve');
        return res.status(200).json(value).end();
    },
    function(error) {
        console.log('managerSession reject');
        return res.status(error).end();
    }
    ).catch(err => function(err){
    console.log('managerSession catch error', err);
    return res.status(500).end();
    });
}

//POST /api/customerSessions
async function customer_sessions(req, res) {
    // check input
    if (Object.keys(req.body).length === 0) {
    return res.status(422).json({
        error: 'Empty body request'
    });
    }
    let customerData = req.body;

    // Request Body Validation
    const requiredKeys = ['username', 'password'];

    requiredKeys.forEach(key => {
    //console.log(key);
    // checks for necessary field presence
    if(!Object.keys(customerData).includes(key)){
        return res.status(422).end(); // 422 Unprocessable Entity
    }
    // checks for fields not empty
    if(customerData[key] == undefined || customerData[key] == ''){
        return res.status(422).end(); // 422 Unprocessable Entity
    }
    });
    customerData['type'] = 'customer';

    let customerSessionsPromise = UserDAOinstance.userSession(customerData);
    await customerSessionsPromise.then(
    function(value) {
        console.log('customerSession resolve');
        return res.status(200).json(value).end();
    },
    function(error) {
        console.log('customerSession reject');
        return res.status(error).end();
    }
    ).catch(err => function(err){
    console.log('customerSession catch error', err);
    return res.status(500).end();
    });
}

//POST /api/supplierSessions
async function supplier_sessions(req, res) {
    // check input
    if (Object.keys(req.body).length === 0) {
    return res.status(422).json({
        error: 'Empty body request'
    });
    }
    let supplierData = req.body;

    // Request Body Validation
    const requiredKeys = ['username', 'password'];

    requiredKeys.forEach(key => {
    //console.log(key);
    // checks for necessary field presence
    if(!Object.keys(supplierData).includes(key)){
        return res.status(422).end(); // 422 Unprocessable Entity
    }
    // checks for fields not empty
    if(supplierData[key] == undefined || supplierData[key] == ''){
        return res.status(422).end(); // 422 Unprocessable Entity
    }
    });
    supplierData['type'] = 'supplier';

    let supplierSessionsPromise = UserDAOinstance.userSession(supplierData);
    await supplierSessionsPromise.then(
    function(value) {
        console.log('supplierSessions resolve');
        return res.status(200).json(value).end();
    },
    function(error) {
        console.log('supplierSessions reject');
        return res.status(error).end();
    }
    ).catch(err => function(err){
    console.log('supplierSessions catch error', err);
    return res.status(500).end();
    });
}

//POST /api/clerkSessions
async function clerk_sessions(req, res) {
    // check input
    if (Object.keys(req.body).length === 0) {
    return res.status(422).json({
        error: 'Empty body request'
    });
    }
    let clerkData = req.body;

    // Request Body Validation
    const requiredKeys = ['username', 'password'];

    requiredKeys.forEach(key => {
    //console.log(key);
    // checks for necessary field presence
    if(!Object.keys(clerkData).includes(key)){
        return res.status(422).end(); // 422 Unprocessable Entity
    }
    // checks for fields not empty
    if(clerkData[key] == undefined || clerkData[key] == ''){
        return res.status(422).end(); // 422 Unprocessable Entity
    }
    });
    clerkData['type'] = 'clerk';

    let clerkSessionsPromise = UserDAOinstance.userSession(clerkData);
    await clerkSessionsPromise.then(
    function(value) {
        console.log('clerkSessions resolve');
        return res.status(200).json(value).end();
    },
    function(error) {
        console.log('clerkSessions reject');
        return res.status(error).end();
    }
    ).catch(err => function(err){
    console.log('clerkSessions catch error', err);
    return res.status(500).end();
    });
}

//POST /api/qualityEmployeeSessions
async function qualityEmployee_sessions(req, res) {
    // check input
    if (Object.keys(req.body).length === 0) {
    return res.status(422).json({
        error: 'Empty body request'
    });
    }
    let qualityEmployeeData = req.body;

    // Request Body Validation
    const requiredKeys = ['username', 'password'];

    requiredKeys.forEach(key => {
    //console.log(key);
    // checks for necessary field presence
    if(!Object.keys(qualityEmployeeData).includes(key)){
        return res.status(422).end(); // 422 Unprocessable Entity
    }
    // checks for fields not empty
    if(qualityEmployeeData[key] == undefined || qualityEmployeeData[key] == ''){
        return res.status(422).end(); // 422 Unprocessable Entity
    }
    });
    qualityEmployeeData['type'] = 'qualityEmployee';

    let qualityEmployeePromise = UserDAOinstance.userSession(qualityEmployeeData);
    await qualityEmployeePromise.then(
    function(value) {
        console.log('qualityEmployeeSessions resolve');
        return res.status(200).json(value).end();
    },
    function(error) {
        console.log('qualityEmployeeSessions reject');
        return res.status(error).end();
    }
    ).catch(err => function(err){
    console.log('qualityEmployeeSessions catch error', err);
    return res.status(500).end();
    });
}

//POST /api/deliveryEmployeeSessions
async function deliveryEmployee_sessions(req, res) {
    // check input
    if (Object.keys(req.body).length === 0) {
        return res.status(422).json({
        error: 'Empty body request'
        });
    }
    let deliveryEmployeeData = req.body;
    
    // Request Body Validation
    const requiredKeys = ['username', 'password'];
    
    requiredKeys.forEach(key => {
        //console.log(key);
        // checks for necessary field presence
        if(!Object.keys(deliveryEmployeeData).includes(key)){
        return res.status(422).end(); // 422 Unprocessable Entity
        }
        // checks for fields not empty
        if(deliveryEmployeeData[key] == undefined || deliveryEmployeeData[key] == ''){
        return res.status(422).end(); // 422 Unprocessable Entity
        }
    });
    deliveryEmployeeData['type'] = 'deliveryEmployee';
    
    let deliveryEmployeePromise = UserDAOinstance.userSession(deliveryEmployeeData);
    await deliveryEmployeePromise.then(
        function(value) {
        console.log('deliveryEmployeeSessions resolve');
        return res.status(200).json(value).end();
        },
        function(error) {
        console.log('deliveryEmployeeSessions reject');
        return res.status(error).end();
        }
    ).catch(err => function(err){
        console.log('deliveryEmployeeSessions catch error', err);
        return res.status(500).end();
    });
}

//PUT /api/users/:username
async function modify_user_type(req, res) {
// check input
    if (Object.keys(req.body).length === 0) {
        return res.status(422).end();
    }

    let userData = req.body;

    // Request Body Validation
    let valid = true;
    const requiredKeys = ['oldType', 'newType'];

    requiredKeys.forEach(key => {
        //console.log(key);

        if(!Object.keys(userData).includes(key)){
            // checks for necessary field presence
            valid = false;
            return res.status(422).end(); // 422 Unprocessable Entity
        } else if(userData[key] == undefined || userData[key] == ''){
            // checks for fields not empty
            valid = false;
            return res.status(422).end(); // 422 Unprocessable Entity
        }    
    });

    if(valid) {
        // checks for correct user types in request body
        Object.values(userData).forEach(uType => {
            if(!userTypes.includes(uType)) {
            valid = false;
            return res.status(422).end(); // 422 Unprocessable Entity
            }
        });
        userData['username'] = req.params.username;

        if(valid && (userData['username'] == undefined || userData['username'] == '' || userData['oldType'] == 'administrator' || userData['oldType'] == 'manager')) {
            valid = false;
            return res.status(422).end(); // 422 Unprocessable Entity
        }

        if(valid) {
            let putUserPromise = UserDAOinstance.modifyUserType(userData);
            await putUserPromise.then(
            function(value) {
                console.log('PUTuser resolve');
                return res.status(value).end();
            },
            function(error) {
                console.log('PUTuser reject');
                return res.status(error).end();
            }
            ).catch(err => function(err){
            console.log('PUTuser error', err);
            return res.status(503).end(); // 503 Service Unavailable (generic error)
            });
        }
    }
}

//DELETE /api/users/:username/:type
async function delete_user(req, res) {
    let valid = true;
    let userData = {
      username:req.params.username,
      type:req.params.type
    };
  
    if(!(typeof userData.username === 'string' && typeof userData.type === 'string') || 
          userData.username == '' || userData.type == '' || userData.type == 'manager' ||
          userData.type == 'administrator') {
            valid = false;
    } else if(!userTypes.includes(userData.type)){
      // checks for correct user types in request body
      valid = false;
    }
  
    if(!valid) {
      return res.status(422).end(); // 422 Unprocessable Entity
    } else {
      let deleteUserPromise = UserDAOinstance.deleteUser(userData);
      await deleteUserPromise.then(
        function(value) {
          console.log('DELETEuser resolve');
          return res.status(value).end();
        },
        function(error) {
          console.log('DELETEuser reject');
          return res.status(error).end();
        }
      ).catch(err => function(err) {
        console.log('DELETEuser error', err);
        return res.status(503).end(); // 503 Service Unavailable
      });
    }
}

module.exports = { new_user, get_user, get_suppliers, get_users, manager_sessions, customer_sessions,
                    supplier_sessions, clerk_sessions, qualityEmployee_sessions, deliveryEmployee_sessions,
                    modify_user_type, delete_user }