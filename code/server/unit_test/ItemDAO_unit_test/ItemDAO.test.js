
const conn = require('../../EZWH_db/RunDB');
const db = conn.DBinstance;
const ItemDAO = require ('../../Item/ItemDAO');
const ItemDAOInstance = new ItemDAO(db);


function testStoreItem(id,description,price,SKUId,supplierId,expectedResult){

    test('testStoreItem', async ()=>{
        
        try{
            let item = {
                id:id,
                description:description,
                price:price,
                SKUId:SKUId,
                supplierId:supplierId
            }
            let res= await ItemDAOInstance.storeItem(item);
            expect(res).toStrictEqual(expectedResult);
        }catch(err){
            expect(err).toStrictEqual(expectedResult);
        }
    });
}

function testUpdateItem(id,description,price,expectedResult){

    test('testUpdateItem', async ()=>{
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

    test('testGetItemById', async () =>{
        try{
            let res = await ItemDAOInstance.getItemByID({id:id});
            expect(res).toStrictEqual(expectedRes);
        }catch(err){
            expect(err).toEqual(err);
        }
        
    });
}

function testGetSKUIDbyItemID(SKUId,supplierId,expectedResult){

    test('testGetSKUIDbyItemID', async () =>{
        try{
            let res = await ItemDAOInstance.getSKUIDbyItemID({SKUId:SKUId,supplierId:supplierId});
            expect(res).toEqual(expectedResult);
        }catch(err){
            expect(err).toEqual(expectedResult);
        }
        
    });
}

function testGetItembyIdSupp(supplierId,expectedResult){

    test('testGetItembyIdSupp', async () =>{
        try{
            let res = await ItemDAOInstance.getItembyIdSupp({id:expectedResult,supplierId:supplierId});
            expect(res).toEqual({ 
                id: expectedResult
            });
        }catch(err){
            expect(err).toEqual(expectedResult);
        }
        
    });
}

function testGetItems(resExpected){
    try{
        test('testGetItems',async ()=>{
            let res = await ItemDAOInstance.getItems();
            expect(res).toEqual(resExpected);
        });
    }catch(err){
        expect(err).toEqual(resExpected);
    }
    
}

function testDeleteItem(id,expectedResult){
    test('testDeleteItem', async () =>{
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
     testStoreItem(2, 'New item', 10.99, 1, 1, 503); // ItemID already exists  

     testGetItemById(3,{}); // No item with id = 3
     testGetItemById('A',{}); // No item with id= A

     testGetItemById(2,{id:2,description:'New item',price:10.99, SKUId:1,supplierId:1});
     

     testGetSKUIDbyItemID(1,1,{id:2});
     testGetSKUIDbyItemID(5,5,{}); //No item with SKUID=5 and ID = 5

     testGetItembyIdSupp(1,2);
     

     testGetItems([{id:2,description:'New item',price:10.99,skuid:1,supplierid:1}]);
     testStoreItem(3, 'New item', 10.99, 1, 1, 201);  

     testUpdateItem(2,'New description',9.99,200);
     testGetItems([{id:2,description:'New description',price:9.99,skuid:1,supplierid:1},{id:3,description:'New item',price:10.99,skuid:1,supplierid:1}]);

     testDeleteItem(2,204);
     
});


