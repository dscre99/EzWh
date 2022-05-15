const {getPositions, storePosition, put_position_by_ID_DB, put_positionID_by_ID_DB, delete_position_by_ID_DB} = require('./Position_DAO');
const { isBodyEmpty, isAllowed } = require('../utils/utils');


// GET /api/positions
function get_positions(req,res) {
    !(isBodyEmpty(req.body)) ? res.status(500).json("Body must be empty!") : isAllowed() ? getPositions().then((positions) => {
        res.status(200).json(positions);
    }).catch((error) => res.status(500).json("Error!")) : res.status(401).json("You are not allowed to see the positions!");
}

// POST /api/position
function post_position(req, res) {
    isBodyEmpty(req.body) ? res.status(500).json("Body is empty!") : storePosition().then((position) => {
        res.status(200).json(position);
    }).catch((error) => res.status(500).json(error))
}

// PUT /api/position/:positionID
function put_position_by_ID(req, res) {
    isBodyEmpty(req.body) ? res.status(500).json("Body is empty!") : put_position_by_ID_DB(req.params.positionID, req.body).then(() => {
        res.status(200).json("Position updated!");
    }).catch((error) => res.status(500).json(error));
}

// PUT /api/position/:positionID
function put_positionID_by_ID(req, res) {
    isBodyEmpty(req.body) ? res.status(500).json("Body is empty!") : put_positionID_by_ID_DB(req.params.positionID, req.body).then(() => {
        res.status(200).json("PositionID updated!");
    }).catch((error) => res.status(500).json(error));
}

// DELETE /api/position/:positionID
function delete_position_by_ID(req, res) {
    delete_position_by_ID_DB(req.params.positionID).then(() => {
        res.status(200).json(`Position with positionID=${req.params.positionID} has been deleted!`);
    }).catch((error) => res.status(500).json(error));
}


module.exports = {get_positions, post_position, put_position_by_ID, put_positionID_by_ID, delete_position_by_ID};


