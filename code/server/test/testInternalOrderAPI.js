const DB = require('../EZWH_db/RunDB');
const DBinstance = DB.DBinstance;
const InternalOrderDAO = require('../Internal_order/InternalOrderDAO');
const InternalOrderDAOinstance = new InternalOrderDAO(DBinstance);
const { use } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

const app = require('../server');
// const { assert } = require('console');
let agent = chai.request.agent(app);

function testGETinternalOrders(resExpected, expectedHTTPstatus) {
    describe('GET /api/internalOrders', function(){
        it('GET /api/internalOrders', function(done) {
            agent.get('/api/internalOrders')
            .then(function(res) {
                res.should.have.status(expectedHTTPstatus);
                res.body.length.should.equal(resExpected.length);
                if(resExpected.length > 0){
                    for (let i = 0; i < resExpected.length; i++) {
                        res.body[i].id.should.equal(resExpected[i].id);
                        res.body[i].issueDate.should.equal(resExpected[i].issueDate);
                        res.body[i].state.should.equal(resExpected[i].state);
                        res.body[i].customerId.should.equal(resExpected[i].customerId);
                        // implement products checking
                        res.body[i].products.length.should.equal(resExpected[i].products.length);
                        for (let j = 0; j < resExpected[i].products.length; j++) {
                            res.body[i].products[j].SKUId.should.equal(resExpected[i].products[j].SKUId);
                            res.body[i].products[j].description.should.equal(resExpected[i].products[j].description);
                            res.body[i].products[j].price.should.equal(resExpected[i].products[j].price);
                            res.body[i].products[j].qty.should.equal(resExpected[i].products[j].qty);
                            if(resExpected[i].state == 'COMPLETED'){
                                res.body[i].products[j].RFID.should.equal(resExpected[i].products[j].RFID);
                            }
                        }
                    }
                }
                done();
            }).catch(err => done());
        });
    });
}

function testGETinternalOrdersIssued(resExpected, expectedHTTPstatus) {
    describe('GET /api/internalOrdersIssued', function() {
        it('GET /api/internalOrdersIssued', function(done) {
            agent.get('/api/internalOrdersIssued')
            .then(function(res) {
                res.should.have.status(expectedHTTPstatus);
                res.body.length.should.equal(resExpected.length);
                if(resExpected.length > 0){
                    for (let i = 0; i < resExpected.length; i++) {
                        res.body[i].id.should.equal(resExpected[i].id);
                        res.body[i].issueDate.should.equal(resExpected[i].issueDate);
                        res.body[i].state.should.equal(resExpected[i].state);
                        res.body[i].customerId.should.equal(resExpected[i].customerId);
                        // implement products checking
                        res.body[i].products.length.should.equal(resExpected[i].products.length);
                        for (let j = 0; j < resExpected[i].products.length; j++) {
                            res.body[i].products[j].SKUId.should.equal(resExpected[i].products[j].SKUId);
                            res.body[i].products[j].description.should.equal(resExpected[i].products[j].description);
                            res.body[i].products[j].price.should.equal(resExpected[i].products[j].price);
                            res.body[i].products[j].qty.should.equal(resExpected[i].products[j].qty);
                        }
                    }
                }
                done();
            }).catch(err => done(err));
        });
    });
}


function testGETinternalOrdersAccepted(resExpected, expectedHTTPstatus) {
    describe('GET /api/internalOrdersAccepted', function() {
        it('GET /api/internalOrdersAccepted', function(done) {
            agent.get('/api/internalOrdersAccepted')
            .then(function(res) {
                res.should.have.status(expectedHTTPstatus);
                res.body.length.should.equal(resExpected.length);
                if(resExpected.length > 0){
                    for (let i = 0; i < resExpected.length; i++) {
                        res.body[i].id.should.equal(resExpected[i].id);
                        res.body[i].issueDate.should.equal(resExpected[i].issueDate);
                        res.body[i].state.should.equal(resExpected[i].state);
                        res.body[i].customerId.should.equal(resExpected[i].customerId);
                        // implement products checking
                        for (let j = 0; j < resExpected[i].products.length; j++) {
                            res.body[i].products[j].SKUId.should.equal(resExpected[i].products[j].SKUId);
                            res.body[i].products[j].description.should.equal(resExpected[i].products[j].description);
                            res.body[i].products[j].price.should.equal(resExpected[i].products[j].price);
                            res.body[i].products[j].qty.should.equal(resExpected[i].products[j].qty);
                        }
                    }
                }
                done();
            }).catch(err => done(err));
        });
    });
}

