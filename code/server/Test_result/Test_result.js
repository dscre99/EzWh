const { isEmpty, isAllowed, isBodyNotEmpty } = require('../utils/utils');
const { get_test_results_DB, post_test_result_DB, get_test_result_with_id_from_rfid_DB, put_test_result_with_id_from_rfid_DB, delete_test_result_with_id_from_rfid_DB } = require('./Test_result_DAO');

let loggedUser = false;

// GET /api/skuitems/:rfid/testResults
function get_test_results(req,res) {

    if(!isAllowed(loggedUser)) {
        res.status(401).json("You are not allowed to see the test results!");
        return;
    }

    if(!isEmpty(req.body)) {
        res.status(503).json("Body must be empty!");
        return;
    }


    get_test_results_DB(req.params.rfid).then((test_results) => {
        res.status(200).json(test_results);
    }).catch((error) => res.status(500).json(error));
}

// GET /api/skuitems/:rfid/testResults/:id
function get_test_result_with_id_from_rfid(req,res) {
    
    if(!isAllowed(loggedUser)) {
        res.status(401).json("You are not allowed!");
        return;
    }
    if(!isEmpty(req.body)) {
        res.status(503).json("Body must be empty!");
        return;
    }
    
    get_test_result_with_id_from_rfid_DB(req.params.id, req.params.rfid).then((test_result) => {
        res.status(200).json(test_result);
    }).catch((error) => res.status(404).json(error));
}

// // POST /api/skuitems/testResult
function post_test_result(req, res) {
    
    if(!isAllowed(loggedUser)) {
        res.status(401).json("You are not allowed!");
        return;
    }
    if(isEmpty(req.body)) {
        res.status(422).json("Body is empty!");
        return;
    }

    post_test_result_DB(req.body).then((test_result) => {
        res.status(200).json(test_result);
    }).catch((error) => res.status(500).json(error))
}

// // PUT /api/skuitems/:rfid/testResult/:id
function put_test_result_with_id_from_rfid(req, res) {
    
    if(!isAllowed(loggedUser)) {
        res.status(401).json("You are not allowed!");
        return;
    }
    if(isEmpty(req.body)) {
        res.status(422).json("Body is empty!");
        return;
    }
    
    put_test_result_with_id_from_rfid_DB(req.params.id, req.params.rfid, req.body).then(() => {
        res.status(200).json("Test Result updated!");
    }).catch((error) => res.status(500).json(error));
}

// DELETE /api/skuitems/:rfid/testResult/:id
function delete_test_result_with_id_from_rfid(req, res) {

    if(!isAllowed(loggedUser)) {
        res.status(401).json("You are not allowed!");
        return;
    }
    if(!isEmpty(req.body)) {
        res.status(503).json("Body must be empty!");
        return;
    }

    delete_test_result_with_id_from_rfid_DB(req.params.id, req.params.rfid).then(() => {
        res.status(200).json(`Test Result with id=${req.params.id} has been deleted!`);
    }).catch((error) => res.status(500).json(error));
}

//module.exports = {get_test_results, get_test_result_with_id_from_rfid, post_test_result, put_test_result_with_id_from_rfid, delete_test_result_with_id_from_rfid}

module.exports = {get_test_results, get_test_result_with_id_from_rfid, post_test_result, put_test_result_with_id_from_rfid, delete_test_result_with_id_from_rfid}