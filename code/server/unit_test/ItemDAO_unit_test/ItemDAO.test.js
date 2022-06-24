const conn = require('../../EZWH_db/RunDB');
const db = conn.DBinstance;
const ItemDAO = require ('../../Item/ItemDAO');
const ItemDAOInstance = new ItemDAO(db);
const SKUDAO = require('../../SKU/SKUdao');
const SKUDAOInstance = new SKUDAO(db);



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

function testUpdateItem(id,supplierId,description,price,expectedResult){

    test('testUpdateItem', async ()=>{
        let item = {
            newDescription:description,
            newPrice:price,
        }
        try{
            let res= await ItemDAOInstance.updateItem(item,{id:id, supplierId:supplierId});
            expect(res).toStrictEqual(expectedResult);
        }catch(err){
            expect(err).toStrictEqual(expectedResult);
        }
    });
}

function testGetItemById(id,supplierId,expectedRes){ //NEW! ADDED supplierId

    test('testGetItemById', async () =>{
        try{
            let res = await ItemDAOInstance.getItemByID({id:id,supplierId:supplierId}); //NEW! ADDED supplierId
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

function testGetItembyIdSupp(id,supplierId,expectedResult){

    test('testGetItembyIdSupp', async () =>{
        try{
            let res = await ItemDAOInstance.getItembyIdSupp({id:id,supplierId:supplierId});
            expect(res).toEqual(expectedResult);

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

function testDeleteItem(id,supplierId,expectedResult){
    test('testDeleteItem', async () =>{
        try{
            let res = await ItemDAOInstance.deleteItem({id:id,supplierId:supplierId});
            expect(res).toEqual(expectedResult);
        }catch(err){
            expect(err).toEqual(expectedResult);
        }
    })
}

function testGetSKUID(id,expectedResult){
    test('testGetSKUByID', async () =>{
        try{
            let res = await ItemDAOInstance.getSKUID({id:id});
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
        let res2 = await SKUDAOInstance.dropSKUTable();
        expect(res2).toEqual(200);
        let res3 = await SKUDAOInstance.newSKUTable();
        expect(res3).toEqual(200);
    });
     testGetItems([]); // No items stored 

     testStoreItem(2, 'New item', 10.99, 1, 1, 201); // SKUId Exists 
     testStoreItem(2, 'New item', 10.99, 1, 1, 503); // ItemID already exists  

     testGetItemById(3,1,undefined); // No item with id = 3
     testGetItemById('A',1,undefined); // No item with id= A
     testGetItemById(2,2,undefined); // NEW! No item with ID=2 for supplier with ID=2
     testGetItemById(3,1,undefined); // NEW! No item with ID=3 for supplier with ID=1 


     testGetItemById(2,1,{id:2,description:'New item',price:10.99, SKUId:1,supplierId:1});
     

     testGetSKUID(1,undefined);

     testGetSKUIDbyItemID(1,1,{id:2});
     testGetSKUIDbyItemID(5,5,undefined); //No item with SKUID=5 and ID = 5

     testGetItembyIdSupp(2,1,{id:2});
     testGetItembyIdSupp(1,2,undefined);

     

     testGetItems([{id:2,description:'New item',price:10.99,SKUId:1,supplierId:1}]);
     testStoreItem(3, 'New item', 10.99, 1, 1, 201);  

     testUpdateItem(2,2,'New description',9.99,undefined); //NEW! There is no Item with ID=2 for supplier with ID=2
     testUpdateItem(2,1,'New description',9.99,200); 

     testGetItems([{id:2,description:'New description',price:9.99,SKUId:1,supplierId:1},{id:3,description:'New item',price:10.99,SKUId:1,supplierId:1}]);
     
     testDeleteItem(2,2,undefined); // NEW! No Item with ID=2 coupled with supplierId=2
     testDeleteItem(2,1,204);
     
});


