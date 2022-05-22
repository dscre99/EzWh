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
            if (expected.length != 0) {
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
                    done();
                }
            }
        });
    }
}