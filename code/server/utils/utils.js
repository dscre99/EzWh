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
            if(Object.keys(body).length !== 8) return 0;
            break;
        case "put":
            if(Object.keys(body).length !== 6) return 0;
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

function validatePositionData(position, req_type) {
    
    let v = 0;
    const regex = new RegExp(/^[0-9]*$/);
    
    switch(req_type) {
        case "post":
            const {positionID, aisleID, row, col, maxWeight, maxVolume} = position;  
            (regex.test(positionID) && positionID.length === 12) ? v++ : v;
            (regex.test(aisleID) && aisleID.length <= 6) ? v++ : v;
            (regex.test(row) && row <= Number.MAX_SAFE_INTEGER) ? v++ : v;
            (regex.test(col) && row <= Number.MAX_SAFE_INTEGER) ? v++ : v;
            (regex.test(maxWeight) && maxWeight <= Number.MAX_SAFE_INTEGER) ? v++ : v;
            (regex.test(maxVolume) && maxVolume <= Number.MAX_SAFE_INTEGER) ? v++ : v;
            if(v === 6) return 1;
            break;
        case "put":
            const {newAisleID, newRow, newCol, newMaxWeight, newMaxVolume, newOccupiedWeight, newOccupiedVolume} = body;
            (regex.test(newAisleID) && newAisleID.length <= 6) ? v++ : v;
            (regex.test(newRow) && newRow <= Number.MAX_SAFE_INTEGER) ? v++ : v;
            (regex.test(newCol) && newCol <= Number.MAX_SAFE_INTEGER) ? v++ : v;
            (regex.test(newMaxWeight) && newMaxWeight <= Number.MAX_SAFE_INTEGER) ? v++ : v;
            (regex.test(newMaxVolume) && newMaxVolume <= Number.MAX_SAFE_INTEGER) ? v++ : v;
            (regex.test(newOccupiedWeight) && newOccupiedWeight <= Number.MAX_SAFE_INTEGER) ? v++ : v;
            (regex.test(newOccupiedVolume) && newOccupiedVolume <= Number.MAX_SAFE_INTEGER) ? v++ : v;

            if(v === 6) return 1;
            break;

    }

    return 0;
}

function validateData(data) {
    
}



function validatePositionID(body) {
    const regex = new RegExp(/^[0-9]*$/);

    if(regex.test(body.newPositionID) && id.length === 12) {
        return 1;
    }

    return 0;
}


module.exports = {isEmpty, isAllowed, positionBodyLength, validatePositionData, validatePositionID};