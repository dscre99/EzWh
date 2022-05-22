const SKUDao = require('../../SKU/SKUdao');
const DB = require('../../EZWH_db/RunDB');
const DBinstance = DB.DBinstance;
const SKUDaoInstance = new SKUDao(DBinstance);
const position = require('../../Position/Position_DAO')
const positionInstance = new position(DBinstance)


function testNewSKU(description, weight, volume, notes, price, availableQuantity) {
    test('new sku', async () => {
        let sku = {
            description: description,
            weight: weight,
            volume: volume,
            notes: notes,
            price: price,
            availableQuantity: availableQuantity
        }

        let res = await SKUDaoInstance.newSKU(sku);
        expect(res).toEqual(sku);
    });
}

testNewSKU("sku", 100, 50, "sku", 15.99, 3);

function testGetSKUs(expected) {
    test('get skus', async () => {
        let res = await SKUDaoInstance.getSKUs();
        expect(res).toEqual(expected);
    });
}

function testGetSKUbyID(id, expected) {
    test('get sku by id', async () => {
        try {
            let res = await SKUDaoInstance.getSKUbyID(id);
            expect(res).toEqual(expected);
        } catch (err) {
            expect(err).toEqual(expected);
        }
    });
}

function testModifySKU(id, description, weight, volume, notes, price, availableQuantity, expected) {
    test('modify sku', async () => {
        let sku = {
            id: id,
            description: description,
            weight: weight,
            volume: volume,
            notes: notes,
            price: price,
            availableQuantity: availableQuantity
        }
        try {
            let res = await SKUDaoInstance.modifySKU(sku);
            expect(res).toEqual(expected);
        } catch (err) {
            expect(err).toEqual(expected);
        }

    });
}

function testModifySKUPosition(id, position, expected) {
    test('test modify SKU position', async () => {
        let data = {
            id: id,
            position: position
        }
        try {
            let res = await SKUDaoInstance.modifySKUPosition(data);
            expect(res).toEqual(expected);
        } catch (err) {
            expect(err).toEqual(expected);
        }
    });
}

function testDeleteSKUbyID(id, expected){
    test('test delete sku by id', async () => {
        let res = await SKUDaoInstance.deleteSKUbyID(id);
        expect(res).toEqual(true);
    });
}

describe('test SKUdao', () => {
    beforeAll(async () => {
        let drop = await SKUDaoInstance.dropSKUTable();
        expect(drop).toEqual(200);
        let table = await SKUDaoInstance.newSKUTable();
        expect(table).toEqual(200);
    });

    let position1 = {
        "positionID": "800234543412",
        "aisleID": "8002",
        "row": "3454",
        "col": "3412",
        "maxWeight": 1000,
        "maxVolume": 1000,
        "occupiedWeight": 300,
        "occupiedVolume": 150
    }

    let position2 = {
        "positionID": "800234525144",
        "aisleID": "8002",
        "row": "3452",
        "col": "5144",
        "maxWeight": 1000,
        "maxVolume": 1000,
        "occupiedWeight": 300,
        "occupiedVolume": 150
    }


    let pos1 = positionInstance.storePosition(position1);
    let pos2 = positionInstance.storePosition(position2);

    testGetSKUs([]);

    testNewSKU("a new sku", 100, 50, "first sku", 10.99, 50);
    testNewSKU("second", 54, 12, "second", 2.99, 15);

    testModifySKUPosition(1, "800234523412", true);
    testModifySKUPosition(16, "800234523412", 422);
    testModifySKUPosition(1, "800234523", 422);
    testModifySKUPosition(2, "800234525144", true);

    let skus = [{
        id: 1,
        description: "a new sku",
        weight: 100,
        volume: 50,
        notes: "first sku",
        position: "800234523412" ,
        price: 10.99,
        availableQuantity: 50,
        testDescriptors: []
    },
    {
        id: 2,
        description: "second",
        weight: 54,
        volume: 12,
        notes: "second",
        position: "800234525144",
        price: 2.99,
        availableQuantity: 15,
        testDescriptors: []
    }]
    let sku = {
        id: 1,
        description: "a new sku",
        weight: 100,
        volume: 50,
        notes: "first sku",
        position: "800234523412",
        price: 10.99,
        availableQuantity: 50,
        testDescriptors: []
    }
    testGetSKUs(skus);
    testGetSKUbyID(1, sku);

    testModifySKU(2, "description", 14, 12, "note", 10000.56, 13, true);
    testModifySKU(18, "description", 14, 12, "note", 10000.56, 13, 404);
})