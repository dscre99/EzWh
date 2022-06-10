const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

const app = require('../server');
let agent = chai.request.agent(app);
let dao = require('../Test_result/Test_result_DAO');
let db = new dao();

function newTestResult(expectedHTTPStatus, test_result) {
    
    it('POST /api/skuitems/testResult', async function() {
        if (test_result !== {}) {  // TO-DO : call the Body Validation function
            await agent.post("/api/skuitems/testResult").send(test_result).then((res) => {
                res.should.have.status(expectedHTTPStatus);
            })
        } else {
            await agent.post('/api/skuitems/testResult') // Body is empty or incorrect
                .then(function (res) {
                    res.should.have.status(expectedHTTPStatus);
                    
                })
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
                                res.body[i].ID.should.equal(expectedData.id);
                                res.body[i].RFID.should.equal(expectedData.rfid);
                                res.body[i].DATE.should.equal(expectedData.Date);
                                res.body[i].RESULT.should.equal(expectedData.Result);
                                res.body[i].IDTESTDESCRIPTOR.should.equal(expectedData.idTestDescriptor);
                            }

                        
                        } else {
                            res.body.should.equal(expectedData);
                        }
                        
                    });
    });
}





function testModifyTestResult(id, rfid, newData, expectedHTTPStatus) {
    it('PUT /api/skuitems/:rfid/testResult/:id', async function() {
        await agent.put('/api/skuitems/' + rfid + '/testResult/' +id)
            .send(newData)
            .then(function (res) {
                res.should.have.status(expectedHTTPStatus);
            });
    });
}


function testDeleteTestResult(id, rfid, expectedHTTPStatus) {
    it('DELETE /api/skuitems/:rfid/testResult/:id', async function() {
        await agent.delete('/api/skuitems/' + rfid + '/testResult/' + id)
            .then(function (res) {
                        res.should.have.status(expectedHTTPStatus);
                    })
    });
}

describe('Test Test Result A.P.I.s', () => {

    before(async () => {
        await db.dropTestResultTable();
        await db.newTestResultTable();
    });

    
    testGetTestResults(404,"1234","The requested RFID doesn't exist!");

    let test_result = {
        "rfid":"12345678901234567890123456789016",
        "Date":"2021/11/28",
        "Result":"true",
        "idTestDescriptor":9
    }

    newTestResult(201, test_result);

    testGetTestResults(404, "32345678901234567890123456789017", "The requested RFID doesn't exist!");
    testGetTestResults(200, "12345678901234567890123456789016", {"id":1, "rfid":"12345678901234567890123456789016",
    "Date":"2021/11/28",
    "Result":"true",
    "idTestDescriptor":9});
    

    let newData = {"idTestDescriptor":3, "Date":"2021/12/11", "Result":"false"};
    
    testModifyTestResult(1, "12345678901234567890123456789016", newData, 200);

    testDeleteTestResult(1, "testIncorrectRFID", 422);

    testDeleteTestResult(1, "12345678901234567890123456789016", 204);

    testGetTestResults(200, "12345678901234567890123456789016", [{}]);

  

});


