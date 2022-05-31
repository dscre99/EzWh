const { isAllowed, isEmpty, validatePositionBody, validatePositionID, positionBodyLength, validatePositionData, checkPositionUpdate, validateData, validate } = require("../utils/utils");

class PositionService {
    
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

    // GET /api/positions

    get_positions = async(req,res) => {
        
        if(!isAllowed(this.#loggedUser)) {
            res.status(401).json("You are not allowed to see the positions!");
            return;
        }

        if(!isEmpty(req.body)) {
            res.status(503).json("Body must be empty!");
            return;
        }
        
        
        this.#dao.getPositions().then((positions) => {            
            res.status(200).json(positions);
        }).catch((error) => res.status(error).json("Error!"));
    }


    // POST /api/position
    post_position = async(req, res) => {

        if(!isAllowed(this.#loggedUser)) {
            res.status(401).json("You are not allowed to see the positions!");
            return;
        }

        if(isEmpty(req.body) ) {
            res.status(422).json("Body is empty!");
            return;
        }

        if(positionBodyLength(req.body, "post")) {
            this.#dao.storePosition(req.body).then((position) => {
                res.status(201).json(position);
            }).catch((error) => res.status(error).json("Error!"))
        } else {
            res.status(422).json("Validation of request body failed!");
            return;
        }
    }

    // PUT /api/position/:positionID
    put_position_by_ID = async(req, res) => {

        if(!isAllowed(this.#loggedUser)) {
            res.status(401).json("You are not allowed to see the positions!");
            return;
        }

        if(isEmpty(req.body)) {
            res.status(422).json("Body is empty!");
            return;
        }

        if(validate(req.body)) {
            this.#dao.put_position_by_ID_DB(req.params.positionID, req.body).then(() => {
                res.status(200).json("Position updated!");
            }).catch((error) => res.status(error).json(error));
        } else {
            res.status(422).json("Validation of request body failed!");
            return;
        }

    }

    // PUT /api/position/:positionID
    put_positionID_by_ID = async(req, res) => {

        if(!isAllowed(this.#loggedUser)) {
            res.status(401).json("You are not allowed to see the positions!");
            return;
        }

        if(isEmpty(req.body)) {
            res.status(422).json("Body must not be empty!");
            return;
        }

        

        if(req.body.hasOwnProperty("newPositionID") && validatePositionID(req.params.positionID)) {
            this.#dao.put_positionID_by_ID_DB(req.params.positionID, req.body).then(() => {
                res.status(200).json("PositionID updated!");
            }).catch((error) => res.status(error).json(error));
        } else {
            res.status(422).json("Validation of request body failed!");
            return;
        }

    }

    // DELETE /api/position/:positionID
    delete_position_by_ID = async(req, res) => {

        if(!isAllowed(this.#loggedUser)) {
            res.status(401).json("You are not allowed to see the positions!");
            return;
        }

        if(!isEmpty(req.body)) {
            res.status(503).json("Body must be empty!");
            return;
        }

        if(validatePositionID(req.params.positionID)) {
            this.#dao.delete_position_by_ID_DB(req.params.positionID).then(() => {
                res.status(204).json(`Position with positionID=${req.params.positionID} has been deleted!`);
            }).catch((error) => res.status(error).json(error));
        } else {
            res.status(422).json("Validation of requested positionID failed!");
            return;
        }
    }

    deleteAllPositions = async(req, res) => {
        this.#dao.delete_all_positions().then(() => {
            res.status(204).json("Deleted All Positions!");
        }).catch((error) => res.status(503).json(error));
    }
        
}

module.exports = PositionService;
   


