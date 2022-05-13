const express = require('express');
const router = express.Router();

const { get_positions, post_position, put_position_by_ID, put_positionID_by_ID, delete_position_by_ID } = require('../Position/Position');
const { get_test_descriptors, get_test_descriptor_by_ID, post_test_descriptor, put_test_descriptor_by_ID, delete_test_descriptor_by_ID } = require('../Test_descriptor/Test_Descriptor');

const { new_user, get_user, get_suppliers, get_users, manager_sessions, customer_sessions,
        supplier_sessions, clerk_sessions, qualityEmployee_sessions, deliveryEmployee_sessions,
        modify_user_type, delete_user } = require('../User/UserAPIreceiver');
const { get_internal_orders, get_issued_orders, get_accepted_orders, get_internal_order_by_id } = require('../Internal_order/InternalOrderAPIreceiver')

const { getSKUs, getSKUbyID, modifySKU, modifySKUPosition, deleteSKUbyId } = require('../SKU/SKU')

const { getSKUItems, getSKUItemsBySKUID, getSKUItemsByRfid, newSKUItem, modifySKUItem, deleteSKUItembyRfid} = require('../SKU_Item/SKU_Item')


// POSITION routes
router.get('/positions', get_positions);
router.post('/position', post_position);
router.put('/position/:positionID', put_position_by_ID);
router.put('/position/:positionID/changeID', put_positionID_by_ID);
router.delete('/position/:positionID', delete_position_by_ID);

// TEST DESCRIPTOR routes
router.get('/testDescriptors', get_test_descriptors);
router.get('/testDescriptors/:id', get_test_descriptor_by_ID)
router.post('/testDescriptor', post_test_descriptor);
router.put('/testDescriptor/:id', put_test_descriptor_by_ID)
router.delete('/testDescriptor/:id', delete_test_descriptor_by_ID)


/**
 * TODO : Test Reult
**/


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

// INTERNAL ORDER routes
router.get('/internalOrders', get_internal_orders); //GET /api/internalOrders
router.get('/internalOrdersIssued', get_issued_orders); //GET /api/internalOrdersIssued
router.get('/internalOrdersAccepted', get_accepted_orders); //GET /api/internalOrdersAccepted
router.get('/internalOrders/:id', get_internal_order_by_id); //GET /api/internalOrders/:id


/**
 * TODO : Test Descriptor, Test Reult
*/

/***********************************************************************/

//  SKU routes

router.get('/api/skus', getSKUs); //GET /api/skus
router.get('/api/skus/:id', getSKUbyID); //GET /api/skus/:id
router.post('/api/sku', newSKU);  //POST /api/sku
router.put('/api/sku/:id', modifySKU);  //PUT /api/sku/:id
router.put('/api/sku/:id/position', modifySKUPosition);  //PUT /api/sku/:id/position
router.delete('/api/skus/:id', deleteSKUbyId);  //DELETE /api/skus/:id

// SKU Item routes

router.get('/api/skuitems', getSKUItems); // GET /api/skuItems
router.get('/api/skuitems/sku/:id', getSKUItemsBySKUID); // GET /api/skuitems/sku/:id
router.get('/api/skuitems/:rfid', getSKUItemsByRfid); //GET /api/skuitems/:rfid
router.post('/api/skuitem', newSKUItem); // POST /api/skuitem
router.put('/api/skuitems/:rfid', modifySKUItem); // PUT /api/skuitems/:rfid
router.delete('/api/skuitems/:rfid', deleteSKUItembyRfid); // DELETE /api/skuitems/:rfid

module.exports = router;