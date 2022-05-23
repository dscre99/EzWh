const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

const app = require('../server');
let agent = chai.request.agent(app);

function testGETRestockOrders(expectedData, expectedHTTPstatus) {
    it('GET /api/restockOrders', async function() {
        await agent.get('/api/restockOrders')
                    .then(function(res) {
                        res.should.have.status(expectedHTTPstatus);
                        if(expectedData.length != 0){
                            for (let i = 0; i < expectedData.length; i++) {
                                res.body[i].id.should.equal(expectedData[i].id);
                                res.body[i].issueDate.should.equal(expectedData[i].issueDate);
                                res.body[i].state.should.equal(expectedData[i].state);
                                for( let j = 0; j< res.body[i].products.length; j++){
                                    res.body[i].products[j].SKUId.should.equal(expectedData[i].products[j].SKUId);
                                    res.body[i].products[j].description.should.equal(expectedData[i].products[j].description);
                                    res.body[i].products[j].price.should.equal(expectedData[i].products[j].price);
                                    res.body[i].products[j].qty.should.equal(expectedData[i].products[j].qty);
                                }
                                res.body[i].supplierId.should.equal(expectedData[i].supplierId);
                                if(res.body[i].transportNote !==null){
                                    res.body[i].transportNote.should.eql(expectedData[i].transportNote);
                                }
                                for ( let j = 0; j<res.body[i].skuItems.length; j++ ){
                                    res.body[i].skuItems[j].SKUId.should.equal(expectedData[i].skuItems[j].SKUId);
                                    res.body[i].skuItems[j].rfid.should.equal(expectedData[i].skuItems[j].rfid)
                                }

                            }
                        } else {
                            res.body.length.should.equal(expectedData.length);
                        }
                        
                    });
    });
}

function testGETRestockOrdersIssued(expectedData, expectedHTTPstatus) {
    it('GET /api/restockOrdersIssued', async function() {
        await agent.get('/api/restockOrdersIssued')
                    .then(function(res) {
                        res.should.have.status(expectedHTTPstatus);
                        if(expectedData.length != 0){
                            for (let i = 0; i < expectedData.length; i++) {
                                res.body[i].id.should.equal(expectedData[i].id);
                                res.body[i].issueDate.should.equal(expectedData[i].issueDate);
                                res.body[i].state.should.equal(expectedData[i].state);
                                for( let j = 0; j< res.body[i].products.length; j++){
                                    res.body[i].products[j].SKUId.should.equal(expectedData[i].products[j].SKUId);
                                    res.body[i].products[j].description.should.equal(expectedData[i].products[j].description);
                                    res.body[i].products[j].price.should.equal(expectedData[i].products[j].price);
                                    res.body[i].products[j].qty.should.equal(expectedData[i].products[j].qty);
                                }
                                res.body[i].supplierId.should.equal(expectedData[i].supplierId);
                                for ( let j = 0; j<res.body[i].skuItems.length; j++ ){
                                    res.body[i].skuItems[j].SKUId.should.equal(expectedData[i].skuItems[j].SKUId);
                                    res.body[i].skuItems[j].rfid.should.equal(expectedData[i].skuItems[j].rfid)
                                }
                            }
                        } else {
                            res.body.length.should.equal(expectedData.length);
                        }
                        
                    });
    });
}

function testGETRestockOrderById(id, issueDate, state, products, supplierid,transportNote,skuItems, expectedHTTPstatus) {
    it('GET /api/restockOrders/:id', async function() {
        await agent.get('/api/restockOrders/'+id).then(function(res) {
            res.should.have.status(expectedHTTPstatus);
            if(res.status == 200) {
                res.body.id.should.equal(id);
                res.body.issueDate.should.equal(issueDate);
                res.body.state.should.equal(state);
                for( let j = 0; j< res.body.products.length; j++){
                    res.body.products[j].SKUId.should.equal(products[j].SKUId);
                    res.body.products[j].description.should.equal(products[j].description);
                    res.body.products[j].price.should.equal(products[j].price);
                    res.body.products[j].qty.should.equal(products[j].qty);
                }                
                res.body.supplierId.should.equal(supplierid);
                
                res.body.transportNote.should.eql(transportNote);
                                
                for ( let j = 0; j<res.body.skuItems.length; j++ ){
                    res.body.skuItems[j].SKUId.should.equal(skuItems[j].SKUId);
                    res.body.skuItems[j].rfid.should.equal(skuItems[j].rfid)
                }            
            }
        });
    });
}

function testGETItemList(id, SKUId, rfid, expectedHTTPstatus) {
    it('GET /api/restockOrders/:id/returnItems', async function() {
        await agent.get('/api/restockOrders/'+id+'/returnItems').then(function(res) {
            res.should.have.status(expectedHTTPstatus);
            if(res.status == 200) {
                res.body.SKUId.should.equal(SKUId);
                res.body.rfid.should.equal(rfid);
            }
        });
    });
}

