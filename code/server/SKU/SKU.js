const SKUDao = require('./SKUdao');
const DB = require('../EZWH_db/RunDB');
const DBinstance = DB.DBinstance;
const skuDaoInstance = new SKUDao(DBinstance);

//DELETE /api/clearskutable
async function clear_sku_table(req, res) {
    try {
        let result = await skuDaoInstance.dropSKUTable();
        let res2 = await skuDaoInstance.newSKUTable();
        res.status(200).end();
    } catch (err) {
        res.status(500).end();
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
    if (Number.parseInt(req.params.id) >= 0) {
        if (Object.keys(req.params.id).length == 0) {
            return res.status(422).json({ error: 'Invalid id' });
        }
        let getSKUbyIDPromise = skuDaoInstance.getSKUbyID(req.params.id);
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
    } else {
        return res.status(422).json({ error: 'Unprocessable entity' }).end();

    }


}

// POST /api/sku

async function newSKU(req, res) {
    const required = ['description', 'weight', 'volume', 'notes', 'price', 'availableQuantity'];

    if (Object.keys(req.body).length == 0 || Object.keys(req.body).length != required.length) {
        return res.status(422).json({ error: 'Invalid body' });
    } else {
        required.forEach(key => {
            if (!Object.keys(req.body).includes(key)) {
                console.log('not includes key')
                return res.status(422).end();
            }
            if (req.body[key] == undefined || req.body[key] == '') {
                console.log('undefined');
                return res.status(422).end();
            }
        });
    }

    if (req.body.weight < 0 || req.body.volume < 0 || req.body.price < 0) {
        console.log('Values must be larger or equal than 0')
        return res.status(422).end();
    }

    let newSKUPromise = skuDaoInstance.newSKU(req.body);
    await newSKUPromise.then(
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

    if (Number.parseInt(req.params.id) >= 0) {
        if (Object.keys(req.body).length == 0) {
            return res.status(422).json({ error: 'Empty body' });
        }
        const required = ['newDescription', 'newWeight', 'newVolume', 'newNotes', 'newPrice', 'newAvailableQuantity'];
        if (Object.keys(req.body).length != required.length) {
            return res.status(422).end();
        } else {
            required.forEach(key => {
                if (!Object.keys(req.body).includes(key)) {
                    return res.status(422).end();
                }
                if (req.body[key] == undefined || req.body[key] == '') {
                    return res.status(422).end();
                }
            });
        }
        let data = {
            "id": req.params.id,
            "newDescription": req.body.newDescription,
            "newWeight": req.body.newWeight,
            "newVolume": req.body.newVolume,
            "newNotes": req.body.newNotes,
            "newPrice": req.body.newPrice,
            "newAvailableQuantity": req.body.newAvailableQuantity
        }

        let modifySKUPromise = skuDaoInstance.modifySKU(data);
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
    } else {
        return res.status(422).json({ error: 'Unprocessable entity' }).end();
    }

}


//PUT /api/sku/:id/position

async function modifySKUPosition(req, res) {
    if (Object.keys(req.body).length == 0) {
        return res.status(422).json({ error: 'Invalid position' });
    }
    const required = ['position'];
    if (Object.keys(req.body).length != required.length) {
        return res.status(422).end();
    } else {
        if (!Object.keys(req.body).includes(required[0])) {
            return res.status(422).end();
        }
        if (req.body[required[0]] == undefined || req.body[required[0]] == '') {
            return res.status(422).end();
        }
        if (req.body.position.length != 12) {
            return res.status(422).end();
        }

    }
    if (Object.keys(req.params.id).length == 0) {
        return res.status(422).json({ error: 'Invalid id' });
    }
    let data = {
        "id": req.params.id,
        "position": req.body.position
    }
    //console.log(data);

    let modifySKUPositionPromise = skuDaoInstance.modifySKUPosition(data);
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
    let deleteSKUbyIDPromise = skuDaoInstance.deleteSKUbyID(req.params.id);
    await deleteSKUbyIDPromise.then(
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





//module.exports = SKU;
module.exports = { getSKUbyID, getSKUs, newSKU, modifySKU, modifySKUPosition, deleteSKUbyID, clear_sku_table };