function testGETinternalOrder(id, resExpected, expectedHTTPstatus) {
    describe('GET /api/internalOrders/:id', function() {
        it('GET /api/internalOrders/:id', function(done) {
            agent.get('/api/internalOrders/'+id)
            .then(function(res) {
                res.should.have.status(expectedHTTPstatus);
                if(expectedHTTPstatus == 200){
                    res.body.id.should.equal(resExpected.id);
                    res.body.issueDate.should.equal(resExpected.issueDate);
                    res.body.state.should.equal(resExpected.state);
                    res.body.customerId.should.equal(resExpected.customerId);
                    res.body.products.length.should.equal(resExpected.products.length);
                    for (let i = 0; i < resExpected.products.length; i++) {
                        res.body.products[i].SKUId.should.equal(resExpected.products[i].SKUId);
                        res.body.products[i].description.should.equal(resExpected.products[i].description);
                        res.body.products[i].price.should.equal(resExpected.products[i].price);
                        res.body.products[i].qty.should.equal(resExpected.products[i].qty);
                        if(resExpected.state == 'COMPLETED'){
                            res.body.products[i].RFID.should.equal(resExpected.products[i].RFID);
                        }
                    }
                }
                done();
            }).catch(err => done(err));
        });
    });
}

function testPOSTinternalOrder(orderData, expectedHTTPstatus) {
    describe('GET /api/internalOrders', function() {
        it('GET /api/internalOrders', function(done) {
            agent.post('/api/internalOrders')
            .send(orderData)
            .then(function(res) {
                res.should.have.status(expectedHTTPstatus);
                done();
            }).catch(err => done(err));
        });
    });
}

function testPUTinternalOrder(id, orderData, expectedHTTPstatus) {
    describe('PUT /api/internalOrders/:id', function() {
        it('PUT /api/internalOrders/:id', function(done) {
            agent.put('/api/internalOrders/'+id)
            .send(orderData)
            .then(function(res) {
                res.should.have.status(expectedHTTPstatus);
                done();
            }).catch(err => done(err));
        });
    });
}

function testDELETEinternalOrder(id, expectedHTTPstatus) {
    describe('DELETE /api/internalOrders/:id', function() {
        it('DELETE /api/internalOrders/:id', function(done) {
            agent.delete('/api/internalOrders/'+id)
            .then(function(res) {
                res.should.have.status(expectedHTTPstatus);
                done();
            }).catch(err => done(err));
        });
    });
}

