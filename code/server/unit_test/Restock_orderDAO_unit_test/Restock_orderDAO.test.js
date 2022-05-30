const conn = require('../../EZWH_db/RunDB');
const db = conn.DBinstance;
const RestockOrderDAO = require ('../../Restock_order/Restock_orderDAO');
const RestockOrderDAOInstance = new RestockOrderDAO(db);

function testGetRestockOrders(resExpected){
    test('testGetRestockOrders',async ()=>{
        try{
            let res = await RestockOrderDAOInstance.getRestockOrders();
            expect(res).toEqual(resExpected);
        }catch(err){
            expect(err).toStrictEqual(resExpected);
        }
        
    });
}

function testGetRestockOrdersIssued(resExpected){
    test('testGetRestockOrdersIssued',async ()=>{
        try{
            let res = await RestockOrderDAOInstance.getRestockOrdersIssued();
            expect(res).toEqual(resExpected);
        }catch(err){
            expect(err).toStrictEqual(resExpected);
        }
        
    });
}

function testGetRestockOrderDeliveredByID(id,resExpected){
    test('testGetRestockOrderDeliveredByID',async ()=>{
        try{
            let res = await RestockOrderDAOInstance.getRestockOrderDeliveredByID({id:id});
            expect(res).toEqual(resExpected);
        }catch(err){
            expect(err).toStrictEqual(resExpected);
        }
        
    });
}

function testGetItemList(id,resExpected){
    test('testGetItemList',async ()=>{
        try{
            let res = await RestockOrderDAOInstance.getItemList({id:id});
            expect(res).toEqual(resExpected);
        }catch(err){
            expect(err).toStrictEqual(resExpected);
        }
        
    });
}

function testCheckItemList(id,rfid,resExpected){
    test('testCheckItemList',async ()=>{
        try{
            let res = await RestockOrderDAOInstance.checkItemList({id:id},{rfid:rfid});
            expect(res).toEqual(resExpected);
        }catch(err){
            expect(err).toStrictEqual(resExpected);
        }
        
    });
}

function testGetRestockOrderByID(id,resExpected){
    test('testGetRestockOrderByID',async ()=>{
        try{
            let res = await RestockOrderDAOInstance.getRestockOrderByID({id:id});
            expect(res).toEqual(resExpected);
        }catch(err){
            expect(err).toStrictEqual(expectedResult);
        }
        
    });
}

function testStoreRestockOrder(issueDate,supplierId,expectedResult){

    test('testStoreRestockOrder', async ()=>{
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

    test('testStoreProducts', async ()=>{
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

    test('testUpdateState', async ()=>{
        try{
            let res= await RestockOrderDAOInstance.updateState({newState:newState},{id:id});
            expect(res).toStrictEqual(expectedResult);
        }catch(err){
            expect(err).toStrictEqual(expectedResult);
        }
    });
}

function testNewSKUItemList(id,rfid,expectedResult){

    test('testNewSKUItemList', async ()=>{
        try{
            let res= await RestockOrderDAOInstance.newSKUItemList({rfid:rfid},{id:id});
            expect(res).toStrictEqual(expectedResult);
        }catch(err){
            expect(err).toStrictEqual(expectedResult);
        }
    });
}

function testAddTransportNote(id,transportNote,expectedResult){

    test('testAddTransportNote', async ()=>{
        try{
            let res= await RestockOrderDAOInstance.addTransportNote(transportNote,{id:id});
            expect(res).toStrictEqual(expectedResult);
        }catch(err){
            expect(err).toStrictEqual(expectedResult);
        }
    });
}

function testDeleteRestockOrder(id,expectedResult){
    test('testDeleteRestockOrder', async () =>{
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
    

    testStoreRestockOrder("2021/11/29 09:33",1,201);
    testStoreProducts(1,30,1.99,'New PC',201);
    testStoreProducts(2,15,10.99,'New Pen',201);

    testGetItemList(1,[]);
    testCheckItemList(1,1,undefined);
    testGetRestockOrderByID(3,undefined);
    testGetRestockOrderDeliveredByID(3,undefined);




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

    testGetRestockOrderByID(1,{
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
    });


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

    testGetRestockOrderDeliveredByID(2,{
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
    });

    testNewSKUItemList(2,"12345678901234567890123456789015",200);

    testGetItemList(2,[{
        SKUId: 1,
        rfid: "12345678901234567890123456789015"
    }]);

    testNewSKUItemList(2,"12345678901234567890123456789014",200);

    testGetItemList(2,[{
        SKUId: 1,
        rfid: "12345678901234567890123456789015"
    },{
        SKUId: 1,
        rfid: "12345678901234567890123456789014"
    }]);

    testUpdateState(2,"DELIVERY",200);


    testAddTransportNote(1,{deliveryDate:"2022/05/20 09:33"},422); // Staus != delivery
    testAddTransportNote(2,{deliveryDate:"2022/05/20 09:33"},422); // Delivery date is before issueDate
    testAddTransportNote(2,{deliveryDate:"2022/05/22 09:33"},200);


    testDeleteRestockOrder(1,204);
    testGetRestockOrderByID(1,undefined);
    
    testCheckItemList(2,"12345678901234567890123456789015",[{id:2}]);



});