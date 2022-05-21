
const conn = require('../../EZWH_db/RunDB');
const db = conn.DBinstance;
const ItemDAO = require ('../../Item/ItemDAO');
const ItemDAOInstance = new ItemDAO(db);


function testStoreItem(id,description,price,SKUId,supplierId,expectedResult){

    test('Store item', async ()=>{
        let item = {
            id:id,
            description:description,
            price:price,
            SKUId:SKUId,
            supplierId:supplierId
        }
        try{
            let res= await ItemDAOInstance.storeItem(item);
            expect(res).toStrictEqual(expectedResult);
        }catch(err){
            expect(err).toStrictEqual(expectedResult);
        }
    });
}

function testUpdateItem(id,description,price,expectedResult){

    test('Update item', async ()=>{
        let item = {
            newDescription:description,
            newPrice:price,
        }
        try{
            let res= await ItemDAOInstance.updateItem(item,{id:id});
            expect(res).toStrictEqual(expectedResult);
        }catch(err){
            expect(err).toStrictEqual(expectedResult);
        }
    });
}

function testGetItemById(id,expectedRes){

    test('Get item by id', async () =>{
        try{
            let res = await ItemDAOInstance.getItemByID({id:id});
            expect(res).toStrictEqual(expectedRes);
        }catch(err){
            expect(err).toEqual(err);
        }
        
    });
}

function testGetSKUIDbyItemID(SKUId,supplierId,expectedResult){

    test('Get SKUID by item id', async () =>{
        let res = await ItemDAOInstance.getSKUIDbyItemID({SKUId:SKUId,supplierId:supplierId});
        expect(res).toEqual(expectedResult);
    });
}

function testGetItembyIdSupp(supplierId,expectedResult){

    test('Get ID by Supplier id', async () =>{
        let res = await ItemDAOInstance.getItembyIdSupp({id:expectedResult,supplierId:supplierId});
        expect(res).toEqual({ 
            id: expectedResult
        });
    });
}

function testGetItems(resExpected){
    test('Get items',async ()=>{
        let res = await ItemDAOInstance.getItems();
        expect(res).toEqual(resExpected);
    });
}

function deleteItem(id,expectedResult){
    test('Delete item', async () =>{
        try{
            let res = await ItemDAOInstance.deleteItem({id:id});
            expect(res).toEqual(expectedResult);
        }catch(err){
            expect(err).toEqual(expectedResult);
        }
    })
}

describe('test ItemDAO.js',  () => {

    beforeAll(async () => {
        let res = await ItemDAOInstance.dropTableItem();
        expect(res).toEqual(200);
        let res1 = await ItemDAOInstance.newTableItem();
        expect(res1).toEqual(200);
    });
     testGetItems([]); // No items stored 

     testStoreItem(1, 'New item', 10.99, 2, 1, 404); // Not stored
     testStoreItem(2, 'New item', 10.99, 1, 1, 201); // SKUId Exists 

     testGetItemById(2,{id:2,description:'New item',price:10.99, SKUId:1,supplierId:1});
     testGetItemById(3,{}); // No item with it = 3

     testGetSKUIDbyItemID(1,1,{id:2});
     testGetSKUIDbyItemID(5,5,{}); //No item with SKUID=5 and ID = 5

     testGetItembyIdSupp(1,2);
     

     testGetItems([{id:2,description:'New item',price:10.99,skuid:1,supplierid:1}]);

     testUpdateItem(2,'New description',9.99,200);
     deleteItem(2,204);
     
});