function testPOSTRestockOrder(expectedData, expectedHTTPStatus) {
    it('testing POST /api/restockOrder', async function() {
        await agent.post('/api/restockOrder')
            .send(expectedData)
            .then(function(res) {
                res.should.have.status(expectedHTTPStatus);
            });
    });
}

function testPUTRestockOrder(id,expectedData, expectedHTTPStatus) {
    it('testing PUT /api/restockOrder/:id', async function() {
        await agent.put('/api/restockOrder/'+id)
            .send(expectedData)
            .then(function(res) {
                res.should.have.status(expectedHTTPStatus);
            });
    });
}

function testPUTnewSKUItemList(id,expectedData, expectedHTTPStatus) {
    it('testing PUT /api/restockOrder/:id/skuItems', async function() {
        await agent.put('/api/restockOrder/'+id+'/skuItems')
            .send(expectedData)
            .then(function(res) {
                res.should.have.status(expectedHTTPStatus);
            });
    });
}

function testPUTaddTransportNote(id,expectedData, expectedHTTPStatus) {
    it('testing PUT /api/restockOrder/:id/transportNote', async function() {
        await agent.put('/api/restockOrder/'+id+'/transportNote')
            .send(expectedData)
            .then(function(res) {
                res.should.have.status(expectedHTTPStatus);
            });
    });
}

function testDELETERestockOrder(id,expectedHTTPStatus) {
    it('testing DELETE /api/restockOrder/:id', async function() {
        await agent.delete('/api/restockOrder/'+id)
                    .then(function(res) {
                        res.should.have.status(expectedHTTPStatus);
                    })
    });
}

