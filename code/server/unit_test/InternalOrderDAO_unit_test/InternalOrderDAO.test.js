const DB = require('../../EZWH_db/RunDB');
const DBinstance = DB.DBinstance;
const InternalOrderDAO = require('../../Internal_order/InternalOrderDAO');
const InternalOrderDAOinstance = new InternalOrderDAO(DBinstance);

function testTrial() {
    test('clear InternalOrders tables', async () => {
        let res = await InternalOrderDAOinstance.clearSKUITEMinInternalOrdersTable();
        expect(res).toEqual(200);
        res = await InternalOrderDAOinstance.clearSKUinInternalOrdersTable();
        expect(res).toEqual(200);
        res = await InternalOrderDAOinstance.clearInternalOrdersTable();
        expect(res).toEqual(200);
    });
}

function testGetInternalOrders(resExpected) {
    test('getInternalOrders', async() => {
        let res = await InternalOrderDAOinstance.getInternalOrders();
        expect(res).toEqual(resExpected);
    });
}

function testCreateInternalOrder(orderData, resExpected) {
    test('createInternalOrder', async() => {
        let res = await InternalOrderDAOinstance.createInternalOrder(orderData);
        expect(res).toEqual(resExpected);
    });
}

function testModifyInternalOrder(orderData, resExpected) {
    test('modifyInternalOrder', async() => {
        let res = await InternalOrderDAOinstance.modifyInternalOrderState(orderData);
        expect(res).toEqual(resExpected);
    });
}

function testDeleteInternalOrder(orderID, resExpected) {
    test('modifyInternalOrder', async() => {
        let res = await InternalOrderDAOinstance.deleteInternalOrder(orderID);
        expect(res).toEqual(resExpected);
    });
}


