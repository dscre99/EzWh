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

app.get('/api/hello', (req, res) => {
  let retBody = {
    message:'Hello world!'
  }
  return res.status(200).json(retBody).end();
});

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

const DB = require('./EZWH_db/RunDB');
const DBinstance = DB.DBinstance;

const InternalOrderDAO = require('./Internal_order/InternalOrderDAO');
const InternalOrderDAOinstance = new InternalOrderDAO(DBinstance);

const ItemDAO = require('./Item/ItemDAO');
const ItemDAOinstance=new ItemDAO(DBinstance);

const PositionDAO = require('./Position/Position_DAO');
const PositionDAOinstance = new PositionDAO(DBinstance);

const Restock_orderDAO = require ('./Restock_order/Restock_orderDAO');
const Restock_orderDAOinstance = new Restock_orderDAO(DBinstance);

const Return_orderDAO = require('./Return_order/Return_orderDAO');
const Return_orderDAOinstance = new Return_orderDAO(DBinstance);

const SKUDao = require('./SKU/SKUdao');
const SKUDaoInstance = new SKUDao(DBinstance);

const skuItemDao = require('./SKU_Item/SKU_Item_dao')
const skuItemDaoInstance = new skuItemDao(DBinstance);

const TestDescriptorDAO = require('./Test_descriptor/Test_Descriptor_DAO');
const TestDescriptorDAOinstance = new TestDescriptorDAO(DBinstance);

const TestResultDAO = require('./Test_result/Test_result_DAO');
const TestResultDAOinstance = new TestResultDAO(DBinstance);

const UserDAO = require('./User/UserDAO');
const UserDAOinstance = new UserDAO(DBinstance);

async function resetDB() {

    await InternalOrderDAOinstance.clearInternalOrdersTable();
    await InternalOrderDAOinstance.clearSKUITEMinInternalOrdersTable();
    await InternalOrderDAOinstance.clearSKUinInternalOrdersTable();

    await ItemDAOinstance.dropTableItem();
    await ItemDAOinstance.newTableItem();

    await PositionDAOinstance.dropPositionTable();
    await PositionDAOinstance.newPositionTable();

    await Restock_orderDAOinstance.dropTableItemlist();
    await Restock_orderDAOinstance.newTableItemlist();
    await Restock_orderDAOinstance.dropTableProducts();
    await Restock_orderDAOinstance.newTableProducts();
    await Restock_orderDAOinstance.dropTableRestockOrder();
    await Restock_orderDAOinstance.newTableRestockOrder();

    await Return_orderDAOinstance.dropTableItemReturn();
    await Return_orderDAOinstance.newTableItemReturn();
    await Return_orderDAOinstance.dropTableReturnOrder();
    await Return_orderDAOinstance.newTableReturnOrder();

    await SKUDaoInstance.dropSKUTable();
    await SKUDaoInstance.newSKUTable();

    await skuItemDaoInstance.dropSKUItemTable();
    await skuItemDaoInstance.newSKUItemTable();

    await TestDescriptorDAOinstance.dropTestDescriptorTable();
    await TestDescriptorDAOinstance.newTestDescriptorTable();

    await TestResultDAOinstance.dropTestResultTable();
    await TestResultDAOinstance.newTestResultTable();

    await UserDAOinstance.clearUserTable();

    let user = { username:'user1@ezwh.com', name: 'Name1', surname:'Surname1', password:'testpassword', type:'customer' }
    await UserDAOinstance.newUser(user);
    user = { username:'qualityEmployee1@ezwh.com', name: 'Qual1', surname:'Emp1', password:'testpassword', type:'qualityEmployee' }
    await UserDAOinstance.newUser(user);
    user = { username:'clerk1@ezwh.com', name: 'Clerk1', surname:'Emp1', password:'testpassword', type:'clerk' }
    await UserDAOinstance.newUser(user);
    user = { username:'deliveryEmployee1@ezwh.com', name: 'Deli1', surname:'Emp1', password:'testpassword', type:'deliveryEmployee' }
    await UserDAOinstance.newUser(user);
    user = { username:'supplier1@ezwh.com', name: 'Hasit1', surname:'All1', password:'testpassword', type:'supplier' }
    await UserDAOinstance.newUser(user);
    user = { username:'manager1@ezwh.com', name: 'Top1', surname:'Gun1', password:'testpassword', type:'manager' }
    await UserDAOinstance.newUser(user);

}

resetDB();
 
module.exports = app;