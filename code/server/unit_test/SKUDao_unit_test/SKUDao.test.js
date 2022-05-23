const SKUDao = require('../../SKU/SKUdao');
const DB = require('../../EZWH_db/RunDB');
const DBinstance = DB.DBinstance;
const SKUDaoInstance = new SKUDao(DBinstance);
const position = require('../../Position/Position_DAO');
const positionInstance = new position(DBinstance);


function testNewSKU(description, weight, volume, notes, price, availableQuantity, expected) {
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
        expect(res).toEqual(expected);
    });
}


function testGetSKUs(expected) {
    test('get skus', async () => {
        let res = await SKUDaoInstance.getSKUs();
        expect(res).toEqual(expected);
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
        expect(res).toEqual(expected);
    });
}

describe('test SKUdao', () => {

    let position1 = {
        "positionID": "800234523412",
        "aisleID": "8002",
        "row": "3452",
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

    beforeAll(async () => {
        let drop = await SKUDaoInstance.dropSKUTable();
        expect(drop).toEqual(200);
        let table = await SKUDaoInstance.newSKUTable();
        expect(table).toEqual(200);
        let pos1 = await positionInstance.storePosition(position1);
        expect(pos1).toEqual(position1.positionID);
        let pos2 = await positionInstance.storePosition(position2);
        expect(pos2).toEqual(position2.positionID);
    });

    testGetSKUs([]);

    testGetSKUbyID(1, 404);


    testNewSKU("a new sku", 100, 50, "first sku", 10.99, 50, 201);
    testNewSKU("second", 54, 12, "second", 2.99, 15, 201);

    testModifySKUPosition(1, "800234523412", 200);
    testModifySKUPosition(16, "800234523412", 422);
    testModifySKUPosition(1, "800234523", 422);
    testModifySKUPosition(2, "800234525144", 200);

    let skus = [{
        id: 1,
        description: "a new sku",
        weight: 100,
        volume: 50,
        notes: "first sku",
        position: "800234523412" ,
        price: 10.99,
        availableQuantity: 50,
        testDescriptors: undefined
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
        testDescriptors: undefined
    }]
    let sku = [{
        id: 1,
        description: "a new sku",
        weight: 100,
        volume: 50,
        notes: "first sku",
        position: "800234523412",
        price: 10.99,
        availableQuantity: 50,
        testDescriptors: undefined
    }]

    testGetSKUs(skus);
    testGetSKUbyID(1, sku);

    testModifySKU(2, "description", 14, 12, "note", 10000.56, 13, 200);
    testModifySKU(18, "description", 14, 12, "note", 10000.56, 13, 404);
})