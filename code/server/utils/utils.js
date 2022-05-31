function isEmpty(body) {
    if(Object.keys(body).length == 0) return 1;
    return 0;
}

function isAllowed(loggedUser) {
    return loggedUser;
}

function checkPositionUpdate(body) {
    if(Object.keys(body).length !== 7) return 0;
    return 1;
}


function positionBodyLength(body, req_type) {

    switch(req_type) {
        case "post":
            if(Object.keys(body).length !== 8) return 0;
            break;
        case "put":
            if(Object.keys(body).length !== 7) return 0;
            break;
        default:
            return 0;
    }

    const regex = new RegExp(/^[0-9]*$/);

    const {positionID, aisleID, row, col, maxWeight, maxVolume} = body; 
    if ((regex.test(positionID) && positionID.length === 12)) {
        return 1;
    } 

    return 0;
    
}

function validate(body) {
    
    const regex = new RegExp(/^[0-9]*$/);
    const {newAisleID, newRow, newCol, newMaxWeight, newMaxVolume, newOccupiedWeight, newOccupiedVolume} = body;
    
    if(Object.keys(body).length !== 7) {
        return 0;
    } 

    if(Math.sign(newMaxWeight) > 0 && Math.sign(newMaxVolume) > 0 && Math.sign(newOccupiedWeight) > 0 && Math.sign(newOccupiedVolume) > 0) return 1;

    return 0;
    

}

function validateTestDescData(body) {
    if(Object.keys(body).length !== 3) return 0;

    const {name, procedureDescription, idSKU} = body;

    if(name!==null && procedureDescription!==null && idSKU!==null) return 1;

    return 0;

}






function validatePositionID(positionID) {
    const regex = new RegExp(/^[0-9]*$/);

    if(regex.test(positionID) === true && positionID.length === 12) {
        return 1;
    }

    return 0;
}


module.exports = {isEmpty, isAllowed, positionBodyLength, validatePositionID, checkPositionUpdate, validate, validateTestDescData};