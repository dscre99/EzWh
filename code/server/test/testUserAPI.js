const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

const app = require('../server');
let agent = chai.request.agent(app);

function testHelloWorldAPI() {
    describe('mocha test', function() {
        it('getting hello world!', async function() {
            await agent.get('/api/hello').then(function(res) {
                res.should.have.status(200);
                res.body.message.should.equal('Hello world!');
            });
        });
    });
}

function testGETuserinfo(id, username, name, surname, type, expectedHTTPstatus) {
    describe('get /api/userinfo', function() {
        it('get /api/userinfo', async function() {
            await agent.get('/api/userinfo').then(function(res) {
                res.should.have.status(expectedHTTPstatus);
                res.body[0].id.should.equal(id);
                res.body[0].username.should.equal(username);
                res.body[0].name.should.equal(name);
                res.body[0].surname.should.equal(surname);
                res.body[0].type.should.equal(type);
            });
        });
    });
}

testHelloWorldAPI();
testGETuserinfo(1, 'dscre@ezwh.com', 'Simone', 'Crescenzo', 'manager', 200);