const {get_test_descriptors_DB } = require('./Test_Descriptor_DAO');
const { empty_body_check } = require('../Position/utils');


// GET /api/positions
function get_test_descriptors(req,res) {
    empty_body_check(req.body) ? get_test_descriptors_DB().then((test_descriptors) => {
        res.status(200).json(test_descriptors);
    }).catch((error) => res.status(500).json(error)) : res.status(500).json("Body must be empty!");
}

module.exports = {get_test_descriptors}