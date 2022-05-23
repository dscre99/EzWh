const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

const app = require('../server');
const { isEmpty } = require('../utils/utils');
let agent = chai.request.agent(app);


describe('Test Position A.P.I.s', () => {

    // Testing POST Request
    newPosition(200, '800234543412', '8002', 3454, 100, 300, 250);
    newPosition(422);

    // Testing GET Request
    let empty_body = {};
    let non_empty_body = {"test":1};
    getPositions(200, empty_body);
    getPositions(503, non_empty_body);

});


function newPosition(expectedHTTPStatus, positionID, aisleID, row, col, maxWeight, maxVolume) {
    it('Adding a new Position', function (done) {
        if (positionID !== undefined) {  // TO-DO : call the Body Validation function
            let position = { positionID: positionID, aisleID: aisleID, row: row, col: col, maxWeight:maxWeight, maxVolume:maxVolume };
            agent.post("/api/position").send(position).then((res) => {
                res.should.have.status(expectedHTTPStatus);
                done();
            })
            done();
        } else {
            agent.post('/api/position') // Body is empty or incorrect
                .then(function (res) {
                    res.should.have.status(expectedHTTPStatus);
                    done();
                });
        }

    });
}


function getPositions(expectedHTTPStatus, body) {
    it('Getting all the Positions', function (done) {
        if (!isEmpty(body)) {
            agent.get('/api/positions').then((res) => {
                res.should.have.status(expectedHTTPStatus);
            })
            done();
        } else {
            agent.get('/api/positions')
                .then((res) => {
                    res.should.have.status(expectedHTTPStatus);
                    res.body.positionID.should.equal("800234543412");
                    res.body.aisleID.should.equal("8002");
                    res.body.row.should.equal(3454);
                    res.body.col.should.equal(3412);
                    res.body.maxWeight.should.equal(1000);
                    res.body.maxVolume.should.equal(1000);
                    res.body.occupiedWeight.should.equal(0);
                    res.body.occupiedVolume.should.equal(0);
                    done();
                });
                done();
        }
    });
}



