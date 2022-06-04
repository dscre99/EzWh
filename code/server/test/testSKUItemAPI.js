const DB = require('../EZWH_db/RunDB');
const DBinstance = DB.DBinstance;
const SKUDAO = require('../SKU/SKUdao');
const SKUDAOInstance = new SKUDAO(DBinstance);

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();


const app = require('../server');
let agent = chai.request.agent(app);

describe('testing sku item apis', () => {
    before(async () => {
        await agent.delete('/api/clearskuitemtable');
        let s = {
            "description": "a new sku",
            "weight": 100,
            "volume": 50,
            "notes": "first SKU",
            "price": 10.99,
            "availableQuantity": 50
        }
        let drop = await SKUDAOInstance.dropSKUTable();
        let skutable = await SKUDAOInstance.newSKUTable();
        let sku = await SKUDAOInstance.newSKU(s);
    });
    testGetSKUItems([], 200);

    testNewSKUItem("12345678901234567890123456789016", 1, "2021/11/29 12:30", 201);

    testNewSKUItem("12345678901234567890123456789015", 2, "2021/11/29 12:30", 404);
    testNewSKUItem("12345678901234567890123456789014", 1, "2021/11/29 12:30", 201);
    testNewSKUItem("12345678901234567890123456789114", 1, "2021/5/26 12:30", 201);

    let skuitem = [{
        RFID: "12345678901234567890123456789016",
        SKUId: 1,
        Available: 0,
        DateOfStock: "2021/11/29 12:30"
    }]

    testGetSKUItems(skuitem, 200);

    testGetSKUItemBySKUId(1, [], 200);
    testGetSKUItemBySKUId(2, [], 404);

    testGetSKUItemByRfid("12345678901234567890123456789014", skuitem, 200);
    testGetSKUItemByRfid("12345678901234567890123456789015", [], 404);

    let newData = {
        "newRFID": "12345678901234567890123456789017",
        "newAvailable": 1,
        "newDateOfStock": "2021/5/26 12:30"
    }

    testModifySKUItem("12345678901234567890123456789014", newData, 200)

    testDeleteSKUItemByRfid("12345678901234567890123456789114", 204);

});

function testNewSKUItem(rfid, skuid, dateOfStock, expectedHTTPStatus) {
    it('testing POST /api/skuitem', async function () {
        let skuitem = {
            "RFID": rfid,
            "SKUId": skuid,
            "DateOfStock": dateOfStock
        }
        await agent.post('/api/skuitem')
            .send(skuitem)
            .then(function (res) {
                res.should.have.status(expectedHTTPStatus);
            });
    });
}


function testGetSKUItems(expected, expectedHTTPStatus) {
    it('testing GET /api/skuitems', async function () {
        await agent.get('/api/skuitems').then(function (res) {
            res.should.have.status(expectedHTTPStatus);
            if (expected.length != 0) {
                for (let i = 0; i < expected.length; i++) {
                    res.body[i].RFID.should.equal(expected[i].RFID);
                    res.body[i].SKUId.should.equal(expected[i].SKUId);
                    res.body[i].Available.should.equal(expected[i].Available);
                    res.body[i].DateOfStock.should.equal(expected[i].DateOfStock);
                }
            }
        });
    });
}

function testGetSKUItemBySKUId(skuid, expected, expectedHTTPStatus) {
    it('testing GET /api/skuitems/sku/:id', async function () {
        await agent.get('/api/skuitems/sku/' + skuid).then(function (res) {
            res.should.have.status(expectedHTTPStatus);
            if (expected.length != 0) {
                for (let i = 0; i < expected.length; i++) {
                    res.body[i].RFID.should.equal(expected[i].RFID);
                    res.body[i].Available.should.equal(expected[i].Available);
                    res.body[i].DateOfStock.should.equal(expected[i].DateOfStock);
                }
            }
        });

    });
}

function testGetSKUItemByRfid(rfid, expected, expectedHTTPStatus) {
    it('testing GET /api/skuitems/:rfid', async function () {
        await agent.get('/api/skuitems/' + rfid).then(function (res) {
            res.should.have.status(expectedHTTPStatus);
            if (expected.length != 0) {
                for (let i = 0; i < expected.length; i++) {
                    res.body[i].SKUId.should.equal(expected[i].SKUId);
                    res.body[i].Available.should.equal(expected[i].Available);
                    res.body[i].DateOfStock.should.equal(expected[i].DateOfStock);
                }
            }
        });
    });
}

function testModifySKUItem(rfid, newData , expectedHTTPStatus) {
    it('testing PUT /api/skuitems/:rfid', async function () {
        await agent.put('/api/skuitems/' + rfid)
            .send(newData)
            .then(function (res) {
                res.should.have.status(expectedHTTPStatus);
            });
    });
}


function testDeleteSKUItemByRfid(rfid, expectedHTTPStatus) {
    it('testing DELETE /api/skuitems/:rfid', async function () {
        await agent.delete('/api/skuitems/' + rfid).then(function (res) {
            res.should.have.status(expectedHTTPStatus);
        });
    });
}