describe('test InternalOrderAPIreceiver.js', () => {

    // restores DB to a known state before start testing
    before(async () => {
        let res = await InternalOrderDAOinstance.clearSKUITEMinInternalOrdersTable();
        res.should.equal(200);
        res = await InternalOrderDAOinstance.clearSKUinInternalOrdersTable();
        res.should.equal(200);
        res = await InternalOrderDAOinstance.clearInternalOrdersTable();
        res.should.equal(200);
    });

    // empty order lists
    testGETinternalOrders([], 200);
    testGETinternalOrdersIssued([], 200);
    testGETinternalOrdersAccepted([], 200);

    // invalid internal order id
    testGETinternalOrder(-1, [], 422);
    testGETinternalOrder(0, [], 422);
    // internal order not found
    testGETinternalOrder(1, [], 404);

    // invalid internal order combinations
    testPOSTinternalOrder({}, 422);
    testPOSTinternalOrder({
        "wrong": "2022/05/15 21:12",
        "products": [
            {
                "SKUId": 15,
                "description": "a product",
                "price": 17.99,
                "qty": 1
            }
        ],
        "customerId": 2
    }, 422);
    testPOSTinternalOrder({
        "issueDate": "2022/05/15 21:12",
        "wrong": [
            {
                "SKUId": 15,
                "description": "a product",
                "price": 17.99,
                "qty": 1
            }
        ],
        "customerId": 2
    }, 422);
    testPOSTinternalOrder({
        "issueDate": "2022/05/15 21:12",
        "products": [
            {
                "SKUId": 15,
                "description": "a product",
                "price": 17.99,
                "qty": 1
            }
        ],
        "wrong": 2
    }, 422);
    testPOSTinternalOrder({
        "issueDate": undefined,
        "products": [
            {
                "SKUId": 15,
                "description": "a product",
                "price": 17.99,
                "qty": 1
            }
        ],
        "customerId": 2
    }, 422);
    testPOSTinternalOrder({
        "issueDate": "2022/05/15 21:12",
        "products": undefined,
        "customerId": 2
    }, 422);
    testPOSTinternalOrder({
        "issueDate": "2022/05/15 21:12",
        "products": [
            {
                "SKUId": 15,
                "description": "a product",
                "price": 17.99,
                "qty": 1
            }
        ],
        "customerId": undefined
    }, 422);
    testPOSTinternalOrder({
        "issueDate": "2022/05/15 21:12",
        "products": [
            {
                "SKUId": 15,
                "description": "a product",
                "price": 17.99,
                "qty": 1
            }
        ],
        "customerId": 0
    }, 422);
    testPOSTinternalOrder({
        "issueDate": "2022/05/15 21:12",
        "products": [
            {
                "SKUId": 15,
                "description": "a product",
                "price": 17.99,
                "qty": 1
            }
        ],
        "customerId": -1
    }, 422);
    testPOSTinternalOrder({
        "issueDate": "2022/05/15 21:12",
        "products": [
            {
                "SKUId": 15,
                "description": "a product",
                "price": 17.99,
                "qty": 1
            },
            {
                "SKUId": 23,
                "description": "another product",
                "price": 7.99,
                "qty": 1
            }
        ],
        "customerId": 2
    }, 201);

    // check internal order has been issued
    testGETinternalOrders([
        {
            "id": 1,
            "issueDate": "2022/05/15 21:12",
            "state": "ISSUED",
            "customerId": 2,
            "products": [
                {
                    "SKUId": 15,
                    "description": "a product",
                    "price": 17.99,
                    "qty": 1
                },
                {
                    "SKUId": 23,
                    "description": "another product",
                    "price": 7.99,
                    "qty": 1
                }
            ]
        }
    ], 200);

    testGETinternalOrder(1, {
        "id": 1,
        "issueDate": "2022/05/15 21:12",
        "state": "ISSUED",
        "customerId": 2,
        "products": [
            {
                "SKUId": 15,
                "description": "a product",
                "price": 17.99,
                "qty": 1
            },
            {
                "SKUId": 23,
                "description": "another product",
                "price": 7.99,
                "qty": 1
            }
        ]
    }, 200);
    testGETinternalOrder(2, [], 404);

    // tests internal order modification
        // wrong parameters
    testPUTinternalOrder(-1, {"newState": "COMPLETED"}, 422);
    testPUTinternalOrder(0, {"newState": "COMPLETED"}, 422);
    testPUTinternalOrder(2, {}, 422);
    testPUTinternalOrder(2, {"newState": "COMPLETED"}, 422);
    testPUTinternalOrder(2, {"newState": "ACCEPTED"}, 404);
    testPUTinternalOrder(1, {"newState": "WRONG"}, 422);

        // changes order status
    testPUTinternalOrder(1, {"newState": "ACCEPTED"}, 200);

    testGETinternalOrder(1, {
        "id": 1,
        "issueDate": "2022/05/15 21:12",
        "state": "ACCEPTED",
        "customerId": 2,
        "products": [
            {
                "SKUId": 15,
                "description": "a product",
                "price": 17.99,
                "qty": 1
            },
            {
                "SKUId": 23,
                "description": "another product",
                "price": 7.99,
                "qty": 1
            }
        ]
    }, 200);
    testGETinternalOrder(2, [], 404);

    testPUTinternalOrder(1, {
        "newState": "COMPLETED",
        "products": [
            {
                "SkuID": 15,
                "RFID": "12345678901234567890123456789015"
            },
            {
                "SkuID": 23,
                "RFID": "12345678901234567890123456789023"
            }
        ]
    }, 200);
    testGETinternalOrders([
        {
            "id": 1,
            "issueDate": "2022/05/15 21:12",
            "state": "COMPLETED",
            "customerId": 2,
            "products": [
                {
                    "SKUId": 15,
                    "description": "a product",
                    "price": 17.99,
                    "qty": 1,
                    "RFID": "12345678901234567890123456789015"
                },
                {
                    "SKUId": 23,
                    "description": "another product",
                    "price": 7.99,
                    "qty": 1,
                    "RFID": "12345678901234567890123456789023"
                }
            ]
        }
    ], 200);

    // delete order test
        // wrong id
    testDELETEinternalOrder(-1, 422);
    testDELETEinternalOrder(0, 422);

    testDELETEinternalOrder(1, 204);

    testGETinternalOrders([], 200);
    testGETinternalOrder(1, {}, 404);

});