describe('test Restock_order.js.js', () => {

    before(async () => {
        await agent.delete('/api/clearRestockOrdertable');
    });

    testGETRestockOrders([],200);
    testGETRestockOrdersIssued([],200);

    testGETRestockOrderById('A','','','','','','',422);
    testGETRestockOrderById(1,'','','','','','',404);

    testGETItemList(1,1,1,404);
    testGETItemList('A',1,1,422);

    // No fields
    testPOSTRestockOrder({},422);

    //OK
    testPOSTRestockOrder({issueDate:"2021/11/29 09:33",
    products: [{SKUId:1,description:"a new sku",price:10.99,qty:30}],
    supplierId : 1 },201);
    
    testGETRestockOrders([{
        id:1,
        issueDate:"2021/11/29 09:33",
        state:"ISSUED",
        products: [{SKUId:1,description:"a new sku",price:10.99,qty:30}],
        supplierId : 1,
        transportNote: {},
        skuItems:[]}],200);

    testGETRestockOrdersIssued([{
        id:1,
        issueDate:"2021/11/29 09:33",
        state:"ISSUED",
        products: [{SKUId:1,description:"a new sku",price:10.99,qty:30}],
        supplierId : 1,
        transportNote: {},
        skuItems:[]}],200);

    testGETRestockOrderById(1,"2021/11/29 09:33","ISSUED",[{SKUId:1,description:"a new sku",price:10.99,qty:30}],1,{},[],200);
    
    
    // Wrong field name
    testPOSTRestockOrder({wrongname:"2021/11/29 09:33",
    products: [{SKUId:1,description:"a new sku",price:10.99,qty:30}],
    supplierId : 1 },422);

    // Missing field 
    testPOSTRestockOrder({
    products: [{SKUId:1,description:"a new sku",price:10.99,qty:30}],
    supplierId : 1 },422);
    
    // MIssing field value
    testPOSTRestockOrder({issueDate:undefined,
    products: [{SKUId:1,description:"a new sku",price:10.99,qty:30}],
    supplierId : 1 },422);

    // STATE != DELIVERED
    testPUTnewSKUItemList(1,{skuItems:[{"SKUId":1,"rfid":"12345678901234567890123456789015"},{"SKUId":1,"rfid":"12345678901234567890123456789014"}]},422);

    testPUTRestockOrder(1,{newState:"DELIVERED"},200); // ok
    testGETRestockOrders([{
        id:1,
        issueDate:"2021/11/29 09:33",
        state:"DELIVERED",
        products: [{SKUId:1,description:"a new sku",price:10.99,qty:30}],
        supplierId : 1,
        transportNote: null,
        skuItems:[]}],200);

    testGETRestockOrdersIssued([],200);

    testPUTRestockOrder(1,{newState:"WRONG STATE"},422); // WRONG STATE VALUE
    testPUTRestockOrder(1,{},422); // MISSING NEW STATE 
    testPUTRestockOrder(1,{newState:"DELIVERED",wrongField:"WRONG"},422); // FIELD NOT REQUIRED
    testPUTRestockOrder(1,{WRONGNAME:"DELIVERED"},422); // WRONG FIELD NAME
    testPUTRestockOrder('A',{newState:"DELIVERED"},422); // WRONG FIELD TYPE
    testPUTRestockOrder(10,{newState:"DELIVERED"},404); // WRONG ID

    testPUTnewSKUItemList(1,{skuItems:[{"SKUId":1,"rfid":"12345678901234567890123456789015"},{"SKUId":1,"rfid":"12345678901234567890123456789014"}]},200);
    testGETRestockOrders([{
        id:1,
        issueDate:"2021/11/29 09:33",
        state:"DELIVERED",
        products: [{SKUId:1,description:"a new sku",price:10.99,qty:30}],
        supplierId : 1,
        transportNote: null,
        skuItems:[{"SKUId":1,"rfid":"12345678901234567890123456789015"},{"SKUId":1,"rfid":"12345678901234567890123456789014"}]}],200);
    
    // more field than required  
    testPUTnewSKUItemList(1,{newfiled:[],skuItems:[{"SKUId":1,"rfid":"12345678901234567890123456789015"},{"SKUId":1,"rfid":"12345678901234567890123456789014"}]},422);
    // no field 
    testPUTnewSKUItemList(1,{},422);
    // wrong field name 
    testPUTnewSKUItemList(1,{wrongname:[{"SKUId":1,"rfid":"12345678901234567890123456789015"},{"SKUId":1,"rfid":"12345678901234567890123456789014"}]},422);
    // wrong id value type
    testPUTnewSKUItemList('A',{skuItems:[{"SKUId":1,"rfid":"12345678901234567890123456789015"},{"SKUId":1,"rfid":"12345678901234567890123456789014"}]},422);
    // wrong id
    testPUTnewSKUItemList(10,{skuItems:[{"SKUId":1,"rfid":"12345678901234567890123456789015"},{"SKUId":1,"rfid":"12345678901234567890123456789014"}]},404);


    testPUTaddTransportNote(1,{transportNote:{"deliveryDate":"2022/12/29"}},422); //STATE IS NOT DELIVERY

    testPUTRestockOrder(1,{newState:"DELIVERY"},200); // ok new state = delivery
    testGETRestockOrders([{
        id:1,
        issueDate:"2021/11/29 09:33",
        state:"DELIVERY",
        products: [{SKUId:1,description:"a new sku",price:10.99,qty:30}],
        supplierId : 1,
        transportNote: null,
        skuItems:[{"SKUId":1,"rfid":"12345678901234567890123456789015"},{"SKUId":1,"rfid":"12345678901234567890123456789014"}]}],200);

    testPUTaddTransportNote(1,{transportNote:{"deliveryDate":"2020/12/29"}},422); //DELIVERYDATE IS ANTECEDENT ISSUEDATE
    
    testPUTaddTransportNote(10,{transportNote:{"deliveryDate":"2022/12/29 09:33"}},404); // ID NOT FOUND
    
    testPUTaddTransportNote(1,{transportNote:{"deliveryDate":"2022/12/29"}},200); //ok

    testPUTaddTransportNote(1,{},422); // no fields

    testPUTaddTransportNote(1,{wrongname:{"deliveryDate":"2022/12/29"}},422); // wrong name

    testPUTaddTransportNote(1,{anotherfield:1,transportNote:{"deliveryDate":"2022/12/29"}},422); // wrong name
    
    testPUTaddTransportNote(1,{transportNote:''},422); // missing field value

    testPUTaddTransportNote(1,{transportNote:{"deliveryDate":""}},422); // missing delivery note value

    testPUTaddTransportNote(1,{transportNote:{"WRONGNAME":"2022/12/29"}},422); // wrong delivery date field name
    
    testPUTaddTransportNote("hello",{transportNote:{"WRONGNAME":"2022/12/29"}},422); // wrong id type
    

    testPOSTRestockOrder({issueDate:"2022/05/22 09:33",
    products: [{SKUId:1,description:"a new sku",price:10.99,qty:30}],
    supplierId : 1 },201);

    testGETRestockOrders([{
        id:1,
        issueDate:"2021/11/29 09:33",
        state:"DELIVERY",
        products: [{SKUId:1,description:"a new sku",price:10.99,qty:30}],
        supplierId : 1,
        transportNote: "2022/12/29",
        skuItems:[{"SKUId":1,"rfid":"12345678901234567890123456789015"},{"SKUId":1,"rfid":"12345678901234567890123456789014"}]
    },{
        id:2,
        issueDate:"2022/05/22 09:33",
        state:"ISSUED",
        products: [{SKUId:1,description:"a new sku",price:10.99,qty:30}],
        supplierId : 1,
        transportNote: {},
        skuItems:[]}],200);
    
        testGETRestockOrderById(2,"2022/05/22 09:33","ISSUED",[{SKUId:1,description:"a new sku",price:10.99,qty:30}],1,{},[],200);
        testGETRestockOrdersIssued([{
            id:2,
            issueDate:"2022/05/22 09:33",
            state:"ISSUED",
            products: [{SKUId:1,description:"a new sku",price:10.99,qty:30}],
            supplierId : 1,
            transportNote: {},
            skuItems:[]}],200);

    //DELETE

    testDELETERestockOrder(1,204);
    testDELETERestockOrder(10,422); // wrong id
    testDELETERestockOrder("hello",422); // wrong id type






});