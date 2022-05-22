const SKUItemDao = require('../../SKU_Item/SKU_Item_dao');
const DB = require('../../EZWH_db/RunDB');
const DBinstance = DB.DBinstance;
const SKUItemDaoInstance = new SKUItemDao(DBinstance);
const SKUDao = require('../../SKU/SKUdao');
const SKUDaoInstance = new SKUDao(DBinstance);

function testNewSKUItem(rfid, skuid, dateOfStock, expected) {
    test('test new SKU Item', async () => {
        let skuItem = {
            RFID: rfid,
            SKUId: skuid,
            DateOfStock: dateOfStock
        }

        let res = await SKUItemDaoInstance.newSKUItem(skuItem);
        expect(res).toEqual(expected);
    });
}

function testGetSKUItems(expected) {
    test('get sku Items', async () => {
        let res = await SKUItemDaoInstance.getSKUItems();
        expect(res).toEqual(expected);
    });
}

function testGetSKUItemsBySKUId(id, expected) {
    test('get sku Items by SKU id', async () => {
        try {
            let res = await SKUItemDaoInstance.getSKUItemsBySKUID(id);
            expect(res).toEqual(expected);
        } catch (err) {
            expect(err).toEqual(expected);
        }
    });
}

function testGetSKUItemsByRfid(rfid, expected) {
    test('get SKU Items by RFID', async () => {
        try {
            let res = await SKUItemDaoInstance.getSKUItemsByRfid(rfid);
            expect(res).toEqual(expected);
        } catch (err) {
            expect(err).toEqual(expected);
        }
    });
}

function testModifySKUItem(oldRfid, newRfid, newAvailable, newDateOfStock, expected) {
    test('modify SKU Item', async () => {
        let data = {
            "oldRfid": oldRfid,
            "newRfid": newRfid,
            "newAvailable": newAvailable,
            "newDateOfStock": newDateOfStock
        }
        try {
            let res = await SKUItemDaoInstance.modifySKUItem(data);
            expect(res).toEqual(expected);
        } catch (err) {
            expect(err).toEqual(expected);
        }
    });
}

function testDeleteSKUItemByRfid(rfid, expected) {
    test('delete SKU Item by rfid', async () => {
        let res = await SKUItemDaoInstance.deleteSKUItembyRfid();
        expect(res).toEqual(expected);
    });
}

describe('test SKU Item dao', () => {

    let sku = {
        "description": "a new sku",
        "weight": 100,
        "volume": 50,
        "notes": "first sku",
        "price": 10.99,
        "availableQuantity": 50
    }

    beforeAll(async () => {
        let drop = await SKUItemDaoInstance.dropSKUItemTable();
        expect(drop).toEqual(200);
        let table = await SKUItemDaoInstance.newSKUItemTable()
        expect(table).toEqual(200);
        let drop2 = await SKUDaoInstance.dropSKUTable();
        expect(drop2).toEqual(200);
        let table2 = await SKUDaoInstance.newSKUTable();
        expect(table2).toEqual(200);
        let newSKU = await SKUDaoInstance.newSKU(sku);
        expect(newSKU).toEqual(201)
    });

    testGetSKUItems([]); //empty sku items list
    testGetSKUItemsByRfid("1", 404); //no sku item with rfid
    testGetSKUItemsBySKUId(2, 404); //no sku associated to sku id
    //testNewSKUItem("12345678901234567890123456789015", 2, 404) // no sku associated to sku id
    testModifySKUItem("12345678901234567890123456789015", "12345678901234567890123456789015", 1, "2021/11/29 12:30", 404); //no rfid
/*
    testNewSKUItem("12345678901234567890123456789015", 1, "2021/11/29 12:30", 201);
    testNewSKUItem("12345678901234567890123456789014", 1, "2021/11/29 12:30", 201);
    
    testModifySKUItem("12345678901234567890123456789014", "12345678901234567890123456789014", 2, "2021/11/29 12:31", 200);

    let skuitems = [
        {
            "RFID": "12345678901234567890123456789015",
            "SKUId": 1,
            "Available": 0,
            "DateOfStock": "2021/11/29 12:30"
        },{
        "RFID": "12345678901234567890123456789014",
        "SKUId": 1,
        "Available": 2,
        "DateOfStock": "2021/11/29 12:31"
    }]

    testGetSKUItemsBySKUId(1, skuitems[0]);
    testGetSKUItems(skuitems);
    */
    testDeleteSKUItemByRfid("12345678901234567890123456789015", 204);
    
});
