const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

const app = require('../server');
let agent = chai.request.agent(app);


function testGetSKUs(expected, expectedHTTPStatus) {
    it('testing GET /api/skus', async function () {
        await agent.get('/api/skus').then(function (res) {
            res.should.have.status(expectedHTTPStatus);
            if (expected.length != 0) {
                for (let i = 0; i < expected.length; i++) {
                    console.log(res.body);
                    console.log(expected);
                    console.log(res.status);
                    res.body[i].id.should.equal(expected[i].id);
                    res.body[i].description.should.equal(expected[i].description);
                    res.body[i].weight.should.equal(expected[i].weight);
                    res.body[i].volume.should.equal(expected[i].volume);
                    res.body[i].notes.should.equal(expected[i].notes);
                    res.body[i].position.should.equal(expected[i].position);
                    res.body[i].availableQuantity.should.equal(expected[i].availableQuantity);
                    res.body[i].price.should.equal(expected[i].price);
                    res.body[i].testDescriptors.should.equal(expected[i].testDescriptors);
                }
            } 
        });
    });
}

function testGetSKUByID(id, expected, expectedHTTPStatus) {
    it('testing GET /api/skus/:id', async function () {
        await agent.get('/api/skus/'+id).then(function (res) {
            res.should.have.status(expectedHTTPStatus);
            console.log(res.body);
            console.log(expected);
            console.log(res.status);
            if (expectedHTTPStatus == 200) {
                res.body.description.should.equal(expected.description);
                res.body.weight.should.equal(expected.weight);
                res.body.volume.should.equal(expected.volume);
                res.body.notes.should.equal(expected.notes);
                res.body.position.should.equal(expected.position);
                res.body.availableQuantity.should.equal(expected.availableQuantity);
                res.body.price.should.equal(expected.price);
                res.body.testDescriptors.should.equal(expected.testDescriptors);
            }
        });
    });
}

function testNewSKU(description, weight, volume, notes, price, availableQuantity, expected, expectedHTTPStatus) {
    it('testing POST /api/sku', async function () {
        let sku = {
            description: description,
            weight: weight,
            volume: volume,
            notes: notes,
            price: price,
            availableQuantity: availableQuantity
        }
        await agent.post('/api/sku')
            .send(sku)
            .then(function (res) {
                res.should.have.status(expectedHTTPStatus);
            });
    });
}

function testModifySKU(id, modifications, expectedHTTPStatus) {
    it('testing PUT /api/sku/:id', async function () {
        await agent.put('/api/sku/' + id).send(modifications).then(function (res) {
            res.should.have.status(expectedHTTPStatus);
        });

    });
}

function testModifySKUPosition(id, position, expectedHTTPStatus) {
    it('testing PUT /api/sku/:id/position', async function () {
        await agent.put('/api/sku/'+ id + '/position')
            .send(position)
            .then(function (res) {
                console.log(res.body);
                console.log(res.status);
                res.should.have.status(expectedHTTPStatus);
        });
    });
}

function testDeleteSKU(id, expectedHTTPStatus) {
    it('testing DELETE /api/skus/:id', async function () {
        await agent.delete('/api/skus/' + id).then(function (res) {
            res.should.have.status(expectedHTTPStatus);
        });
    });
}

function testClearskutable() {
    it('testing DELETE /api/clearskutable', async function () {
        await agent.delete('/api/clearskutable').then(function (res) {
            res.should.have.status(200);
        });
    });
}


describe('test sku apis', () => {
    before(async () => {
        await agent.delete('/api/clearskutable');
    });

    testClearskutable();

    testGetSKUs([], 200);
    testGetSKUByID(10,[], 404);


    let exp1 = {
        description: "a new sku",
        weight: 100,
        volume: 50,
        notes: "first sku",
        availableQuantity: 50,
        price: 10.99
    }

    let exp2 = {
        id:1,
        description: "a new sku",
        weight: 100,
        volume: 50,
        notes: "first sku",
        availableQuantity: 50,
        price: 10.99,
        position: "800234523412",
        testDescriptors: []
    }

    let modifications = {
        "newDescription": "a new sku",
        "newWeight": 100,
        "newVolume": 50,
        "newNotes": "first SKU",
        "newPrice": 10.99,
        "newAvailableQuantity": 50
    }
        
    testNewSKU("a new sku", 100, 50, "first sku", 10.99, 50, exp1[0], 201);
    testNewSKU("sku", -1, -3, "second", 5.00, 1, {}, 422);
    testModifySKU(1, modifications, 200);
    testModifySKUPosition(1, "800234523412", 200);
    testGetSKUs(exp2, 200);

    testGetSKUByID(1, exp2[0], 200);
    //testGetSKUs(exp, 200);
    testDeleteSKU(1, 200);
});
