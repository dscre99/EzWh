const conn = require('../../EZWH_db/RunDB');
const db = conn.DBinstance;
const RestockOrderDAO = require ('../../Restock_order/Restock_orderDAO');
const RestockOrderDAOInstance = new RestockOrderDAO(db);

function testGetRestockOrders(resExpected){
    test('Get restock orders',async ()=>{
        let res = await RestockOrderDAOInstance.getRestockOrders();
        expect(res).toEqual(resExpected);
    });
}

function testGetRestockOrdersIssued(resExpected){
    test('Get restock orders issued',async ()=>{
        let res = await RestockOrderDAOInstance.getRestockOrdersIssued();
        expect(res).toEqual(resExpected);
    });
}

function testGetRestockOrderDeliveredByID(id,resExpected){
    test('Get restock order delivered by ID',async ()=>{
        let res = await RestockOrderDAOInstance.getRestockOrderDeliveredByID({id:id});
        expect(res).toEqual(resExpected);
    });
}

function testGetItemList(id,resExpected){
    test('Get SKUItems in Restock_Order',async ()=>{
        let res = await RestockOrderDAOInstance.getItemList({id:id});
        expect(res).toEqual(resExpected);
    });
}

function testCheckItemList(id,rfid,resExpected){
    test('Check RFID in a given Restock_Order',async ()=>{
        let res = await RestockOrderDAOInstance.checkItemList({id:id},{rfid:rfid});
        expect(res).toEqual(resExpected);
    });
}

function testGetRestockOrderByID(id,resExpected){
    test('Get Restock_Order by ID',async ()=>{
        let res = await RestockOrderDAOInstance.getRestockOrderByID({id:id});
        expect(res).toEqual(resExpected);
    });
}

function testStoreRestockOrder(issueDate,supplierId,expectedResult){

    test('Store restock order', async ()=>{
        let item = {
            issueDate:issueDate,
            supplierId:supplierId
        }
        try{
            let res= await RestockOrderDAOInstance.storeRestockOrder(item);
            expect(res).toStrictEqual(expectedResult);
        }catch(err){
            expect(err).toStrictEqual(expectedResult);
        }
    });
}

function testStoreProducts(SKUId,qty,price,description,expectedResult){

    test('Store product', async ()=>{
        let product = {
            SKUId:SKUId,
            qty:qty,
            price:price,
            description:description
        }
        try{
            let res= await RestockOrderDAOInstance.storeProducts(product);
            expect(res).toStrictEqual(expectedResult);
        }catch(err){
            expect(err).toStrictEqual(expectedResult);
        }
    });
}

function testUpdateState(id,newState,expectedResult){

    test('Update state', async ()=>{
        try{
            let res= await RestockOrderDAOInstance.updateState({newState:newState},{id:id});
            expect(res).toStrictEqual(expectedResult);
        }catch(err){
            expect(err).toStrictEqual(expectedResult);
        }
    });
}

function testNewSKUItemList(id,rfid,expectedResult){

    test('Store SKUItem in Restock_Order', async ()=>{
        try{
            let res= await RestockOrderDAOInstance.newSKUItemList({rfid:rfid},{id:id});
            expect(res).toStrictEqual(expectedResult);
        }catch(err){
            expect(err).toStrictEqual(expectedResult);
        }
    });
}

function testAddTransportNote(id,transportNote,expectedResult){

    test('Add transport note', async ()=>{
        try{
            let res= await RestockOrderDAOInstance.addTransportNote(transportNote,{id:id});
            expect(res).toStrictEqual(expectedResult);
        }catch(err){
            expect(err).toStrictEqual(expectedResult);
        }
    });
}

function testDeleteRestockOrder(id,expectedResult){
    test('Delete Restock_Order by ID', async () =>{
        try{
            let res = await RestockOrderDAOInstance.deleteRestockOrder({id:id});
            expect(res).toEqual(expectedResult);
        }catch(err){
            expect(err).toEqual(expectedResult);
        }
    })
}


