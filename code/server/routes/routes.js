const express = require('express');
const router = express.Router();

const PositionDAO = require('../Position/Position_DAO');
const PositionService = require('../Position/Position');
const positionDAO = new PositionDAO();
const positionService = new PositionService(positionDAO);



const { get_test_descriptors, get_test_descriptor_by_ID, post_test_descriptor, put_test_descriptor_by_ID, delete_test_descriptor_by_ID } = require('../Test_descriptor/Test_Descriptor');
const { get_test_results, get_test_result_with_id_from_rfid, post_test_result, put_test_result_with_id_from_rfid, delete_test_result_with_id_from_rfid } = require('../Test_result/Test_result');

// USER receives
const { clear_user_table, new_user, get_user, get_suppliers, get_users, manager_sessions, customer_sessions,
        supplier_sessions, clerk_sessions, qualityEmployee_sessions, deliveryEmployee_sessions, user_logout,
        modify_user_type, delete_user } = require('../User/UserAPIreceiver');

// RESTOCK ORDER receivers
const { get_restock_order, get_restock_order_issued, get_restock_order_by_id, get_item_list,
        store_restock_order, update_restock_order_state, add_skuitems_to_restock_order,
        add_tnote_to_restock_order, delete_restock_order, clear_restock_order_table } = require('../Restock_order/Restock_order');

// RETURN ORDER receivers
const { clear_return_order_table, get_return_orders, get_return_order_by_id, store_return_order, delete_return_order } = require('../Return_order/Return_order');

// INTERNAL ORDER receivers
const { get_internal_orders, get_issued_orders, get_accepted_orders, get_internal_order_by_id,
        create_internal_order, modify_internal_order_state, delete_internal_order } = require('../Internal_order/InternalOrderAPIreceiver')

// ITEM receivers
const { get_items, get_item_by_id, store_item, update_item, delete_item , clear_item_table} = require('../Item/Item')

const { getSKUs, getSKUbyID, newSKU, modifySKU, modifySKUPosition, deleteSKUbyID } = require('../SKU/SKU')

const { getSKUItems, getSKUItemBySKUID, getSKUItemsByRfid, newSKUItem, modifySKUItem, deleteSKUItembyRfid} = require('../SKU_Item/SKU_Item');





// POSITION routes
router.get('/positions', positionService.get_positions);
router.post('/position', positionService.post_position);
router.put('/position/:positionID', positionService.put_position_by_ID);
router.put('/position/:positionID/changeID', positionService.put_positionID_by_ID);
router.delete('/position/:positionID', positionService.delete_position_by_ID);

// TEST DESCRIPTOR routes
router.get('/testDescriptors', get_test_descriptors);
router.get('/testDescriptors/:id', get_test_descriptor_by_ID)
router.post('/testDescriptor', post_test_descriptor);
router.put('/testDescriptor/:id', put_test_descriptor_by_ID)
router.delete('/testDescriptor/:id', delete_test_descriptor_by_ID)

// TEST RESULT routes
router.get('/skuitems/:rfid/testResults', get_test_results)
router.get('/skuitems/:rfid/testResults/:id', get_test_result_with_id_from_rfid)
router.post('/skuitems/testResult', post_test_result)
router.put('/skuitems/:rfid/testResult/:id', put_test_result_with_id_from_rfid)
router.delete('/skuitems/:rfid/testResult/:id', delete_test_result_with_id_from_rfid)

// USER routes
router.delete('/clearusertable', clear_user_table);  //DELETE /api/clearusertable (custom api)
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
router.post('/logout', user_logout);
router.put('/users/:username', modify_user_type);  //PUT /api/users/:username
router.delete('/users/:username/:type', delete_user);  //DELETE /api/users/:username/:type

//RESTOCK ORDER routes
router.get('/restockOrders', get_restock_order);    //GET /api/restockOrders
router.get('/restockOrdersIssued', get_restock_order_issued);   //GET /api/restockOrdersIssued
router.get('/restockOrders/:id', get_restock_order_by_id);  // GET /api/restockOrders/:id
router.get('/restockOrders/:id/returnItems', get_item_list);    // GET /api/restockOrders/:id/returnItems
router.post('/restockOrder', store_restock_order);  // POST /api/restockOrder
router.put('/restockOrder/:id', update_restock_order_state);    // PUT /api/restockOrder/:id
router.put('/restockOrder/:id/skuItems', add_skuitems_to_restock_order);    // PUT /api/restockOrder/:id/skuItems
router.put('/restockOrder/:id/transportNote', add_tnote_to_restock_order);  // PUT /api/restockOrder/:id/transportNote
router.delete('/restockOrder/:id', delete_restock_order);   // DELETE /api/restockOrder/:id
router.delete('/clearRestockOrdertable',clear_restock_order_table); // DELETE /api/clearRestockOrdertable

// RETURN ORDER routes
router.get('/returnOrders', get_return_orders); //GET /api/returnOrders
router.get('/returnOrders/:id', get_return_order_by_id); // GET /api/returnOrders/:id
router.post('/returnOrder', store_return_order);    // POST /api/returnOrder
router.delete('/returnOrder/:id', delete_return_order); // DELETE /api/returnOrder/:id
router.delete('/clearReturnOrdertable', clear_return_order_table); //DELETE /api/clearReturnOrdertable

// INTERNAL ORDER routes
router.get('/internalOrders', get_internal_orders); //GET /api/internalOrders
router.get('/internalOrdersIssued', get_issued_orders); //GET /api/internalOrdersIssued
router.get('/internalOrdersAccepted', get_accepted_orders); //GET /api/internalOrdersAccepted
router.get('/internalOrders/:id', get_internal_order_by_id); //GET /api/internalOrders/:id
router.post('/internalOrders', create_internal_order); //POST /api/internalOrders
router.put('/internalOrders/:id', modify_internal_order_state); //PUT '/api/internalOrders'
router.delete('/internalOrders/:id', delete_internal_order); //DELETE /api/internalOrders/:id

// ITEM routes
router.get('/items', get_items);    //GET /api/items
router.get('/items/:id', get_item_by_id);    //GET /api/items/:id
router.post('/item', store_item);    //POST /api/item
router.put('/item/:id', update_item);   //PUT /api/item/:id
router.delete('/items/:id', delete_item);    // DELETE /api/items/:id
router.delete('/clearitemtable',clear_item_table);

/***********************************************************************/

//  SKU routes

router.get('/skus', getSKUs); //GET /api/skus
router.get('/skus/:id', getSKUbyID); //GET /api/skus/:id
router.post('/sku', newSKU);  //POST /api/sku
router.put('/sku/:id', modifySKU);  //PUT /api/sku/:id
router.put('/sku/:id/position', modifySKUPosition);  //PUT /api/sku/:id/position
router.delete('/skus/:id', deleteSKUbyID);  //DELETE /api/skus/:id

// SKU Item routes

router.get('/skuitems', getSKUItems); // GET /api/skuItems
router.get('/skuitems/sku/:id', getSKUItemBySKUID); // GET /api/skuitems/sku/:id
router.get('/skuitems/:rfid', getSKUItemsByRfid); //GET /api/skuitems/:rfid
router.post('/skuitem', newSKUItem); // POST /api/skuitem
router.put('/skuitems/:rfid', modifySKUItem); // PUT /api/skuitems/:rfid
router.delete('/skuitems/:rfid', deleteSKUItembyRfid); // DELETE /api/skuitems/:rfid

module.exports = router;