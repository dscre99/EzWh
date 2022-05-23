const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

const app = require('../server');
var agent = chai.request.agent(app);

function testGetSKUs(expected, expectedHTTPStatus) {
    it('testing GET /api/skus', async function () {
        await agent.get('/api/skus').then(function (res) {
            res.should.have.status(expectedHTTPStatus);
            if (expected.length != 0 && res.status==200) {
                res.body.length.should.equal(expected.length);
                for (let i = 0; i < expected.length; i++) {
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
            if (res.status == 200) {
                res.body.length.should.equal(expected.length);
                res.body.id.should.equal(expected.id);
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
        await agent.post('/api/sku').send(sku).then(function (res) {
            res.should.have.status(expectedHTTPStatus);
            if (expectedHTTPStatus == 201) {
                res.body.description.should.equal(expected.description);
                res.body.weight.should.equal(expected.weight);
                res.body.volume.should.equal(expected.volume);
                res.body.notes.should.equal(expected.notes);
                res.body.price.should.equal(expected.price);
                res.body.availableQuantity.should.equal(expected.availableQuantity);
            }
        })
    })
}

function testModifySKU(id, modifications, expectedHTTPStatus) {
    it('testing PUT /api/sku/:id', async function () {
        await agent.put('/api/sku/' + id).send(modifications).then(function (res) {
            res.should.have.status(expectedHTTPStatus);
        });
    })
}