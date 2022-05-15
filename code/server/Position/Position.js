const {getPositions, storePosition, put_position_by_ID_DB, put_positionID_by_ID_DB, delete_position_by_ID_DB} = require('./Position_DAO');
const { isAllowed, validatePositionBody, isBodyNotEmpty, positionBodyLength, validatePositionID } = require('../utils/utils');

let loggedUser = false;

// GET /api/positions
function get_positions(req,res) {
    isBodyNotEmpty(req.body) ? res.status(400).json("Body must be empty!") : isAllowed(loggedUser) ? getPositions().then((positions) => {
        res.status(200).json(positions);
    }).catch((error) => res.status(500).json("Error!")) : res.status(401).json("You are not allowed to see the positions!");
}

// POST /api/position
function post_position(req, res) {

    if(!isAllowed(loggedUser)) {
        res.status(422).json("You are not allowed to see the positions!");
        return;
    }
    if(!(isBodyNotEmpty(req.body))) {
        res.status(500).json("Body is empty!");
        return;
    }
    if(positionBodyLength(req.body, "post") && validatePositionBody(req.body, "post")) {
        storePosition(req.body).then((position) => {
            res.status(200).json(position);
        }).catch((error) => res.status(503).json("Error!"))
    } else {
        res.status(422).json("Validation of request body failed!");
        return;
    }
}

// PUT /api/position/:positionID
function put_position_by_ID(req, res) {

    if(!isAllowed(loggedUser)) {
        res.status(422).json("You are not allowed to see the positions!");
        return;
    }

    if(!(isBodyNotEmpty(req.body))) {
        res.status(500).json("Body is empty!");
        return;
    }

    if(positionBodyLength(req.body, "put") && validatePositionBody(req.body, "put")) {
        put_position_by_ID_DB(req.params.positionID, req.body).then(() => {
            res.status(200).json("Position updated!");
        }).catch((error) => res.status(503).json(error));
    } else {
        res.status(422).json("Validation of request body failed!");
        return;
    }

}

// PUT /api/position/:positionID
function put_positionID_by_ID(req, res) {

    if(!isAllowed(loggedUser)) {
        res.status(422).json("You are not allowed to see the positions!");
        return;
    }

    if(!(isBodyNotEmpty(req.body))) {
        res.status(500).json("Body is empty!");
        return;
    }

    if(Object.keys(body).length === 1 && validatePositionID(req.body)) {
        put_positionID_by_ID_DB(req.params.positionID, req.body).then(() => {
            res.status(200).json("PositionID updated!");
        }).catch((error) => res.status(503).json(error));
    } else {
        res.status(422).json("Validation of request body failed!");
        return;
    }

}

// DELETE /api/position/:positionID
function delete_position_by_ID(req, res) {

    if(!isAllowed(loggedUser)) {
        res.status(422).json("You are not allowed to see the positions!");
        return;
    }

    if(validatePositionID) {
        delete_position_by_ID_DB(req.params.positionID).then(() => {
            res.status(204).json(`Position with positionID=${req.params.positionID} has been deleted!`);
        }).catch((error) => res.status(503).json(error));
    } else {
        res.status(422).json("Validation of requested positionID failed!");
        return;
    }
}


module.exports = {get_positions, post_position, put_position_by_ID, put_positionID_by_ID, delete_position_by_ID};


