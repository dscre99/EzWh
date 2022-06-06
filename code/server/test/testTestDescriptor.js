const chai = require('chai');
const chaiHttp = require('chai-http');
const { get } = require('express/lib/request');
chai.use(chaiHttp);
chai.should();

const app = require('../server');
const { isEmpty, validateTestDescData } = require('../utils/utils');
let agent = chai.request.agent(app);
let dao = require('../Test_descriptor/Test_Descriptor_DAO');
let db = new dao();


describe('Test Test Descriptor A.P.I.s', () => {

    before(async () => {
        await db.dropTestDescriptorTable();
        await db.newTestDescriptorTable();
        //await agent.delete('/api/deleteAll');
    });


    testgetTestDescriptors(200, []);


    let test_descriptor = {
        "name": "test descriptor 1",
        "procedureDescription": "This test is described by...",
        "idSKU": 5
    }

    let incorrect_test_descriptor = {};

    newTestDescriptor(404, test_descriptor);
    newTestDescriptor(422, incorrect_test_descriptor);


    testgetTestDescriptors(200, []);

    let new_test_descriptor = {
        "name": "test descriptor 1",
        "procedureDescription": "This test is described by...",
        "idSKU": 1
    }

    newTestDescriptor(201, new_test_descriptor);

    testModifyTestDescriptor(1, {
        "newName": "test descriptor 1 UPDATED",
        "newProcedureDescription": "This test is described by...",
        "newIdSKU": 1
    }, 200);

    let return_data = {
        id: 1,
        name: 'test descriptor 1 UPDATED',
        procedureDescription: 'This test is described by...',
        idSKU: 1
      };
    testgetTestDescriptors(200,  [return_data]);

    testDeleteTestDescriptor(1, 204);

    testgetTestDescriptors(200, []);

    let another_test_descriptor = {
        "name": "test descriptor 2 ",
        "procedureDescription": "This test is described by...",
        "idSKU": 3
    }

    newTestDescriptor(404, another_test_descriptor);

    testgetTestDescriptors(200,  []);

});


function newTestDescriptor(expectedHTTPStatus, test_descriptor) {

    it('POST /api/testDescriptor', function (done) {
        if (validateTestDescData(test_descriptor)) {  // TO-DO : call the Body Validation function
            agent.post("/api/testDescriptor").send(test_descriptor).then((res) => {
                res.should.have.status(expectedHTTPStatus);
                done();
            }).catch(err=>done(err))
        } else {
            agent.post('/api/testDescriptor') // Body is empty or incorrect
                .then(function (res) {
                    res.should.have.status(expectedHTTPStatus);
                    done();
                }).catch(err=>done(err));
        }

    });
}

function testgetTestDescriptors(expectedHTTPstatus, expectedData) {
    it('GET /api/testDescriptors', async function () {
        await agent.get('/api/testDescriptors')
            .then(function (res) {
                res.should.have.status(expectedHTTPstatus);
                if (Object.keys(res.body).length !== 0) { 
                    for (let i = 0; i < Object.keys(res.body).length; i++) {
                        res.body[i].id.should.equal(expectedData[0].id);
                        res.body[i].name.should.equal(expectedData[0].name);
                        res.body[i].procedureDescription.should.equal(expectedData[0].procedureDescription);
                        res.body[i].idSKU.should.equal(expectedData[0].idSKU);
                    }


                } else {
                    res.body.length.should.equal(Object.keys(expectedData).length);
                }

            });
    });
}





function testModifyTestDescriptor(id, expectedData, expectedHTTPStatus) {
    it('PUT /api/testDescriptor/:id', async function () {
        await agent.put('/api/testDescriptor/' + id)
            .send(expectedData)
            .then(function (res) {
                res.should.have.status(expectedHTTPStatus);
            });
    });
}


function testDeleteTestDescriptor(id, expectedHTTPStatus) {
    it('DELETE /api/testDescriptor/:id', async function () {
        await agent.delete('/api/testDescriptor/' + id)
            .then(function (res) {
                res.should.have.status(expectedHTTPStatus);
            })
    });
}
