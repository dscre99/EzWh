const conn = require('../../EZWH_db/RunDB');
const db = conn.DBinstance;
const ReturnOrderDAO = require ('../../Return_order/Return_orderDAO');
const ReturnOrderDAOInstance = new ReturnOrderDAO(db);

function testGetReturnOrders(resExpected){
    test('testGetReturnOrders',async ()=>{
        try{
            let res = await ReturnOrderDAOInstance.getReturnOrders();
            expect(res).toEqual(resExpected);
        }catch(err){
            expect(err).toStrictEqual(resExpected);
        }
        
    });
}

function testGetRestockOrderbyID(id,resExpected){
    test('testGetRestockOrderbyID',async ()=>{
        try{
            let res = await ReturnOrderDAOInstance.getRestockOrderbyID({restockOrderId:id});
            expect(res).toEqual(resExpected);
        }catch(err){
            expect(err).toStrictEqual(resExpected);
        }
        
    });
}

function testGetReturnOrderById(id,resExpected){
    test('testGetReturnOrderById',async ()=>{
        try{
            let res = await ReturnOrderDAOInstance.getReturnOrderbyId({id:id});
            expect(res).toEqual(resExpected);
        }catch(err){
            expect(err).toStrictEqual(resExpected);
        }
        
    });
}

function testStoreReturnOrder(returnDate,restockOrderId,expectedResult){

    test('testStoreReturnOrder', async ()=>{
        let order = {
            returnDate:returnDate,
            restockOrderId:restockOrderId
        }
        try{
            let res= await ReturnOrderDAOInstance.storeReturnOrder(order);
            expect(res).toStrictEqual(expectedResult);
        }catch(err){
            expect(err).toStrictEqual(expectedResult);
        }
    });
}

function testSetReturnItem(rfid,description,price,SKUId,expectedResult){

    test('testSetReturnItem', async ()=>{
        let item = {
            RFID:rfid,
            description:description,
            price:price,
            SKUId:SKUId
        }
        try{
            let res= await ReturnOrderDAOInstance.setReturnItem(item);
            expect(res).toStrictEqual(expectedResult);
        }catch(err){
            expect(err).toStrictEqual(expectedResult);
        }
    });
}

function testDeleteReturnOrder(id,expectedResult){
    test('testDeleteReturnOrder', async () =>{
        try{
            let res = await ReturnOrderDAOInstance.deleteReturnOrder({id:id});
            let res2 = await ReturnOrderDAOInstance.getReturnOrderbyId({id:id});
            expect(res2).toStrictEqual(expectedResult);
        }catch(err){
            expect(err).toEqual(expectedResult);
        }
    })
}

describe('test Return_orderDAO.js', ()=>{
    beforeAll(async () => {
        let res = await ReturnOrderDAOInstance.dropTableReturnOrder();
        expect(res).toEqual(200);
        let res1 = await ReturnOrderDAOInstance.newTableReturnOrder();
        expect(res1).toEqual(200);
        let res2 = await ReturnOrderDAOInstance.dropTableItemReturn();
        expect(res2).toEqual(200);
        let res3 = await ReturnOrderDAOInstance.newTableItemReturn();
        expect(res3).toEqual(200);
    });

    testGetReturnOrders([]);

    testGetRestockOrderbyID(1,undefined);
    testGetRestockOrderbyID(2,[{id:2}]); // Restock Order with ID=2 exists

    testGetReturnOrderById(1,404);
    testStoreReturnOrder("2021/11/29 09:33",2,201);
    testGetReturnOrderById(1,{id:1, returnDate: "2021/11/29 09:33", products:[],restockOrderId:2});


    testSetReturnItem("12345678901234567890123456789015","New Item",10.99,1,201);
    testSetReturnItem("12325678901534567790123456789015","New Item",10.99,2,201);

    
    testGetReturnOrders([{
        id: 1,
        products:  [
                     {
                    RFID: "12345678901234567890123456789015",
                    SKUId: 1,
                    description: "New Item",
                    price: 10.99
                        },{
                    RFID: "12325678901534567790123456789015",
                    SKUId: 2,
                    description: "New Item",
                    price: 10.99 
                        }],
        restockOrderId: 2,
        returnDate: "2021/11/29 09:33"   
                    }]);

    testGetReturnOrderById(1,{
        id: 1,
        products:  [
                     {
                    RFID: "12345678901234567890123456789015",
                    SKUId: 1,
                    description: "New Item",
                    price: 10.99
                        },{
                    RFID: "12325678901534567790123456789015",
                    SKUId: 2,
                    description: "New Item",
                    price: 10.99 
                        }],
        restockOrderId: 2,
        returnDate: "2021/11/29 09:33"   
});

testStoreReturnOrder("2022/05/22 09:33",2,201);
testGetReturnOrders([{
    id: 1,
    products:  [
                 {
                RFID: "12345678901234567890123456789015",
                SKUId: 1,
                description: "New Item",
                price: 10.99
                    },{
                RFID: "12325678901534567790123456789015",
                SKUId: 2,
                description: "New Item",
                price: 10.99 
                    }],
    restockOrderId: 2,
    returnDate: "2021/11/29 09:33"   
                },{id:2,products:[],restockOrderId:2, returnDate: "2022/05/22 09:33"}]);




testDeleteReturnOrder(1,404);





    

});