// -TO ADD SCENARIO-LIKE API TESTING
describe('test UC9-1 - Internal Order IO accepted', () => {

    // restores DB to a known state before start testing
    before(async () => {
        let res = await InternalOrderDAOinstance.clearSKUITEMinInternalOrdersTable();
        res.should.equal(200);
        res = await InternalOrderDAOinstance.clearSKUinInternalOrdersTable();
        res.should.equal(200);
        res = await InternalOrderDAOinstance.clearInternalOrdersTable();
        res.should.equal(200);
    });

    // issues internal order
    testPOSTinternalOrder({
        "issueDate": "2022/05/15 21:12",
        "products": [
            {
                "SKUId": 15,
                "description": "a product",
                "price": 17.99,
                "qty": 1
            },
            {
                "SKUId": 23,
                "description": "another product",
                "price": 7.99,
                "qty": 1
            }
        ],
        "customerId": 2
    }, 201);

    // check internal order has been issued
    testGETinternalOrders([
        {
            "id": 1,
            "issueDate": "2022/05/15 21:12",
            "state": "ISSUED",
            "customerId": 2,
            "products": [
                {
                    "SKUId": 15,
                    "description": "a product",
                    "price": 17.99,
                    "qty": 1
                },
                {
                    "SKUId": 23,
                    "description": "another product",
                    "price": 7.99,
                    "qty": 1
                }
            ]
        }
    ], 200);

    // accepts order
    testPUTinternalOrder(1, {"newState": "ACCEPTED"}, 200);

    // check internal order has been accepted
    testGETinternalOrders([
        {
            "id": 1,
            "issueDate": "2022/05/15 21:12",
            "state": "ACCEPTED",
            "customerId": 2,
            "products": [
                {
                    "SKUId": 15,
                    "description": "a product",
                    "price": 17.99,
                    "qty": 1
                },
                {
                    "SKUId": 23,
                    "description": "another product",
                    "price": 7.99,
                    "qty": 1
                }
            ]
        }
    ], 200);
    
});

describe('test UC9-2 - Internal Order IO refused', () => {

    // restores DB to a known state before start testing
    before(async () => {
        let res = await InternalOrderDAOinstance.clearSKUITEMinInternalOrdersTable();
        res.should.equal(200);
        res = await InternalOrderDAOinstance.clearSKUinInternalOrdersTable();
        res.should.equal(200);
        res = await InternalOrderDAOinstance.clearInternalOrdersTable();
        res.should.equal(200);
    });

    // issues internal order
    testPOSTinternalOrder({
        "issueDate": "2022/05/15 21:12",
        "products": [
            {
                "SKUId": 15,
                "description": "a product",
                "price": 17.99,
                "qty": 1
            },
            {
                "SKUId": 23,
                "description": "another product",
                "price": 7.99,
                "qty": 1
            }
        ],
        "customerId": 2
    }, 201);

    // check internal order has been issued
    testGETinternalOrders([
        {
            "id": 1,
            "issueDate": "2022/05/15 21:12",
            "state": "ISSUED",
            "customerId": 2,
            "products": [
                {
                    "SKUId": 15,
                    "description": "a product",
                    "price": 17.99,
                    "qty": 1
                },
                {
                    "SKUId": 23,
                    "description": "another product",
                    "price": 7.99,
                    "qty": 1
                }
            ]
        }
    ], 200);

    // accepts order
    testPUTinternalOrder(1, {"newState": "REFUSED"}, 200);

    // check internal order has been accepted
    testGETinternalOrders([
        {
            "id": 1,
            "issueDate": "2022/05/15 21:12",
            "state": "REFUSED",
            "customerId": 2,
            "products": [
                {
                    "SKUId": 15,
                    "description": "a product",
                    "price": 17.99,
                    "qty": 1
                },
                {
                    "SKUId": 23,
                    "description": "another product",
                    "price": 7.99,
                    "qty": 1
                }
            ]
        }
    ], 200);
    
});

