const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();
const DB = require('../EZWH_db/RunDB');
const DBinstance = DB.DBinstance;
const app = require('../server');
let agent = chai.request.agent(app);
const SKU = require("../SKU/SKUdao");
const SKUInstance = new SKU(DBinstance);

function testGETItembyId(id, description, price, skuid, supplierid, expectedHTTPstatus) {
    it('GET/api/items/:id/:supplierId', async function() {
        await agent.get('/api/items/'+id+'/'+supplierid).then(function(res) {
            res.should.have.status(expectedHTTPstatus);
            if(res.status == 200) {
                res.body.id.should.equal(id);
                res.body.description.should.equal(description);
                res.body.price.should.equal(price);
                res.body.SKUId.should.equal(skuid);
                res.body.supplierId.should.equal(supplierid);
            }
        });
    });
}

function testGETItems(expectedData, expectedHTTPstatus) {
    it('GET/api/items', async function() {
        await agent.get('/api/items')
                    .then(function(res) {
                        res.should.have.status(expectedHTTPstatus);
                        if(expectedData.length != 0){
                            for (let i = 0; i < expectedData.length; i++) {
                                res.body[i].id.should.equal(expectedData[i].id);
                                res.body[i].description.should.equal(expectedData[i].description);
                                res.body[i].price.should.equal(expectedData[i].price);
                                res.body[i].SKUId.should.equal(expectedData[i].SKUId);
                                res.body[i].supplierId.should.equal(expectedData[i].supplierId);
                            }
                        } else {
                            res.body.length.should.equal(expectedData.length);
                        }
                        
                    });
    });
}

function testPOSTItem(expectedData, expectedHTTPStatus) {
    it('POST/api/item', async function() {
        await agent.post('/api/item')
            .send(expectedData)
            .then(function(res) {
                res.should.have.status(expectedHTTPStatus);
            });
    });
}

function testPUTItem(id,supplierId,expectedData, expectedHTTPStatus) {
    it('PUT/api/item/:id/:supplierId', async function() {
        await agent.put('/api/item/'+id+'/'+supplierId)
            .send(expectedData)
            .then(function(res) {
                res.should.have.status(expectedHTTPStatus);
            });
    });
}

function testDELETEItem(id,supplierId,expectedHTTPStatus) {
    it('DELETE/api/items/:id', async function() {
        await agent.delete('/api/items/'+id+'/'+supplierId)
                    .then(function(res) {
                        res.should.have.status(expectedHTTPStatus);
                    })
    });
}

describe('test Item.js', () => {

    before(async () => {
        await agent.delete('/api/clearitemtable');
        let sku = {
            description: "a new sku",
            weight: 100,
            volume: 50,
            notes: "first sku",
            availableQuantity: 50,
            price: 10.99
        }
        let newSku = SKUInstance.newSKU(sku);
    });
     
    testGETItems([],200);
    //OK
    testPOSTItem({
        "id" : 5,
        "description" : "a new item",
        "price" : 10.99,
        "SKUId" : 1,
        "supplierId" : 1
    },201);
    
    //OK
    testPOSTItem({
        "id" : 12,
        "description" : "a new item",
        "price" : 10.99,
        "SKUId" : 1,
        "supplierId" : 2
    },201);

    // MISSING FIELD
    testPOSTItem({
        "id" : 12,
        "description" : "a new item",
        "price" : 10.99,
        "SKUId" : 1,
    },422);

    //WRONG FIELD NAME 
    testPOSTItem({
        "id" : 12,
        "description" : "a new item",
        "price" : 10.99,
        "SKUId" : 1,
        "NOME ERRATO" : 2
    },422);

    //NO FIELDS
    testPOSTItem({},422);

    //MISSING FIELD VALUE
    testPOSTItem({
        "id" : 1,
        "description" : "",
        "price" : 10.99,
        "SKUId" : 1,
        "supplierId" : 2
    },422);

    //ID REPLICATO
    testPOSTItem({
        "id" : 12,
        "description" : "a new item",
        "price" : 10.99,
        "SKUId" : 1,
        "supplierId" : 2
    },422);

    //SAME COUPLE SUPPLIER ID - SKUID
    testPOSTItem({
        "id" : 1,
        "description" : "a new item",
        "price" : 10.99,
        "SKUId" : 1,
        "supplierId" : 2
    },422);

    testGETItems([{
        "id": 5,
        "description": "a new item",
        "price": 10.99,
        "SKUId": 1,
        "supplierId": 1
                },{
        "id": 12,
        "description": "a new item",
        "price": 10.99,
        "SKUId": 1,
        "supplierId": 2  }], 200);
    
    testGETItembyId(10,"a new item",10.99,1,2,404);
    testGETItembyId(12,"a new item",10.99,1,2,200);

    testPUTItem(12,2,{newDescription:"a new description",newPrice:9.99},200);
    testGETItembyId(12,"a new description",9.99,1,2,200);
    
    //more value
    testPUTItem(12,2,{newDescription:"a new description",newPrice:9.99,ANOTHERVALUE:5},422);
    // missing value
    testPUTItem(12,2,{newDescription:"a new description"},422);
    // wrong value name
    testPUTItem(12,2,{WRONGNAME:"a new description",newPrice:9.99},422);
    // missing value field
    testPUTItem(12,2,{newDescription:"",newPrice:9.99},422);
    testPUTItem(12,2,{newDescription:undefined,newPrice:9.99},422);
    // wrong id 
    testPUTItem(120,2,{newDescription:"a new description",newPrice:9.99},404);
    
    testDELETEItem(120,1,422);
    testDELETEItem('120',1,422);
    testDELETEItem(5,1,204);

    testGETItembyId(5,'','','','',404);






    






    

});


