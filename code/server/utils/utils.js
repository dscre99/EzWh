function isEmpty(body) {
    if(Object.keys(body).length == 0) return 1;
    return 0;
}

function isAllowed(loggedUser) {
    return loggedUser;
}


function positionBodyLength(body, req_type) {

    switch(req_type) {
        case "post":
            if(Object.keys(body).length !== 6) return 0;
            break;
        case "put":
            if(Object.keys(body).length !== 6) return 0;
            break;
        default:
            return 0;
    }

    return 1;
    
}

function validatePositionBody(body, req_type) {
    
    let v = 0;
    const regex = new RegExp(/^[0-9]*$/);
    
    switch(req_type) {
        case "post":
            const {positionID, aisleID, row, col, maxWeight, maxVolume} = body;    
            (regex.test(positionID) && positionID.length === 12) ? v++ : v;
            (regex.test(aisleID) && aisleID.length === 4) ? v++ : v;
            (regex.test(row) && row.length <= 6) ? v++ : v;
            (regex.test(col) && row.length <= 6) ? v++ : v;
            (regex.test(maxWeight) && row.length <= 6) ? v++ : v;
            (regex.test(maxVolume) && row.length <= 6) ? v++ : v;

            if(v === 6) return 1;
            break;
        case "put":
            const {newAisleID, newRow, newCol, newMaxWeight, newMaxVolume, newOccupiedWeight, newOccupiedVolume} = body;
            (regex.test(newAisleID) && newAisleID.length === 4) ? v++ : v;
            (regex.test(newRow) && newRow.length === 4) ? v++ : v;
            (regex.test(newCol) && newCol.length <= 6) ? v++ : v;
            (regex.test(newMaxWeight) && newMaxWeight.length <= 6) ? v++ : v;
            (regex.test(newMaxVolume) && newMaxVolume.length <= 6) ? v++ : v;
            (regex.test(newOccupiedWeight) && newOccupiedWeight.length <= 6) ? v++ : v;
            (regex.test(newOccupiedVolume) && newOccupiedVolume.length <= 6) ? v++ : v;

            if(v === 6) return 1;
            break;
        default:
            return 0;

    }

    return 0;
}


function validatePositionID(body) {
    const regex = new RegExp(/^[0-9]*$/);

    if(regex.test(body.newPositionID) && id.length === 12) {
        return 1;
    }

    return 0;
}


module.exports = {isEmpty, isAllowed, positionBodyLength, validatePositionBody, validatePositionID};