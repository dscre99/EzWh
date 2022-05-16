const skuItemDao = require('./SKU_Item_dao')
const DB = require('../EZWH_db/RunDB');
const DBinstance = DB.DBinstance;
const skuItemDaoInstance = new skuItemDao(DBinstance);



class SKUItem{

    #rfid = "";
    #SKUId = undefined;
    #available = undefined;
    #DateOfStock = "";

    constructor(rfid, SKUId, DateOfStock) {
        this.#rfid = rfid;
        this.#SKUId = SKUId;
        this.#available = 0;
        this.#DateOfStock = DateOfStock;
    }

    getRfid() {
        return this.#rfid;
    }

    getSKUId() {
        return this.#SKUId;
    }

    getAvailability() {
        return this.#available;
    }

    getDateOfStock() {
        return this.#DateOfStock;
    }

}


// GET /api/skuitems

async function getSKUItems(req, res) {
    let getSKUItemsPromise = skuItemDaoInstance.getSKUItems();
    await getSKUItemsPromise.then(
        function (value) {
            console.log('getSKUItems resolve');
            return res.status(200).json(value).end();
        },
        function (error) {
            console.log('getSKUItems reject');
            return res.status(error).end();
        }
    ).catch(err => function (err) {
        console.log('getSKUItems error', err);
        return res.status(500).end();
    });
}

// GET /api/skuitems/sku/:id

async function getSKUItemBySKUID(req, res) {
    if (Object.keys(req.params.id).length == 0) {
        return res.status(422).json({ error: 'Invalid id' });
    }
    let getSKUItemBySKUIDPromise = skuItemDaoInstance.getSKUItemsBySKUID(Number.parseInt(req.params.id));
    await getSKUItemBySKUIDPromise.then(
        function (value) {
            console.log('getSKUItemBySKUID resolve');
            return res.status(200).json(value).end();
        },
        function (error) {
            console.log('getSKUItemBySKUID reject');
            return res.status(error).end();
        }
    ).catch(err => function (err) {
        console.log('getSKUItemBySKUID error', err);
        return res.status(500).end();
    });
}

// GET /api/skuitems/:rfid

async function getSKUItemsByRfid(req, res) {
    if (Object.keys(req.params.rfid).length == 0) {
        return res.status(422).json({ error: 'Invalid id' });
    }
    let getSKUItemsByRfidPromise = skuItemDaoInstance.getSKUItemsByRfid(req.params.rfid);
    await getSKUItemsByRfidPromise.then(
        function (value) {
            console.log('getSKUItemsByRfid resolve');
            return res.status(200).json(value).end();
        },
        function (error) {
            console.log('getSKUItemsByRfid reject');
            return res.status(error).end();
        }
    ).catch(err => function (err) {
        console.log('getSKUItemsByRfid error', err);
        return res.status(500).end();
    });
}

//POST /api/skuitem

async function newSKUItem(req, res) {
    if (Object.keys(req.body).length == 0) {
        return res.status(422).json({ error: 'Invalid body request' });
    }
    let newSKUItemPromise = skuItemDaoInstance.newSKUItem(req.body);
    await newSKUItemPromise.then(
        function (value) {
            console.log('newSKUItem resolve');
            return res.status(201).json(value).end();
        },
        function (error) {
            console.log('newSKUItem reject');
            return res.status(error).end();
        }
    ).catch(err => function (err) {
        console.log('newSKUItem error', err);
        return res.status(503).end();
    });
}

//PUT /api/skuitems/:rfid

async function modifySKUItem(req, res) {
    if (Object.keys(req.body).length == 0) {
        return res.status(422).json({ error: 'Invalid body request' });
    }
    if (Object.keys(req.params.rfid).length == 0) {
        return res.status(422).json({ error: 'Invalid rfid' });
    }
    let data = {
        "oldRfid": req.params.rfid,
        "newRfid": req.body.newRfid,
        "newAvailable": req.body.newAvailable,
        "newDateOfStock": req.body.newDateOfStock
    }

    let modifySKUItemPromise = skuItemDaoInstance.modifySKUItem(data);
    await modifySKUItemPromise.then(
        function (value) {
            console.log('modifySKUItem resolve');
            return res.status(200).json(value).end();
        },
        function (error) {
            console.log('modifySKUItem reject');
            return res.status(error).end();
        }
    ).catch(err => function (err) {
        console.log('modifySKUItem error', err);
        return res.status(503).end();
    });
}

//DELETE /api/skuitems/:rfid

async function deleteSKUItembyRfid(req, res) {
    if (Object.keys(req.params.rfid).length == 0) {
        return res.status(422).json({ error: 'Invalid rfid request' });
    }
    let deleteSKUItembyRfidPromise = skuItemDaoInstance.deleteSKUItembyRfid(req.params.rfid);
    await deleteSKUItembyRfidPromise.then(
        function (value) {
            console.log('deleteSKUItembyRfid resolve');
            return res.status(204).json(value).end();
        },
        function (error) {
            console.log('deleteSKUItembyRfid reject');
            return res.status(error).end();
        }
    ).catch(err => function (err) {
        console.log('deleteSKUItembyRfid error', err);
        return res.status(503).end();
    });
}

module.exports = SKUItem;
module.exports = { getSKUItems, getSKUItemBySKUID, getSKUItemsByRfid, newSKUItem, modifySKUItem, deleteSKUItembyRfid };