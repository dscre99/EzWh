const { body } = require('express-validator');
const { isEmpty, isAllowed, validateTestDescData } = require('../utils/utils');

class TestDescriptorService {
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


    // GET /api/testDescriptors/
    get_test_descriptors = async(req,res) => {
        
        if(!isAllowed(this.#loggedUser)) {
            res.status(401).json("You are not allowed to see the Test Descriptors!").end();
            return;
        }

        if(!isEmpty(req.body)) {
            res.status(503).json("Body must be empty!").end();
            return;
        }

        this.#dao.get_test_descriptors_DB().then((test_descriptors) => {
            res.status(200).json(test_descriptors).end();
        }).catch((error) => res.status(error).json(error).end());
    }

    // GET /api/testDescriptors/:id
    get_test_descriptor_by_ID = async(req,res) => {
        
        if(!isAllowed(this.#loggedUser)) {
            res.status(401).json("You are not allowed!").end();
            return;
        }

        if(!isEmpty(req.body)) {
            res.status(422).json("Body must be empty!").end();
            return;
        }

        if(req.params.id === 'null') {
            res.status(422).json("Null id parameter").end();
            return;
        }

        this.#dao.get_test_descriptor_by_ID_DB(req.params.id).then((test_descriptor) => {
            res.status(200).json(test_descriptor).end();
        }).catch((error) => res.status(404).json(error).end());
    }

    // POST /api/testDescriptor
    post_test_descriptor = async(req, res) => {
        
        if(!isAllowed(this.#loggedUser)) {
            res.status(401).json("You are not allowed!").end();
            return;
        }

        if(isEmpty(req.body)) {
            res.status(422).json("Body is empty!").end();
            return;
        }

        
        if(validateTestDescData(req.body)) {
            this.#dao.post_test_descriptor_DB(req.body).then((test_descriptor) => {
                res.status(201).json(test_descriptor).end();
            }).catch((error) => res.status(error).json(error).end())
        } else {
            res.status(422).json("Validation of request body failed!");
        }
        
    }

    // PUT /api/testDescriptor/:id
    put_test_descriptor_by_ID = async(req, res) => {
        
        if(!isAllowed(this.#loggedUser)) {
            res.status(401).json("You are not allowed!").end();
            return;
        }

        if(isEmpty(req.body)) {
            res.status(422).json("Body is empty!").end();
            return;
        }
        
        
        this.#dao.put_test_descriptor_by_ID_DB(req.params.id, req.body).then(() => {
            res.status(200).json("Test Descriptor updated!").end();
        }).catch((error) => res.status(error).json(error).end());
    }

    // DELETE /api/testDescriptor/:id
    delete_test_descriptor_by_ID = async(req, res) => {
        
        
        if(!isAllowed(this.#loggedUser)) {
            res.status(401).json("You are not allowed!").end();
            return;
        }

        if(!isEmpty(req.body)) {
            res.status(503).json("Body must be empty!").end();
            return;
        }

        if(req.params.id === 'undefined') {
            res.status(422).json("Null id parameter").end();
            return;
        }
        
        this.#dao.delete_test_descriptor_by_ID_DB(req.params.id).then(() => {
            res.status(204).json(`Test Descriptor with id=${req.params.id} has been deleted!`).end();
        }).catch((error) => res.status(error).json(error).end());
    }


    deleteAllTestDescriptors = async(req, res) => {
        this.#dao.delete_all_test_descriptors().then(() => {
            res.status(204).json("Deleted All Test Descriptors!").end();
        }).catch((error) => res.status(503).json(error).end());
    }

}

module.exports = TestDescriptorService;