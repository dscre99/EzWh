function isBodyEmpty(body) {
    if(Object.keys(body).length === 0) {
        return 1;
    } else {
        return 0;
    }
}


function isAllowed() {
    return 0;
}

function idExist() {

}

function invalidID() {

}


/** Verify if the request body is valid and/or contains the appropriate data. 
 *  
 *  return 1 if is valid, 0 otherwise 
**/ 

function requestValidation(requestBody) {
    if(Object.keys(requestBody).length === 0) {
        return 0;
    }

}



module.exports = {isBodyEmpty, isAllowed, idExist, invalidID, requestValidation};