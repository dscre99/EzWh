const {get_test_descriptors_DB, get_test_descriptor_by_ID_DB, post_test_descriptor_DB, put_test_descriptor_by_ID_DB, delete_test_descriptor_by_ID_DB } = require('./Test_Descriptor_DAO');
const { isBodyEmpty } = require('../utils/utils');


// GET /api/testDescriptors/
function get_test_descriptors(req,res) {
    isBodyEmpty(req.body) ? get_test_descriptors_DB().then((test_descriptors) => {
        res.status(200).json(test_descriptors);
    }).catch((error) => res.status(500).json(error)) : res.status(500).json("Body must be empty!");
}

// GET /api/testDescriptors/:id
function get_test_descriptor_by_ID(req,res) {
    (isBodyEmpty(req.body) && req.params.id != undefined) ? get_test_descriptor_by_ID_DB(req.params.id).then((test_descriptor) => {
        res.status(200).json(test_descriptor);
    }).catch((error) => res.status(404).json(error)) : res.status(500).json("Body must be empty!");
}

// POST /api/testDescriptor
function post_test_descriptor(req, res) {
    isBodyEmpty(req.body) ? res.status(500).json("Body is empty!") : post_test_descriptor_DB(req.body).then((test_descriptor) => {
        res.status(200).json(test_descriptor);
    }).catch((error) => res.status(500).json(error))
}

// PUT /api/testDescriptor/:id
function put_test_descriptor_by_ID(req, res) {
    isBodyEmpty(req.body) ? res.status(500).json("Body is empty!") : put_test_descriptor_by_ID_DB(req.params.id, req.body).then(() => {
        res.status(200).json("Test Descriptor updated!");
    }).catch((error) => res.status(500).json(error));
}

// DELETE /api/testDescriptor/:id
function delete_test_descriptor_by_ID(req, res) {
    delete_test_descriptor_by_ID_DB(req.params.id).then(() => {
        res.status(200).json(`Test Descriptor with id=${req.params.id} has been deleted!`);
    }).catch((error) => res.status(500).json(error));
}

module.exports = {get_test_descriptors, get_test_descriptor_by_ID, post_test_descriptor, put_test_descriptor_by_ID, delete_test_descriptor_by_ID}