describe('test InternalOrderDAO.js', () => {

    beforeAll(async () => {
        let res = await InternalOrderDAOinstance.clearSKUITEMinInternalOrdersTable();
        expect(res).toEqual(200);
        res = await InternalOrderDAOinstance.clearSKUinInternalOrdersTable();
        expect(res).toEqual(200);
        res = await InternalOrderDAOinstance.clearInternalOrdersTable();
        expect(res).toEqual(200);
        
    });

    // testTrial();

    // initially empty order list
    testGetInternalOrders([]);

    // create an internal order
    testCreateInternalOrder({
            issueDate: '2022/05/15 21:12',
            products: [
                {
                    SKUId: 15,
                    description: 'a product',
                    price: 17.99,
                    qty: 1
                },
                {
                    SKUId: 23,
                    description: 'another product',
                    price: 7.99,
                    qty: 1
                }
            ],
            customerId: 2
        }, 201);

    // retrieve orders
    testGetInternalOrders([
        {
            "id": 1,
            "issueDate": "2022/05/15 21:12",
            "state": "ISSUED",
            "customerId": 2,
            "products": [
                {
                    "SKUId": 15,
                    "description": "a product",
                    "price": 17.99,
                    "qty": 1
                },
                {
                    "SKUId": 23,
                    "description": "another product",
                    "price": 7.99,
                    "qty": 1
                }
            ]
        }
    ]);

    // modify order 1 data
    testModifyInternalOrder(
        {
            id:1,
            "newState": "COMPLETED",
            "products": [
                {
                    "SkuID": 15,
                    "RFID": "12345678901234567890123456789015"
                },
                {
                    "SkuID": 23,
                    "RFID": "12345678901234567890123456789023"
                }
            ]
        }, 200);

    // retrieves updated orders
    testGetInternalOrders([
        {
            "id": 1,
            "issueDate": "2022/05/15 21:12",
            "state": "COMPLETED",
            "customerId": 2,
            "products": [
                {
                    "SKUId": 15,
                    "description": "a product",
                    "price": 17.99,
                    "qty": 1,
                    "RFID": "12345678901234567890123456789015"
                },
                {
                    "SKUId": 23,
                    "description": "another product",
                    "price": 7.99,
                    "qty": 1,
                    "RFID": "12345678901234567890123456789023"
                }
            ]
        }
    ]);

    // create a second internal order
    testCreateInternalOrder({
        issueDate: '2022/05/22 17:58',
        products: [
            {
                SKUId: 7,
                description: 'water bottle',
                price: 0.17,
                qty: 20
            },
            {
                SKUId: 116,
                description: 'mouse pad',
                price: 7.99,
                qty: 1
            },
            {
                SKUId: 44,
                description: 'usb 64GB',
                price: 22.00,
                qty: 1
            }
        ],
        customerId: 1
    }, 201);

    // retrieves updated orders
    testGetInternalOrders([
        {
            "id": 1,
            "issueDate": "2022/05/15 21:12",
            "state": "COMPLETED",
            "customerId": 2,
            "products": [
                {
                    "SKUId": 15,
                    "description": "a product",
                    "price": 17.99,
                    "qty": 1,
                    "RFID": "12345678901234567890123456789015"
                },
                {
                    "SKUId": 23,
                    "description": "another product",
                    "price": 7.99,
                    "qty": 1,
                    "RFID": "12345678901234567890123456789023"
                }
            ]
        },
        {
            "id": 2,
            "issueDate": "2022/05/22 17:58",
            "state": "ISSUED",
            "customerId": 1,
            "products": [
                {
                    "SKUId": 7,
                    "description": "water bottle",
                    "price": 0.17,
                    "qty": 20
                },
                {
                    "SKUId": 116,
                    "description": "mouse pad",
                    "price": 7.99,
                    "qty": 1
                },
                {
                    "SKUId": 44,
                    "description": "usb 64GB",
                    "price": 22,
                    "qty": 1
                }
            ]
        }
    ]);

    // modify order 2 data
    testModifyInternalOrder({
            id:2,
            "newState": "ACCEPTED"
        }, 200);

    // retrieves updated orders
    testGetInternalOrders([
        {
            "id": 1,
            "issueDate": "2022/05/15 21:12",
            "state": "COMPLETED",
            "customerId": 2,
            "products": [
                {
                    "SKUId": 15,
                    "description": "a product",
                    "price": 17.99,
                    "qty": 1,
                    "RFID": "12345678901234567890123456789015"
                },
                {
                    "SKUId": 23,
                    "description": "another product",
                    "price": 7.99,
                    "qty": 1,
                    "RFID": "12345678901234567890123456789023"
                }
            ]
        },
        {
            "id": 2,
            "issueDate": "2022/05/22 17:58",
            "state": "ACCEPTED",
            "customerId": 1,
            "products": [
                {
                    "SKUId": 7,
                    "description": "water bottle",
                    "price": 0.17,
                    "qty": 20
                },
                {
                    "SKUId": 116,
                    "description": "mouse pad",
                    "price": 7.99,
                    "qty": 1
                },
                {
                    "SKUId": 44,
                    "description": "usb 64GB",
                    "price": 22,
                    "qty": 1
                }
            ]
        }
    ]);


    // delete order
    testDeleteInternalOrder(1, 204);

    // retrieves updated orders
    testGetInternalOrders([
        {
            "id": 2,
            "issueDate": "2022/05/22 17:58",
            "state": "ACCEPTED",
            "customerId": 1,
            "products": [
                {
                    "SKUId": 7,
                    "description": "water bottle",
                    "price": 0.17,
                    "qty": 20
                },
                {
                    "SKUId": 116,
                    "description": "mouse pad",
                    "price": 7.99,
                    "qty": 1
                },
                {
                    "SKUId": 44,
                    "description": "usb 64GB",
                    "price": 22,
                    "qty": 1
                }
            ]
        }
    ]);

    // delete order
    testDeleteInternalOrder(2, 204);

    // retrieve empty order list
    testGetInternalOrders([]);

    // create a second internal order
    testCreateInternalOrder({
        issueDate: '2022/05/22 17:58',
        products: [],
        customerId: 1
    }, 201);

    // create a third internal order
    testCreateInternalOrder({
        issueDate: '2022/05/22 17:58',
        products: [
            {
                SKUId: 7,
                description: 'water bottle',
                price: 0.17,
                qty: 20
            }
        ],
        customerId: 1
    }, 201);

});