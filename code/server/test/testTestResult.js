const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

const app = require('../server');
let agent = chai.request.agent(app);
let dao = require('../Test_result/Test_result_DAO');
let db = new dao();
 

describe('Test Test Result A.P.I.s', () => {

    before(async () => {
        await db.dropTestResultTable();
        await db.newTestResultTable();
    });

    
    testGetTestResults(404,"1234","The requested RFID doesn't exist!");

    
    // let test_descriptor = {
    //     "NAME":"test descriptor 1",
    //     "PROCEDUREDESCRIPTION":"This test is described by...",
    //     "IDSKU" :1
    // }

    // let incorrect_test_descriptor = {};
    
    // newTestDescriptor(201, test_descriptor);
    // newTestDescriptor(422, incorrect_test_descriptor);

    // let data = {
    //     "ID":1,
    //     "NAME":"test descriptor 1",
    //     "PROCEDUREDESCRIPTION":"This test is described by...",
    //     "IDSKU":1
    // }

    // testgetTestDescriptors(200, data);

    // let new_test_descriptor = {
    //     "NAME":"test descriptor 1 UPDATED",
    //     "PROCEDUREDESCRIPTION":"This test is described by...",
    //     "IDSKU" :1
    // }

    // testModifyTestDescriptor(1, new_test_descriptor, 200);

    // testgetTestDescriptors(200, {"ID":1, "NAME":"test descriptor 1 UPDATED",
    // "PROCEDUREDESCRIPTION":"This test is described by...",
    // "IDSKU" :1 });

    // testDeleteTestDescriptor(1, 204);

    // testgetTestDescriptors(200, []);

    // let another_test_descriptor = {
    //     "NAME":"test descriptor 2 ",
    //     "PROCEDUREDESCRIPTION":"This test is described by...",
    //     "IDSKU" :2
    // }

    // newTestDescriptor(201, another_test_descriptor);

    // testgetTestDescriptors(200, {"ID":2, "NAME":"test descriptor 2 ", "PROCEDUREDESCRIPTION":"This test is described by...","IDSKU" :2 });

});


function newTestDescriptor(expectedHTTPStatus, test_descriptor) {
    
    it('POST /api/testDescriptor', function (done) {
        if (test_descriptor !== {}) {  // TO-DO : call the Body Validation function
            agent.post("/api/testResults").send(test_descriptor).then((res) => {
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

function testGetTestResults(expectedHTTPstatus, rfid,  expectedData) {
    it('GET /api/skuitems/:rfid/testResults', async function() {
        await agent.get('/api/skuitems/'+ rfid + '/testResults')
                    .then(function(res) {
                        res.should.have.status(expectedHTTPstatus);
                        if(Object.keys(expectedData).length !== 0 && expectedHTTPstatus===200){
                            for (let i = 0; i < Object.keys(res.body).length; i++) {
                                res.body[i].ID.should.equal(expectedData.ID);
                                res.body[i].NAME.should.equal(expectedData.NAME);
                                res.body[i].PROCEDUREDESCRIPTION.should.equal(expectedData.PROCEDUREDESCRIPTION);
                                res.body[i].IDSKU.should.equal(expectedData.IDSKU);
                            }

                        
                        } else {
                            res.body.should.equal(expectedData);
                        }
                        
                    });
    });
}





function testModifyTestDescriptor(id,expectedData, expectedHTTPStatus) {
    it('PUT /api/testDescriptor/:id', async function() {
        await agent.put('/api/testDescriptor/'+id)
            .send(expectedData)
            .then(function(res) {
                res.should.have.status(expectedHTTPStatus);
            });
    });
}


function testDeleteTestDescriptor(id, expectedHTTPStatus) {
    it('DELETE /api/testDescriptor/:id', async function() {
        await agent.delete('/api/testDescriptor/'+id)
                    .then(function(res) {
                        res.should.have.status(expectedHTTPStatus);
                    })
    });
}