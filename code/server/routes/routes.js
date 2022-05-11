const express = require('express');
const { get_positions, post_position, put_position_by_ID, put_positionID_by_ID, delete_position_by_ID } = require('../Position/Position');
const router = express.Router();

// POSITION routes
router.get('/positions', get_positions);
router.post('/position', post_position);
router.put('/position/:positionID', put_position_by_ID);
router.put('/position/:positionID/changeID', put_positionID_by_ID)
router.delete('/position/:positionID', delete_position_by_ID)

/**
 * TODO : Test Descriptor, Test Reult
*/

/***********************************************************************/



module.exports = router;