describe('test UC9-3 - Internal Order IO cancelled', () => {

    // restores DB to a known state before start testing
    before(async () => {
        let res = await InternalOrderDAOinstance.clearSKUITEMinInternalOrdersTable();
        res.should.equal(200);
        res = await InternalOrderDAOinstance.clearSKUinInternalOrdersTable();
        res.should.equal(200);
        res = await InternalOrderDAOinstance.clearInternalOrdersTable();
        res.should.equal(200);
    });

    // issues internal order
    testPOSTinternalOrder({
        "issueDate": "2022/05/15 21:12",
        "products": [
            {
                "SKUId": 15,
                "description": "a product",
                "price": 17.99,
                "qty": 1
            },
            {
                "SKUId": 23,
                "description": "another product",
                "price": 7.99,
                "qty": 1
            }
        ],
        "customerId": 2
    }, 201);

    // check internal order has been issued
    testGETinternalOrders([
        {
            "id": 1,
            "issueDate": "2022/05/15 21:12",
            "state": "ISSUED",
            "customerId": 2,
            "products": [
                {
                    "SKUId": 15,
                    "description": "a product",
                    "price": 17.99,
                    "qty": 1
                },
                {
                    "SKUId": 23,
                    "description": "another product",
                    "price": 7.99,
                    "qty": 1
                }
            ]
        }
    ], 200);

    // accepts order
    testPUTinternalOrder(1, {"newState": "CANCELLED"}, 200);

    // check internal order has been accepted
    testGETinternalOrders([
        {
            "id": 1,
            "issueDate": "2022/05/15 21:12",
            "state": "CANCELLED",
            "customerId": 2,
            "products": [
                {
                    "SKUId": 15,
                    "description": "a product",
                    "price": 17.99,
                    "qty": 1
                },
                {
                    "SKUId": 23,
                    "description": "another product",
                    "price": 7.99,
                    "qty": 1
                }
            ]
        }
    ], 200);
    
});

describe('test UC10-1 - Internal Order IO Completed', () => {

    // restores DB to a known state before start testing
    before(async () => {
        let res = await InternalOrderDAOinstance.clearSKUITEMinInternalOrdersTable();
        res.should.equal(200);
        res = await InternalOrderDAOinstance.clearSKUinInternalOrdersTable();
        res.should.equal(200);
        res = await InternalOrderDAOinstance.clearInternalOrdersTable();
        res.should.equal(200);
    });

    // issues internal order
    testPOSTinternalOrder({
        "issueDate": "2022/05/15 21:12",
        "products": [
            {
                "SKUId": 15,
                "description": "a product",
                "price": 17.99,
                "qty": 1
            },
            {
                "SKUId": 23,
                "description": "another product",
                "price": 7.99,
                "qty": 1
            }
        ],
        "customerId": 2
    }, 201);

    // accepts order
        // missing prodicts list
    testPUTinternalOrder(1, {"newState": "COMPLETED"}, 422);
    testPUTinternalOrder(1, {
        "newState": "COMPLETED",
        "products": [
            {
                "SkuID": 15,
                "RFID": "12345678901234567890123456789015"
            },
            {
                "SkuID": 23,
                "RFID": "12345678901234567890123456789023"
            }
        ]
    }, 200);

    // check internal order has been accepted
    testGETinternalOrders([
        {
            "id": 1,
            "issueDate": "2022/05/15 21:12",
            "state": "COMPLETED",
            "customerId": 2,
            "products": [
                {
                    "SKUId": 15,
                    "description": "a product",
                    "price": 17.99,
                    "qty": 1,
                    "RFID": "12345678901234567890123456789015"
                },
                {
                    "SKUId": 23,
                    "description": "another product",
                    "price": 7.99,
                    "qty": 1,
                    "RFID": "12345678901234567890123456789023"
                }
            ]
        }
    ], 200);
    
});