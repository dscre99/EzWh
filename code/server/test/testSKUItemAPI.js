const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

const app = require('../server');
let agent = chai.request.agent(app);

describe('testing sku item apis', () => {
    before(async () => {
        await agent.delete('/api/clearskuitemtable');
    });
});

function testNewSKUItem(rfid, skuid, dateOfStock, expectedHTTPStatus) {
    it('testing POST /api/skuitem', async function () {
        let skuitem = {
            RFID: rfid,
            SKUId: skuid,
            DateOfStock: dateOfStock
        }
        await agent.post('/api/skuitem')
            .send(skuitem)
            .then(function (res) {
                res.should.have.status(expectedHTTPStatus);
            });
    });
}

