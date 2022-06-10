const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

const app = require('../server');
const { isEmpty, validatePositionID, positionBodyLength } = require('../utils/utils');
let agent = chai.request.agent(app);
 
const dao = require('../Position/Position_DAO');
const db = new dao();

describe('Test Position A.P.I.s', () => {

    before(async () => {
        await db.dropPositionTable();
        await db.newPositionTable();
    })


    // Testing POST Requests
    let position = {
        "positionID":"300234543415",
        "aisleID":"8002",
        "row":3454,
        "col":100,
        "maxWeight":300,
        "maxVolume":250,
        "OccupiedWeight": 0,
        "OccupiedVolume":0
    }

    let incorrect_position_data = {
        "positionID":"1910as",
        "aisleID":"8002",
        "row":3454,
        "col":100,
        "maxWeight":300,
        "maxVolume":250,
        "OccupiedWeight": 0,
        "OccupiedVolume":0
    }

    newPosition(201, position);
    newPosition(422, incorrect_position_data);

    // Testing GET Requests
    let empty_body = {};
    let non_empty_body = {"test":1};
    getPositions(200, empty_body);
    getPositions(503, non_empty_body);

    // Testing PUT Requests
    let new_position = {
        "positionID":"800234543412",
        "AisleID": "8000",
        "Row": "3404",
        "Col": "3212",
        "MaxWeight": 1100,
        "MaxVolume": 700,
        "OccupiedWeight": 100,
        "OccupiedVolume":300
    }

    modifyPosition(200, "800234543412", new_position);
    modifyPositionID(200, "800234543412", "300234543417");
    modifyPositionID(4040, "3002345431317", "300234543417");

    deletePosition(204, "300234543417");

});


function newPosition(expectedHTTPStatus, position) {
    
    it('POST /api/position', function (done) {
        if (positionBodyLength(position, "post")) {  
            agent.post("/api/position").send(position).then((res) => {
                res.should.have.status(expectedHTTPStatus);
                done();
            }).catch(err=>done(err))
        } else {
            agent.post('/api/position') // Body is empty or incorrect
                .then(function (res) {
                    res.should.have.status(expectedHTTPStatus);
                    done();
                }).catch(err=>done(err));
        }

    });
}


function getPositions(expectedHTTPStatus, body) {
    it('GET /api/positions', function (done) {
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


function modifyPosition(expectedHTTPStatus, positionID, newPosition) {
    it('PUT /api/position/:positionID', function (done) {
        if (positionID !== undefined) {  // TO-DO : call the Body Validation function
            agent.put("/api/position/:positionID").send(positionID, newPosition).then((res) => {
                res.should.have.status(expectedHTTPStatus);
                done();
            })
            done();
        } else {
            agent.put('/api/position/:positionID') // Body is empty or incorrect
                .then(function (res) {
                    res.should.have.status(expectedHTTPStatus);
                    done();
                });
        }

    });
}

function modifyPositionID(expectedHTTPStatus, positionID, newID) {
    it('PUT /api/position/:positionID/changeID', function (done) {
        if (positionID !== undefined) {  // TO-DO : call the Body Validation function
            agent.put("/api/position/:positionID/changeID").send(positionID, newID).then((res) => {
                res.should.have.status(expectedHTTPStatus);
                done();
            })
            done();
        } else {
            agent.post('/api/position/:positionID') // Body is empty or incorrect
                .then(function (res) {
                    res.should.have.status(expectedHTTPStatus);
                    done();
                });
        }

    });
}


function deletePosition(expectedHTTPStatus, positionID) {
    it('DELETE /api/position/:positionID', function (done) {
        if (validatePositionID(positionID)) {  // TO-DO : call the Body Validation function
            agent.delete("/api/position/:positionID").send(positionID).then((res) => {
                res.should.have.status(expectedHTTPStatus);
                done();
            })
            done();
        } else {
            agent.delete('/api/position/:positionID') // Body is empty or incorrect
                .then(function (res) {
                    res.should.have.status(expectedHTTPStatus);
                    done();
                });
        }

    });
}