const chai = require('chai');
const chaiHttp = require('chai-http');
const { get } = require('express/lib/request');
chai.use(chaiHttp);
chai.should();

const app = require('../server');
const { isEmpty } = require('../utils/utils');
let agent = chai.request.agent(app);
 

describe('Test Test Descriptor A.P.I.s', () => {

    before(async () => {
        await agent.delete('/api/deleteAll');
    });

    // Testing GET Requests
    testgetTestDescriptors(200, []);

    // Testing POST Requests
    let test_descriptor = {
        "name":"test descriptor 1",
        "procedureDescription":"This test is described by...",
        "idSKU" :1
    }

    let incorrect_test_descriptor = {};
    
    newTestDescriptor(201, test_descriptor);
    newTestDescriptor(422, incorrect_test_descriptor);

    let data = {
        "ID":1,
        "NAME":"test descriptor 1",
        "PROCEDUREDESCRIPTION":"This test is described by...",
        "IDSKU":1
    }

    testgetTestDescriptors(200, data);

});


function newTestDescriptor(expectedHTTPStatus, test_descriptor) {
    
    it('POST /api/testDescriptor', function (done) {
        if (test_descriptor !== {}) {  // TO-DO : call the Body Validation function
            agent.post("/api/testDescriptor").send(test_descriptor).then((res) => {
                res.should.have.status(expectedHTTPStatus);
                done();
            })
        } else {
            agent.post('/api/testDescriptor') // Body is empty or incorrect
                .then(function (res) {
                    res.should.have.status(expectedHTTPStatus);
                    done();
                });
        }

    });
}

function testgetTestDescriptors(expectedHTTPstatus, expectedData) {
    it('GET /api/testDescriptors', async function() {
        await agent.get('/api/testDescriptors')
                    .then(function(res) {
                        res.should.have.status(expectedHTTPstatus);
                        if(expectedData.length != 0){
                            for (let i = 0; i < expectedData.length; i++) {
                                res.body[i].ID.should.equal(expectedData.ID);
                                res.body[i].NAME.should.equal(expectedData.NAME);
                                res.body[i].PROCEDUREDESCRIPTION.should.equal(expectedData.PROCEDUREDESCRIPTION);
                                res.body[i].IDSKU.should.equal(expectedData.IDSKU);
                            }

                        
                        } else {
                            res.body.length.should.equal(expectedData.length);
                        }
                        
                    });
    });
}





function modifyTestDescriptor(expectedHTTPStatus, positionID, newPosition) {
    it('Modify a Position', function (done) {
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
    it('Modify a Position ID', function (done) {
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


function deleteTestDescriptor(expectedHTTPStatus, positionID) {
    it('Delete a Position', function (done) {
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