const { isEmpty, isAllowed } = require('../utils/utils');


class TestResultService {
    #dao;
    #loggedUser;

    constructor(dao) {
        this.#dao = dao;
        this.#loggedUser = true;
    }

    set_logged_user = ((logged) => {
        this.#loggedUser = logged;
    })

    get_permission = (() => {
        return this.#loggedUser;
    })

    // GET /api/skuitems/:rfid/testResults
    get_test_results = async(req,res) => {

        if(!isAllowed(this.#loggedUser)) {
            res.status(401).json("You are not allowed to see the test results!");
            return;
        }

        if(!isEmpty(req.body)) {
            res.status(503).json("Body must be empty!");
            return;
        }


        this.#dao.get_test_results_DB(req.params.rfid).then((test_results) => {
            res.status(200).json(test_results);
        }).catch((error) => res.status(500).json(error));
    }

    // GET /api/skuitems/:rfid/testResults/:id
    get_test_result_with_id_from_rfid = async(req,res) => {
        
        if(!isAllowed(this.#loggedUser)) {
            res.status(401).json("You are not allowed!");
            return;
        }
        if(!isEmpty(req.body)) {
            res.status(503).json("Body must be empty!");
            return;
        }
        
        this.#dao.get_test_result_with_id_from_rfid_DB(req.params.id, req.params.rfid).then((test_result) => {
            res.status(200).json(test_result);
        }).catch((error) => res.status(404).json(error));
    }

    // // POST /api/skuitems/testResult
    post_test_result = async(req, res) => {
        
        if(!isAllowed(this.#loggedUser)) {
            res.status(401).json("You are not allowed!");
            return;
        }
        if(isEmpty(req.body)) {
            res.status(422).json("Body is empty!");
            return;
        }

        this.#dao.post_test_result_DB(req.body).then((test_result) => {
            res.status(200).json(test_result);
        }).catch((error) => res.status(500).json(error))
    }

    // // PUT /api/skuitems/:rfid/testResult/:id
    put_test_result_with_id_from_rfid = async(req, res) => {
        
        if(!isAllowed(this.#loggedUser)) {
            res.status(401).json("You are not allowed!");
            return;
        }
        if(isEmpty(req.body)) {
            res.status(422).json("Body is empty!");
            return;
        }
        
        this.#dao.put_test_result_with_id_from_rfid_DB(req.params.id, req.params.rfid, req.body).then(() => {
            res.status(200).json("Test Result updated!");
        }).catch((error) => res.status(500).json(error));
    }

    // DELETE /api/skuitems/:rfid/testResult/:id
    delete_test_result_with_id_from_rfid = async(req, res) => {

        if(!isAllowed(this.#loggedUser)) {
            res.status(401).json("You are not allowed!");
            return;
        }
        if(!isEmpty(req.body)) {
            res.status(503).json("Body must be empty!");
            return;
        }

        this.#dao.delete_test_result_with_id_from_rfid_DB(req.params.id, req.params.rfid).then(() => {
            res.status(200).json(`Test Result with id=${req.params.id} has been deleted!`);
        }).catch((error) => res.status(500).json(error));
    }
}

module.exports = TestResultService;








