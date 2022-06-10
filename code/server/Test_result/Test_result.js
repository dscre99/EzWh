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

        if(Number.parseInt(req.params.rfid) >= 0){
            if(!isAllowed(this.#loggedUser)) {
                res.status(401).json("You are not allowed to see the test results!").end();
                return;
            }
    
            if(!isEmpty(req.body)) {
                res.status(503).json("Body must be empty!").end();
                return;
            }
    
    
            this.#dao.get_test_results_DB(req.params.rfid).then((test_results) => {
                res.status(200).json(test_results);
            }).catch((error) => res.status(404).json(error).end());
        }else{
            res.status(422).json("Unprocessable entity").end();
            return;
        }
        
    }

    // GET /api/skuitems/:rfid/testResults/:id
    get_test_result_with_id_from_rfid = async(req,res) => {
        
        if(!isAllowed(this.#loggedUser)) {
            res.status(401).json("You are not allowed!").end();
            return;
        }
        if(!isEmpty(req.body)) {
            res.status(503).json("Body must be empty!").end();
            return;
        }

        if(req.params.rfid === 'null') {
            res.status(422).json("Invalid rfid").end();
            return;
        } 
        
        this.#dao.get_test_result_with_id_from_rfid_DB(req.params.id, req.params.rfid).then((test_result) => {
            res.status(200).json(test_result).end();
        }).catch((error) => res.status(404).json(error).end());
    }

    // // POST /api/skuitems/testResult
    post_test_result = async(req, res) => {
        if(req.body.rfid.length != 32){
            res.status(422).json("Bad RFID").end();
            return;
        }
        if(!isAllowed(this.#loggedUser)) {
            res.status(401).json("You are not allowed!").end();
            return;
        }
        if(isEmpty(req.body)) {
            res.status(422).json("Body is empty!").end();
            return;
        }

        this.#dao.post_test_result_DB(req.body).then((test_result) => {
            res.status(201).json(test_result).end();
        }).catch((error) => res.status(error).json(error).end())
    }

    // // PUT /api/skuitems/:rfid/testResult/:id
    put_test_result_with_id_from_rfid = async(req, res) => {
        
        if(Number.parseInt(req.params.rfid) >= 0){
            if(!isAllowed(this.#loggedUser)) {
                res.status(401).json("You are not allowed!").end();
                return;
            }
            if(isEmpty(req.body)) {
                res.status(422).json("Body is empty!").end();
                return;
            }
            
            this.#dao.put_test_result_with_id_from_rfid_DB(req.params.id, req.params.rfid, req.body).then(() => {
                res.status(200).json("Test Result updated!");
            }).catch((error) => res.status(404).json(error).end());
        }else{
            res.status(422).json("Unprocessable entity").end();
            return;
        }
        
    }

    // DELETE /api/skuitems/:rfid/testResult/:id
    delete_test_result_with_id_from_rfid = async(req, res) => {

        if(!isAllowed(this.#loggedUser)) {
            res.status(401).json("You are not allowed!").end();
            return;
        }
        if(!isEmpty(req.body)) {
            res.status(503).json("Body must be empty!").end();
            return;
        }

        this.#dao.delete_test_result_with_id_from_rfid_DB(req.params.id, req.params.rfid).then(() => {
            res.status(204).json(`Test Result with id=${req.params.id} has been deleted!`).end();
        }).catch((error) => res.status(422).json(error).end());
    }
}

module.exports = TestResultService;








