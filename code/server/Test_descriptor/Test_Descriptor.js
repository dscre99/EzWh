const { isEmpty, isAllowed } = require('../utils/utils');

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
            res.status(401).json("You are not allowed to see the Test Descriptors!");
            return;
        }

        if(!isEmpty(req.body)) {
            res.status(503).json("Body must be empty!");
            return;
        }
        
        this.#dao.get_test_descriptors_DB().then((test_descriptors) => {
            res.status(200).json(test_descriptors);
        }).catch((error) => res.status(500).json(error));
    }

    // GET /api/testDescriptors/:id
    get_test_descriptor_by_ID = async(req,res) => {
        if(!isAllowed(this.#loggedUser)) {
            res.status(401).json("You are not allowed!");
            return;
        }

        if(!isEmpty(req.body)) {
            res.status(503).json("Body must be empty!");
            return;
        }

        if(req.params.id === undefined) {
            res.status(422).json("Missing id parameter");
        }
        
        this.#dao.get_test_descriptor_by_ID_DB(req.params.id).then((test_descriptor) => {
            res.status(200).json(test_descriptor);
        }).catch((error) => res.status(404).json(error));
    }

    // POST /api/testDescriptor
    post_test_descriptor = async(req, res) => {
        
        if(!isAllowed(this.#loggedUser)) {
            res.status(401).json("You are not allowed!");
            return;
        }

        if(isEmpty(req.body)) {
            res.status(422).json("Body is empty!");
            return;
        }
        
        this.#dao.post_test_descriptor_DB(req.body).then((test_descriptor) => {
            res.status(200).json(test_descriptor);
        }).catch((error) => res.status(500).json(error))
    }

    // PUT /api/testDescriptor/:id
    put_test_descriptor_by_ID = async(req, res) => {
        
        if(!isAllowed(this.#loggedUser)) {
            res.status(401).json("You are not allowed!");
            return;
        }

        if(isEmpty(req.body)) {
            res.status(422).json("Body is empty!");
            return;
        }
        
        
        this.#dao.put_test_descriptor_by_ID_DB(req.params.id, req.body).then(() => {
            res.status(200).json("Test Descriptor updated!");
        }).catch((error) => res.status(500).json(error));
    }

    // DELETE /api/testDescriptor/:id
    delete_test_descriptor_by_ID = async(req, res) => {
        
        
        if(!isAllowed(this.#loggedUser)) {
            res.status(401).json("You are not allowed!");
            return;
        }

        if(!isEmpty(req.body)) {
            res.status(503).json("Body must be empty!");
            return;
        }
        
        this.#dao.delete_test_descriptor_by_ID_DB(req.params.id).then(() => {
            res.status(200).json(`Test Descriptor with id=${req.params.id} has been deleted!`);
        }).catch((error) => res.status(500).json(error));
    }

}

module.exports = TestDescriptorService;