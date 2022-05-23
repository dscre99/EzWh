const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

const app = require('../server');
let agent = chai.request.agent(app);

function testGETReturnOrders(expectedData, expectedHTTPstatus) {
    it('GET /api/returnOrders', async function() {
        await agent.get('/api/returnOrders')
                    .then(function(res) {
                        res.should.have.status(expectedHTTPstatus);
                        if(expectedData.length != 0){
                            for (let i = 0; i < expectedData.length; i++) {
                                res.body[i].id.should.equal(expectedData[i].id);
                                res.body[i].returnDate.should.equal(expectedData[i].returnDate);
                                for( let j = 0; j< res.body[i].products.length; j++){
                                    res.body[i].products[j].SKUId.should.equal(expectedData[i].products[j].SKUId);
                                    res.body[i].products[j].description.should.equal(expectedData[i].products[j].description);
                                    res.body[i].products[j].price.should.equal(expectedData[i].products[j].price);
                                    res.body[i].products[j].RFID.should.equal(expectedData[i].products[j].RFID);
                                }
                                res.body[i].restockOrderId.should.equal(expectedData[i].restockOrderId);

                            }
                        } else {
                            res.body.length.should.equal(expectedData.length);
                        }
                    });
    });
}

function testGETReturnOrderById(id, returnDate, products, restockOrderId,expectedHTTPstatus) {
    it('GET /api/returnOrders/:id', async function() {
        await agent.get('/api/returnOrders/'+id).then(function(res) {
            res.should.have.status(expectedHTTPstatus);
            if(res.status == 200) {
                res.body.id.should.equal(id);
                res.body.returnDate.should.equal(returnDate);
                for( let j = 0; j< res.body.products.length; j++){
                    res.body.products[j].SKUId.should.equal(products[j].SKUId);
                    res.body.products[j].description.should.equal(products[j].description);
                    res.body.products[j].price.should.equal(products[j].price);
                    res.body.products[j].RFID.should.equal(products[j].RFID);
                }                
                res.body.restockOrderId.should.equal(restockOrderId);
                         
            }
        });
    });
}

function testPOSTReturnOrder(expectedData, expectedHTTPStatus) {
    it('testing POST /api/returnOrder', async function() {
        await agent.post('/api/returnOrder')
            .send(expectedData)
            .then(function(res) {
                res.should.have.status(expectedHTTPStatus);
            });
    });
}

function testDELETEReturnOrder(id,expectedHTTPStatus) {
    it('testing DELETE /api/returnOrder/:id', async function() {
        await agent.delete('/api/returnOrder/'+id)
                    .then(function(res) {
                        res.should.have.status(expectedHTTPStatus);
                    })
    });
}

describe('test Return_order.js', () => {
    before(async () => {
        await agent.delete('/api/clearReturnOrdertable');
    });

    testGETReturnOrders([],200);
    testGETReturnOrderById(1,1,[],1,404);

    testPOSTReturnOrder({}, 422); // Empty body
    testPOSTReturnOrder({
        products: [{
            SKUId:12,description:"a product",price:10.99, RFID:"12345678901234567890123456789016"},{
                SKUId:180,description:"another product",price:11.99,RFID:"12345678901234567890123456789038"}],
        restockOrderId : 2
    }, 422); // MIssing fields 
    
    testPOSTReturnOrder({
    anotherfield:1,
    returnDate:"2021/11/29 09:33",
    products: [{
        SKUId:12,description:"a product",price:10.99, RFID:"12345678901234567890123456789016"},{
            SKUId:180,description:"another product",price:11.99,RFID:"12345678901234567890123456789038"}],
    restockOrderId : 2
}, 422); // Another field 

testPOSTReturnOrder({
    WrongName:"2021/11/29 09:33",
    products: [{
        SKUId:12,description:"a product",price:10.99, RFID:"12345678901234567890123456789016"},{
            SKUId:180,description:"another product",price:11.99,RFID:"12345678901234567890123456789038"}],
    restockOrderId : 2
}, 422); // Wrong field name

testPOSTReturnOrder({
    returnDate:"",
    products: [{
        SKUId:12,description:"a product",price:10.99, RFID:"12345678901234567890123456789016"},{
            SKUId:180,description:"another product",price:11.99,RFID:"12345678901234567890123456789038"}],
    restockOrderId : 2
}, 422); // Empty field

testPOSTReturnOrder({
    returnDate:"2021/11/29 09:33",
    products: [{
        SKUId:12,description:"a product",price:10.99, RFID:"12345678901234567890123456789016"},{
            SKUId:180,description:"another product",price:11.99,RFID:"12345678901234567890123456789038"}],
    restockOrderId : 1
}, 404); // Wrong restock order number

testPOSTReturnOrder({
    returnDate:"2021/11/29 09:33",
    products: [{
        SKUId:1,description:"a product",price:10.99, RFID:"12345678901234567890123456789016"},{
            SKUId:1,description:"another product",price:11.99,RFID:"12345678901234567890123456789038"}],
    restockOrderId : 2
}, 201); // Ok

testGETReturnOrders([{
    id:1,
    returnDate:"2021/11/29 09:33",
    products: [{
        SKUId:1,description:"a product",price:10.99, RFID:"12345678901234567890123456789016"},{
            SKUId:1,description:"another product",price:11.99,RFID:"12345678901234567890123456789038"}],
    restockOrderId : 2
}
],200);

testGETReturnOrderById(1,"2021/11/29 09:33",[{
    SKUId:1,description:"a product",price:10.99, RFID:"12345678901234567890123456789016"},{
        SKUId:1,description:"another product",price:11.99,RFID:"12345678901234567890123456789038"}],2,200);

        testPOSTReturnOrder({
            returnDate:"2022/05/22 09:33",
            products: [{
                    SKUId:1,description:"a product",price:10.99, RFID:"12345678901234567890123456789016"},{
                    SKUId:1,description:"another product",price:11.99,RFID:"12345678901234567890123456789038"}],
            restockOrderId : 2
        }, 201); // Ok

        testGETReturnOrders([{
            id:1,
            returnDate:"2021/11/29 09:33",
            products: [{
                SKUId:1,description:"a product",price:10.99, RFID:"12345678901234567890123456789016"},{
                    SKUId:1,description:"another product",price:11.99,RFID:"12345678901234567890123456789038"}],
            restockOrderId : 2
        },{
            id:2,
            returnDate:"2022/05/22 09:33",
            products: [{
                    SKUId:1,description:"a product",price:10.99, RFID:"12345678901234567890123456789016"},{
                    SKUId:1,description:"another product",price:11.99,RFID:"12345678901234567890123456789038"}],
            restockOrderId : 2  
        }
        ],200);



        testDELETEReturnOrder(5,404);
        testDELETEReturnOrder("hello",422);
        testDELETEReturnOrder(1,204);
        testGETReturnOrderById(1,1,[],1,404);

        testGETReturnOrderById(2,"2022/05/22 09:33",[{
            SKUId:1,description:"a product",price:10.99, RFID:"12345678901234567890123456789016"},{
            SKUId:1,description:"another product",price:11.99,RFID:"12345678901234567890123456789038"}],2,200);

       











    


});
