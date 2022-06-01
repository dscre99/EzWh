const skuItemDao = require('./SKU_Item_dao')
const DB = require('../EZWH_db/RunDB');
// const moment = require('../node_modules/moment/ts3.1-typings/moment');
const DBinstance = DB.DBinstance;
const skuItemDaoInstance = new skuItemDao(DBinstance);



//DELETE /api/clearskuitemtable
async function clear_skuitem_table(req, res) {
    try {
        let result = await skuItemDaoInstance.dropSKUItemTable();
        let res2 = await skuItemDaoInstance.newSKUItemTable();
        res.status(200).end();
    } catch (err) {
        res.status(500).end();
    }
}



// GET /api/skuitems

async function getSKUItems(req, res) {
    let getSKUItemsPromise = skuItemDaoInstance.getSKUItems();
    getSKUItemsPromise.then(
        function (value) {
            //console.log('getSKUItems resolve');
            return res.status(200).json(value).end();
        },
        function (error) {
            //console.log('getSKUItems reject');
            return res.status(error).end();
        }
    ).catch(err => function (err) {
        //console.log('getSKUItems error', err);
        return res.status(500).end();
    });
}

// GET /api/skuitems/sku/:id

async function getSKUItemBySKUID(req, res) {
    if(Number.parseInt(req.params.id) >= 0){
        if (Object.keys(req.params.id).length == 0) {
            return res.status(422).json({ error: 'Invalid id' }).end();
        }
        let getSKUItemBySKUIDPromise = skuItemDaoInstance.getSKUItemsBySKUID(Number.parseInt(req.params.id));
        await getSKUItemBySKUIDPromise.then(
            function (value) {
                //console.log('getSKUItemBySKUID resolve');
                return res.status(200).json(value).end();
            },
            function (error) {
                //console.log('getSKUItemBySKUID reject');
                return res.status(error).end();
            }
        ).catch(err => function (err) {
            //console.log('getSKUItemBySKUID error', err);
            return res.status(500).end();
        });
    }else{
        return res.status(422).json({error: 'Unprocessable entity'}).end(); 
    }
    
}

// GET /api/skuitems/:rfid

async function getSKUItemsByRfid(req, res) {
    if(Number.parseInt(req.params.rfid) >= 0){
        if (Object.keys(req.params.rfid).length == 0) {
            return res.status(422).json({ error: 'Invalid id' }).end();
        }
        let getSKUItemsByRfidPromise = skuItemDaoInstance.getSKUItemsByRfid(req.params.rfid);
        await getSKUItemsByRfidPromise.then(
            function (value) {
                //console.log('getSKUItemsByRfid resolve');
                return res.status(200).json(value).end();
            },
            function (error) {
                //console.log('getSKUItemsByRfid reject');
                return res.status(error).end();
            }
        ).catch(err => function (err) {
           // console.log('getSKUItemsByRfid error', err);
            return res.status(500).end();
        });
    }else{
        return res.status(422).json({error: 'Unprocessable entity'}).end(); 
    }

    
}

//POST /api/skuitem

async function newSKUItem(req, res) {
    if (Object.keys(req.body).length == 0) {
        return res.status(422).json({ error: 'Invalid body request' }).end();
    }
    const required = ['RFID', 'SKUId', 'DateOfStock'];
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
       if ((req.body).RFID.length != 32) {
            return res.status(422).end();
        }
    }
    let newSKUItemPromise = skuItemDaoInstance.newSKUItem(req.body);
    await newSKUItemPromise.then(
        function (value) {
           // console.log('newSKUItem resolve');
            return res.status(201).json(value).end();
        },
        function (error) {
           // console.log('newSKUItem reject');
            return res.status(error).end();
        }
    ).catch(err => function (err) {
       // console.log('newSKUItem error', err);
        return res.status(503).end();
    });
}

//PUT /api/skuitems/:rfid

async function modifySKUItem(req, res) {
    
    if (Object.keys(req.body).length == 0) {
        return res.status(422).json({ error: 'Invalid body request' }).end();
    }
    if (Object.keys(req.params.rfid).length == 0 || (req.params.rfid).length != 32) {
        return res.status(422).json({ error: 'Invalid rfid' }).end();
    }
    const required = ['newRFID', 'newAvailable', 'newDateOfStock'];
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
        if ((req.body).newRFID.length != 32) {
            return res.status(422).end();
        }
    }
    
    if(Number.parseInt(req.body.newAvailable) >= 0){
        let data = {
            "oldRfid": req.params.rfid,
            "newRfid": req.body.newRFID,
            "newAvailable": req.body.newAvailable,
            "newDateOfStock": req.body.newDateOfStock
        }
    
    
    
    
        let modifySKUItemPromise = skuItemDaoInstance.modifySKUItem(data);
        
        await modifySKUItemPromise.then(
            function (value) {
               // console.log('modifySKUItem resolve');
                return res.status(200).json(value).end();
            },
            function (error) {
               // console.log('modifySKUItem reject');
                return res.status(error).end();
            }
        ).catch(err => function (err) {
           // console.log('modifySKUItem error', err);
            return res.status(503).end();
        });
    }else{
                return res.status(422).end();
    }

    
}

//DELETE /api/skuitems/:rfid

async function deleteSKUItembyRfid(req, res) {
    if (Object.keys(req.params.rfid).length == 0 || (req.params.rfid).length !=32 ) {
        return res.status(422).json({ error: 'Invalid rfid request' }).end();
    }
    let deleteSKUItembyRfidPromise = skuItemDaoInstance.deleteSKUItembyRfid(req.params.rfid);
    await deleteSKUItembyRfidPromise.then(
        function (value) {
            //console.log('deleteSKUItembyRfid resolve');
            return res.status(204).json(value).end();
        },
        function (error) {
          //  console.log('deleteSKUItembyRfid reject');
            return res.status(error).end();
        }
    ).catch(err => function (err) {
        //console.log('deleteSKUItembyRfid error', err);
        return res.status(503).end();
    });
}

module.exports = { getSKUItems, getSKUItemBySKUID, getSKUItemsByRfid, newSKUItem, modifySKUItem, deleteSKUItembyRfid, clear_skuitem_table };