describe('test Restock_orderDAO.js', ()=>{
    beforeAll(async () => {
        let res = await RestockOrderDAOInstance.dropTableRestockOrder();
        expect(res).toEqual(200);
        let res1 = await RestockOrderDAOInstance.newTableRestockOrder();
        expect(res1).toEqual(200);

        let res2 = await RestockOrderDAOInstance.dropTableProducts();
        expect(res2).toEqual(200);
        let res3 = await RestockOrderDAOInstance.newTableProducts();
        expect(res3).toEqual(200);
        
        let res4 = await RestockOrderDAOInstance.dropTableItemlist();
        expect(res4).toEqual(200);
        let res5 = await RestockOrderDAOInstance.newTableItemlist();
        expect(res5).toEqual(200);
        
        
    });

    testGetRestockOrders([]);
    testGetRestockOrdersIssued([]);
    testGetRestockOrderDeliveredByID(1,undefined);
    testGetItemList(1,[]);
    testCheckItemList(1,1,undefined);
    testGetRestockOrderByID(1,undefined);

    testStoreRestockOrder("2021/11/29 09:33",1,201);
    testStoreProducts(1,30,1.99,'New PC',201);
    testStoreProducts(2,15,10.99,'New Pen',201);

    testGetRestockOrders([{
        id:1,
        issueDate: "2021/11/29 09:33",
        state: "ISSUED",
        products: [{
            SKUId:1,
            description: "New PC",
            price: 1.99,
            qty: 30
        },{
            SKUId:2,
            description: "New Pen",
            price: 10.99,
            qty: 15 
        }],
        supplierId: 1,
        transportNote: {},
        skuItems:[]
    }]);

    testGetRestockOrdersIssued([{
        id:1,
        issueDate: "2021/11/29 09:33",
        state: "ISSUED",
        products: [{
            SKUId:1,
            description: "New PC",
            price: 1.99,
            qty: 30
        },{
            SKUId:2,
            description: "New Pen",
            price: 10.99,
            qty: 15 
        }],
        supplierId: 1, 
        skuItems:[]
    }]);

    testGetRestockOrderByID(1,[{
        id:1,
        issueDate: "2021/11/29 09:33",
        state: "ISSUED",
        products: [{
            SKUId:1,
            description: "New PC",
            price: 1.99,
            qty: 30
        },{
            SKUId:2,
            description: "New Pen",
            price: 10.99,
            qty: 15 
        }],
        supplierId: 1,
        transportNote: {},
        skuItems:[]
    }]);


    testStoreRestockOrder("2022/05/21 09:33",1,201);
    testStoreProducts(1,30,1.99,'New PC',201);
    testStoreProducts(2,15,10.99,'New Pen',201);

    testGetRestockOrders([{
        id:1,
        issueDate: "2021/11/29 09:33",
        state: "ISSUED",
        products: [{
            SKUId:1,
            description: "New PC",
            price: 1.99,
            qty: 30
        },{
            SKUId:2,
            description: "New Pen",
            price: 10.99,
            qty: 15 
        }],
        supplierId: 1,
        transportNote: {},
        skuItems:[]
    },{
        id:2,
        issueDate: "2022/05/21 09:33",
        state: "ISSUED",
        products: [{
            SKUId:1,
            description: "New PC",
            price: 1.99,
            qty: 30
        },{
            SKUId:2,
            description: "New Pen",
            price: 10.99,
            qty: 15 
        }],
        supplierId: 1,
        transportNote: {},
        skuItems:[]
    }]);

    testGetRestockOrdersIssued([{
        id:1,
        issueDate: "2021/11/29 09:33",
        state: "ISSUED",
        products: [{
            SKUId:1,
            description: "New PC",
            price: 1.99,
            qty: 30
        },{
            SKUId:2,
            description: "New Pen",
            price: 10.99,
            qty: 15 
        }],
        supplierId: 1,
        skuItems:[]
    },{
        id:2,
        issueDate: "2022/05/21 09:33",
        state: "ISSUED",
        products: [{
            SKUId:1,
            description: "New PC",
            price: 1.99,
            qty: 30
        },{
            SKUId:2,
            description: "New Pen",
            price: 10.99,
            qty: 15 
        }],
        supplierId: 1,
        skuItems:[]
    }]);

    testUpdateState(2,"DELIVERED",200);

    testGetRestockOrderDeliveredByID(2,[{
        id:2,
        issueDate: "2022/05/21 09:33",
        state: "DELIVERED",
        products: [{
            SKUId:1,
            description: "New PC",
            price: 1.99,
            qty: 30
        },{
            SKUId:2,
            description: "New Pen",
            price: 10.99,
            qty: 15 
        }],
        supplierId: 1,
        transportNote: null,
        skuItems:[]
    }]);

    testNewSKUItemList(2,"12345678901234567890123456789015",200);

    testGetItemList(2,[{
        SKUId: 1,
        rfid: "12345678901234567890123456789015"
    }]);

    testNewSKUItemList(2,"12325678901534567790123456789015",200);

    testGetItemList(2,[{
        SKUId: 2,
        rfid: "12325678901534567790123456789015"
    },{
        SKUId: 1,
        rfid: "12345678901234567890123456789015"
    }]);

    testAddTransportNote(2,{deliveryDate:"2022/05/20 09:33"},422); // Delivery date is before issueDate
    testAddTransportNote(2,{deliveryDate:"2022/05/22 09:33"},200);


    testDeleteRestockOrder(1,204);
    testGetRestockOrderByID(1,undefined);
    
    testCheckItemList(2,"12345678901234567890123456789015",[{id:2}]);



});