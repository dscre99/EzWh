function empty_body_check(body) {
    if(Object.keys(body).length === 0) {
        return 1;
    } else {
        return 0;
    }
}

module.exports = {empty_body_check};