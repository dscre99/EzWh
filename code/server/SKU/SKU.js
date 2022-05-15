const SKUDao = require('./SKUdao');
const DB = require('../EZWH_db/RunDB');
const DBinstance = DB.DBinstance;
const skuDaoInstance = new SKUDao(DBinstance);

class SKU {

    #id = undefined;
    #description = "";
    #weight = undefined;
    #volume = undefined;
    #notes = "";
    #position = "";
    #availableQuantity = undefined;
    #price = undefined;
    #testDescriptors = undefined;

    constructor(description, weight, volume, notes, availableQuantity, price) {
        this.#description = description;
        this.#weight = weight;
        this.#volume = volume;
        this.#notes = notes;
        this.#availableQuantity = availableQuantity;
        this.#price = price;
    }

    setPosition(position) {
        return this.#position = position;
    }

    setTestDescriptors(testDescriptors) {
        return this.#testDescriptors = testDescriptors;
    }

    getId() {
        return this.#id;
    }

    getDescription() {
        return this.#description;
    }

    getVolume() {
        return this.#volume;
    }

    getNotes() {
        return this.#notes;
    }

    getAvailableQuantity() {
        return this.#availableQuantity;
    }

    getPrice() {
        return this.#price;
    }

    getPosition() {
        return this.#position;
    }

    getTestDescriptors() {
        return this.#testDescriptors;
    }
}

// GET /api/skus

 async function getSKUs(req, res) {
    let getSKUSPromise = skuDaoInstance.getSKUs();
    await getSKUSPromise.then(
        function (value) {
            console.log('Get SKUs resolve');
            return res.status(200).json(value).end();
        },
        function (error) {
            console.log('getSKUs reject', error);
            return res.status(500).end();
        }
    ).catch(err => function (err) {
        console.log('getSKUs error', err);
        return res.status(500).end();
    });
 }

// GET /api/skus/:id

async function getSKUbyID(req, res) {
    if (Object.keys(req.params.id).length == 0) {
        return res.status(422).json({ error: 'Invalid id' });
    }
    let getSKUbyIDPromise = skuDaoInstance.getSKUbyID();
    await getSKUbyIDPromise.then(
        function (value) {
            console.log('getSKUbyID resolve');
            return res.status(200).json(value).end();
        },
        function (error) {
            console.log('getSKUbyID reject');
            return res.status(error).end();
        }
    ).catch(err => function (err) {
        console.log('getSKUbyID error', err);
        return res.status(500).end();
    });
}

// POST /api/sku

async function newSKU(req, res) {
    if (Object.keys(req.body).length == 0) {
        return res.status(422).json({ error: 'Invalid body' });
    }
    let newSKUPromise = skuDaoInstance.newSKU();
    awaitnewSKUPromise.then(
        function (value) {
            console.log('newSKU resolve');
            return res.status(201).json(value).end();
        },
        function (error) {
            console.log('newSKU reject');
            return res.status(error).end();
        }
    ).catch(err => function (err) {
        console.log('newSKU error', err);
        return res.status(503).end();
    });
}


// PUT /api/sku/:id

async function modifySKU(req, res) {
    if (Object.keys(req.body).length == 0) {
        return res.status(422).json({ error: 'Empty body' });
    }
    let modifySKUPromise = skuDaoInstance.modifySKU();
    await modifySKUPromise.then(
        function (value) {
            console.log('modifySKU resolve');
            return res.status(200).json(value).end();
        },
        function (error) {
            console.log('modifySKU reject');
            return res.status(error).end();
        }
    ).catch(err => function (err) {
        console.log('modifySKU error', err);
        return res.status(503).end();
    });
}


//PUT /api/sku/:id/position

async function modifySKUPosition(req, res) {
    /*if (Object.keys(req.params.id).length == 0) {
        return res.status(422).json({ error: 'Invalid id' });
    } */
    let modifySKUPositionPromise = skuDaoInstance.modifySKUPosition();
    await modifySKUPositionPromise.then(
        function (value) {
            console.log('modifySKUPosition resolve');
            return res.status(200).json(value).end();
        },
        function (error) {
            console.log('modifySKUPosition reject');
            return res.status(error).end();
        }
    ).catch(err => function (err) {
        console.log('modifySKUPosition error', err);
        return res.status(503).end();
    });
}

//DELETE /api/skus/:id

async function deleteSKUbyID(req, res) {
    if (Object.keys(req.params.id).length == 0) {
        return res.status(422).json({ error: 'Invalid id' });
    }
    let deleteSKUbyIDPromise = skuDaoInstance.deleteSKUbyID();
    await deletetSKUbyIDPromise.then(
        function (value) {
            console.log('deleteSKUbyID resolve');
            return res.status(200).json(value).end();
        },
        function (error) {
            console.log('deleteSKUbyID reject');
            return res.status(error).end();
        }
    ).catch(err => function (err) {
        console.log('deleteSKUbyID error', err);
        return res.status(503).end();
    });
}


module.exports = SKU;
module.exports = { getSKUbyID, getSKUs, newSKU, modifySKU, modifySKUPosition, deleteSKUbyID };