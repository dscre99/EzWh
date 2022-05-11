const express = require('express');
const { get_positions, post_position, put_position_by_ID, put_positionID_by_ID, delete_position_by_ID } = require('../Position/Position');
const { new_user, get_user, get_suppliers, get_users, manager_sessions, customer_sessions,
        supplier_sessions, clerk_sessions, qualityEmployee_sessions, deliveryEmployee_sessions,
        modify_user_type, delete_user } = require('../User/UserAPIreceiver');
const router = express.Router();


// POSITION routes
router.get('/positions', get_positions);
router.post('/position', post_position);
router.put('/position/:positionID', put_position_by_ID);
router.put('/position/:positionID/changeID', put_positionID_by_ID)
router.delete('/position/:positionID', delete_position_by_ID)

// USER routes
router.get('/userinfo', get_user);  //GET /api/userinfo
router.get('/suppliers', get_suppliers);  //GET /api/suppliers
router.get('/users', get_users);  //GET /api/users
router.post('/newUser', new_user);  //POST /api/newUser
router.post('/managerSessions', manager_sessions);  //POST /api/managerSessions
router.post('/customerSessions', customer_sessions);  //POST /api/customerSessions
router.post('/supplierSessions', supplier_sessions);  //POST /api/supplierSessions
router.post('/clerkSessions', clerk_sessions);  //POST /api/clerkSessions
router.post('/qualityEmployeeSessions', qualityEmployee_sessions);  //POST /api/qualityEmployeeSessions
router.post('/deliveryEmployeeSessions', deliveryEmployee_sessions);  //POST /api/deliveryEmployeeSessions
router.put('/users/:username', modify_user_type);  //PUT /api/users/:username
router.delete('/users/:username/:type', delete_user);  //DELETE /api/users/:username/:type

/**
 * TODO : Test Descriptor, Test Reult
*/

/***********************************************************************/

module.exports = router;