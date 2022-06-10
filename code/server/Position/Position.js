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
            res.status(401).json("You are not allowed to see the positions!").end();
            return;
        }

        if(!isEmpty(req.body)) {
            res.status(503).json("Body must be empty!").end();
            return;
        }
        
        
        this.#dao.getPositions().then((positions) => {            
            return res.status(200).json(positions).end();
        }).catch((error) => res.status(error).json("Error!").end());
    }


    // POST /api/position
    post_position = async(req, res) => {

        if(!isAllowed(this.#loggedUser)) {
            res.status(401).json("You are not allowed to see the positions!").end();
            return;
        }

        if(isEmpty(req.body) ) {
            res.status(422).json("Body is empty!").end();
            return;
        }

        if(positionBodyLength(req.body, "post")) {
            this.#dao.storePosition(req.body).then((position) => {
                return res.status(201).json(position).end();
            }).catch((error) => res.status(error).json("Error!").end())
        } else {
            res.status(422).json("Validation of request body failed!").end();
            return;
        }
    }

    // PUT /api/position/:positionID
    put_position_by_ID = async(req, res) => {

        if(!isAllowed(this.#loggedUser)) {
            res.status(401).json("You are not allowed to see the positions!").end();
            return;
        }

        if(isEmpty(req.body)) {
            res.status(422).json("Body is empty!").end();
            return;
        }

        if(validate(req.body)) {
            this.#dao.put_position_by_ID_DB(req.params.positionID, req.body).then(() => {
                return res.status(200).json("Position updated!").end();
            }).catch((error) => res.status(error).json(error).end());
        } else {
            res.status(422).json("Validation of request body failed!").end();
            return;
        }

    }

    // PUT /api/position/:positionID
    put_positionID_by_ID = async(req, res) => {

        if(!isAllowed(this.#loggedUser)) {
            res.status(401).json("You are not allowed to see the positions!").end();
            return;
        }

        if(isEmpty(req.body)) {
            res.status(422).json("Body must not be empty!").end();
            return;
        }

        

        if(req.body.hasOwnProperty("newPositionID") && validatePositionID(req.params.positionID)) {
            this.#dao.put_positionID_by_ID_DB(req.body, req.params.positionID).then(() => {
                return res.status(200).json("PositionID updated!").end();
            }).catch((error) => res.status(error).json(error).end());
        } else {
            res.status(422).json("Validation of request body failed!").end();
            return;
        }

    }

    // DELETE /api/position/:positionID
    delete_position_by_ID = async(req, res) => {

        if(!isAllowed(this.#loggedUser)) {
            res.status(401).json("You are not allowed to see the positions!").end();
            return;
        }

        if(!isEmpty(req.body)) {
            res.status(503).json("Body must be empty!").end();
            return;
        }

        if(validatePositionID(req.params.positionID)) {
            this.#dao.delete_position_by_ID_DB(req.params.positionID).then(() => {
                return res.status(204).json(`Position with positionID=${req.params.positionID} has been deleted!`).end();
            }).catch((error) => res.status(error).json(error).end());
        } else {
            res.status(422).json("Validation of requested positionID failed!").end();
            return;
        }
    }

    deleteAllPositions = async(req, res) => {
        this.#dao.delete_all_positions().then(() => {
            return res.status(204).json("Deleted All Positions!").end();
        }).catch((error) => res.status(503).json(error).end());
    }
        
}

module.exports = PositionService;
   


