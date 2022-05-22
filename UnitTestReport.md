# Unit Testing Report

Date:

Version:

# Contents

- [Black Box Unit Tests](#black-box-unit-tests)




- [White Box Unit Tests](#white-box-unit-tests)


# Black Box Unit Tests

    <Define here criteria, predicates and the combination of predicates for each function of each class.
    Define test cases to cover all equivalence classes and boundary conditions.
    In the table, report the description of the black box test case and (traceability) the correspondence with the Jest test case writing the 
    class and method name that contains the test case>
    <Jest tests  must be in code/server/unit_test  >

 ### **Class *class_name* - method *name***

**Criteria for method *name*:**
	
 - 
 - 

**Predicates for method *name*:**

| Criteria | Predicate |
| -------- | --------- |
|          |           |
|          |           |
|          |           |
|          |           |

**Boundaries**:

| Criteria | Boundary values |
| -------- | --------------- |
|          |                 |
|          |                 |

**Combination of predicates**:


| Criteria 1 | Criteria 2 | ... | Valid / Invalid | Description of the test case | Jest test case |
|-------|-------|-------|-------|-------|-------|
|||||||
|||||||
|||||||
|||||||
|||||||




 ## **Class *UserDAO***

 ### **Class *UserDAO* - method *getUser(data)***

**Criteria for method *getUser(data)*:**
 - Username exists
 - User is logged

**Predicates for method *name*:**

| Criteria        | Predicate   |
|-----------------|-------------|
| Username exists (C1) | True, False |
| User is logged (C2)  | True, False |

**Boundaries**:

No boundaries for boolean predicates.

**Combination of predicates**:
| Username exists (C1) | User is logged (C2) | Valid / Invalid | Description of the test case                                                        | Jest test case  |
|----------------------|---------------------|-----------------|-------------------------------------------------------------------------------------|-----------------|
|           T          |          T          |      Valid      |               User exists and is logged in, correct data is returned.               | testGetUser (); |
|           T          |          F          |     Invalid     | User exists but it is not logged in, test fails. (Sessions still to be implemented) |  testGetUser(); |
|           F          |          -          |     Invalid     |                          User does not exists, test fails.                          |  testGetUser(); |

### **Class *UserDAO* - method *getSuppliers()***

**Criteria for method *getSuppliers()*:**
 - Suppliers registered in the system (C1)
 - DB queries successfull (C2)

**Predicates for method *getSuppliers()*:**

| Criteria | Predicate   |
|----------|-------------|
|    C1    | True, False |
|    C2    | True, False |

**Boundaries**:

No boundaries for boolean predicates.

**Combination of predicates**:
| Suppliers registered in the system (C1) | DB queries successfull (C2) | Valid / Invalid | Description of the test case                                 | Jest test case                      |
|-----------------------------------------|-----------------------------|-----------------|--------------------------------------------------------------|-------------------------------------|
|                    T                    |              T              |      Valid      | Method expected to return an array of suppliers data objects | testGetSuppliers([{...},{...},...); |
|                    F                    |              T              |      Valid      |           Method expected to return an empty array           |        testGetSuppliers([]);        |
|                    -                    |              F              |     Invalid     |                     DB error, test fails                     |         testGetSuppliers ();        |


### **Class *UserDAO* - method *getUsers()***

**Criteria for method *getUsers()*:**
 - Users registered in the system (C1)
 - DB queries successfull (C2)

**Predicates for method *getUsers()*:**

| Criteria | Predicate   |
|----------|-------------|
|    C1    | True, False |
|    C2    | True, False |

**Boundaries**:

No boundaries for boolean predicates.

**Combination of predicates**:


| Users registered in the system (C1) | DB queries successfull (C2) | Valid / Invalid | Description of the test case                                 | Jest test case                      |
|-----------------------------------------|-----------------------------|-----------------|--------------------------------------------------------------|-------------------------------------|
|                    T                    |              T              |      Valid      | Method expected to return an array of users data objects | testGetUsers([{...},{...},...); |
|                    F                    |              T              |      Valid      |           Method expected to return an empty array           |        testGetUsers([]);        |
|                    -                    |              F              |     Invalid     |                     DB error, test fails                     |         testGetUsers ();        |


### **Class *UserDAO* - method *newUser(newUserData)***

**Criteria for method *newUser(newUserData)*:**
 - New user does not already exist in the system (C1)
 - DB queries successfull (C2)
 - (Note: data format is checked at API level, so it is considered correct at DAO level).

**Predicates for method *newUser(newUserData)*:**

| Criteria | Predicate   |
|----------|-------------|
|    C1    | True, False |
|    C2    | True, False |

**Boundaries**:

No boundaries for boolean predicates.

**Combination of predicates**:
| New user does not already exist in the system (C1) | DB queries successfull (C2) | Valid / Invalid |                 Description of the test case                 |                                                                            Jest test case                                                                           |
|:----------------------------------------------------:|:---------------------------:|:---------------:|:------------------------------------------------------------:|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
|                          T                         |              T              |      Valid      | Method expected to return 2 01 for successful user creation. |                            testNewUser('dscre@ezwh.com','Simone','Crescenzo','testpassword','manager', 201); (one for each kind of user)                            |
|                          F                         |              T              |     Invalid     |            Method expected to return 409 Conflict.           | testNewUser('dscre@ezwh.com','Simone','Crescenzo','testpassword','manager', 201); testNewUser('dscre@ezwh.com','Simone','Crescenzo','testpassword','manager', 409); |
|                          -                         |              F              |     Invalid     |                     DB error, test fails                     |                                                                            testNewUser();                                                                           |


### **Class *UserDAO* - method *userSession(userData)***

**Criteria for method *userSession(userData)*:**
 - User registered (C1)
 - User logged in (C2)
 - DB queries successfull (C3)
 - (Note: data format is checked at API level, so it is considered correct at DAO level).

**Predicates for method *name*:**

| Criteria |  Predicate  |
|:--------:|:-----------:|
|    C1    | True, False |
|    C2    | True, False |
|    C3    | True, False |

**Boundaries**:

No boundaries for boolean predicates.

**Combination of predicates**:
| User registered (C1) | User logged in (C2) | DB queries successfull (C3) | Valid / Invalid |         Description of the test case        |                                Jest test case                                |
|:--------------------:|:-------------------:|:---------------------------:|:---------------:|:-------------------------------------------:|:----------------------------------------------------------------------------:|
|           T          |          T          |              T              |      Valid      | Method expected to return user data object. |    testUserSession('dscre@ezwh.com','testpassword','manager',1,'Simone');    |
|           T          |          F          |              T              |     Invalid     |        Method expected to return 401.       |    testUserSession('dscre@ezwh.com','wrongpassword','manager',1,'Simone');   |
|           F          |          -          |              T              |     Invalid     |        Method expected to return 401.       | testUserSession('notexisting@ezwh.com','testpassword','manager',1,'Simone'); |
|           -          |          -          |              F              |     Invalid     |        Method expected to return 500.       |                              testUserSession();                              |


### **Class *UserDAO* - method *modifyUserType(newUserData)***

**Criteria for method *modifyUserType(newUserData)*:**
 - User exists (C1)
 - DB queries successfull (C2)
 - (Note: data format is checked at API level, so it is considered correct at DAO level).

**Predicates for method *modifyUserType(newUserData)*:**

| Criteria |  Predicate  |
|:--------:|:-----------:|
|    C1    | True, False |
|    C2    | True, False |

**Boundaries**:

No boundaries for boolean predicates.

**Combination of predicates**:
| User exists (C1) | DB queries successfull (C2) | Valid / Invalid |  Description of the test case  |                              Jest test case                              |
|:----------------:|:---------------------------:|:---------------:|:------------------------------:|:------------------------------------------------------------------------:|
|         T        |              T              |      Valid      | Method expected to return 200. |    testModifyUserType('supp3@ezwh.com', 'supplier', 'customer', 200);    |
|         F        |              T              |     Invalid     | Method expected to return 404. | testModifyUserType('notexisting@ezwh.com', 'supplier', 'customer', 404); |
|         -        |              F              |     Invalid     | Method expected to return 500. |                           testModifyUserType();                          |


### **Class *UserDAO* - method *deleteUser(userData)***

**Criteria for method *deleteUser(userData)*:**
- DB queries successfull (C1)
- (Note: data format is checked at API level, so it is considered correct at DAO level).

**Predicates for method *deleteUser(userData)*:**

| Criteria |  Predicate  |
|:--------:|:-----------:|
|    C1    | True, False |

**Boundaries**:

No boundaries for boolean predicates.

**Combination of predicates**:
| DB queries successful (C1) | Valid / Invalid |  Description of the test case  |               Jest test case              |
|:--------------------------:|:---------------:|:------------------------------:|:-----------------------------------------:|
|              T             |      Valid      | Method expected to return 204. | testDeleteUser('user1@ezwh.com','clerk'); |
|              F             |     Invalid     | Method expected to return 500. |             testDeleteUser();             |





## **Class *ItemDAO***

The implementation strategy used to create the ItemDAO class was to move the validation of the parameters within the associated API class and to implement within the DAO class only the methods to execute queries to the database, which receive input data already validated.

For this reason, the associated criteria and predicates in black box testing are only related to the operations performed by the query and refer only to errors generated by SQL.

 ### **Class *ItemDAO* - method *getItemByID(data)***


**Criteria for method *getItemByID(data)*:**
	

 - data.id is composed by digits only
 - data.id exists in DB or not 

**Predicates for method *getItemByID(data)*:**

| Criteria | Predicate |
| -------- | --------- |
|       data.id is digits only       |    True, False       |
|       data.id exists               |    True, False         |


**Boundaries**:

No boundaries for boolean predicates.


**Combination of predicates**:


|  data.id is digits only  | data.id exists | Valid / Invalid | Description of the test case | Jest test case |
|-------|-------|-------|-------|-------|
|T|T|Valid| Method expects to return the Item specified by the ID |     testGetItemById(2,{id:2,description:'New item',price:10.99, SKUId:1,supplierId:1});|
|T|F|Invalid| Method expects to return empty object {}  |testGetItemById(3,{});|
|F||Invalid| Method expects to return an empty object {} |testGetItemById('A',{}); |


### **Class *ItemDAO* - method *storeItem(data)***


**Criteria for method *storeItem(data)*:**
 - data.id already exist in DB
 - no missing fields in data object 




**Predicates for method *storeItem(data)*:**

| Criteria | Predicate |
| -------- | --------- |
|     data.id already exist in DB     |      True, False     |
|     data.SKUId exists in SKU table    |   True, False        |



**Boundaries**:

No boundaries for boolean predicates.



**Combination of predicates**:


| data.id already exist in DB | data.SKUId exists in SKU table  | Valid / Invalid | Description of the test case | Jest test case |
|-------|-------|-------|-------|-------|
|F|T|Valid| Method expects to return 201, SKUId=1 exists in DB | testStoreItem(2, 'New item', 10.99, 1, 1, 201); |
|F|F|Invalid| Method returns 404 because SKUId specified doesn't exist | testStoreItem(1, 'New item', 10.99, 2, 1, 404); |
|T||Invalid| Method returns 503 because ItemID is already stored |testStoreItem(2, 'New item', 10.99, 1, 1, 503);|

### **Class *ItemDAO* - method *updateItem(data,params)***



**Criteria for method *updateItem(data,params)*:**
	
- params.id already exist in DB





**Predicates for method *updateItem(data,params)*:**

| Criteria | Predicate |
| -------- | --------- |
|   params.id already exist in DB       |      True, False      |



**Boundaries**:

No boundaries for boolean predicates.



**Combination of predicates**:


| params.id already exist in DB  | Valid / Invalid | Description of the test case | Jest test case |
|-------|-------|-------|-------|
|T|Valid| Method expects to return 200 |testUpdateItem(2,'New description',9.99,200);|
| F | Invalid | Check on ID is performed by another function, so this function will always receive a valid ID. | 

## **Class *Restock Order***
### **Class *Restock Order* - method *getRestockOrderByID(data)***

**Criteria for method *getRestockOrderByID(data)*:**
	
 - data.id already exists in DB
 

**Predicates for method *name*:**

| Criteria | Predicate |
| -------- | --------- |
|    data.id already exists in DB      |  True, False         |


**Boundaries**:

No boundaries for boolean predicates.

**Combination of predicates**:


| data.id already exists in DB| Valid / Invalid | Description of the test case | Jest test case |
|-------|-------|-------|-------|
|T|Valid| Method expects to return the restock order given| testGetRestockOrderByID(1,{ id:1, issueDate: "2021/11/29 09:33", state: "ISSUED", products: [{ SKUId:1 description: "New PC", price: 1.99, qty: 30},{ SKUId:2, description: "New Pen", price: 10.99, qty: 15  }],supplierId: 1,transportNote: {},skuItems:[] });|
|F|Invalid| Method expects to return undefined|    testGetRestockOrderByID(1,undefined);|

### **Class *Restock Order* - method *addTransportNote(data,params)***

**Criteria for method *addTransportNote(data,params)*:**

 - params.id exists or not
 - order state == DELIVERED
 - data.deliveryDate is before issueDate

**Predicates for method *addTransportNote(data,params)*:**

| Criteria | Predicate |
| -------- | --------- |
|   params.id exists or not       |    True, False       |
|    order state === "DELIVERED"      |    True, False       |
|    data.deliveryDate is before issueDate      |     True, False      |


**Boundaries**:

No boundaries for boolean predicates.

**Combination of predicates**:


| params.id exists or not | order state == "DELIVERED"  | data.deliveryDate is before issueDate | Valid / Invalid | Description of the test case | Jest test case |
|-------|-------|-------|-------|-------|-------|
|T|T|T|Valid|Method expects to return 200|testAddTransportNote(2,{deliveryDate:"2022/05/22 09:33"},200);|
|T|T|F|Invalid|Method expects to return 422|testAddTransportNote(2,{deliveryDate:"2022/05/20 09:33"},422);|
|T|F||Invalid|Method expects to return 422|testAddTransportNote(1,{deliveryDate:"2022/05/20 09:33"},422);|
|F|||Invalid|Check on ID is performed by another function, so this function will always receive a valid ID.||

 ### **Class *Return_orderDAO* - method *getReturnOrderbyId(data)***

**Criteria for method *getReturnOrderbyId(data)*:**
	
 - data.id exists or not 


**Predicates for method *getReturnOrderbyId(data)*:**

| Criteria | Predicate |
| -------- | --------- |
|    data.id exists or not       |   True, False        |


**Boundaries**:

No boundaries for boolean predicates.

**Combination of predicates**:


| data.id exists or not | Valid / Invalid | Description of the test case | Jest test case |
|-------|-------|-------|-------|
|T|Valid|Method must return the return order specified, including the list of products given|    testGetReturnOrderById(1,[{id: 1,products:  [{RFID: "12345678901234567890123456789015",SKUId: 1,description: "New Item",price: 10.99},{RFID: "12325678901534567790123456789015",SKUId: 2,description: "New Item",price: 10.99 }],restockOrderId: 2,returnDate: "2021/11/29 09:33" }]);|
|F|Invalid|Method must return 404 if the specified ID doesn't exist|    testGetReturnOrderById(1,404);|

 ### **Class *Return_orderDAO* - method *deleteReturnOrder(data)***

**Criteria for method *deleteReturnOrder(data)*:**
	
 - data.id exists or not 


**Predicates for method *deleteReturnOrder(data)*:**

| Criteria | Predicate |
| -------- | --------- |
|    data.id exists or not       |   True, False        |


**Boundaries**:

No boundaries for boolean predicates.

**Combination of predicates**:


| data.id exists or not | Valid / Invalid | Description of the test case | Jest test case |
|-------|-------|-------|-------|
|T|Valid|Method must return 404 because test case calls getReturnOrderbyId after performing delete operation.  |  testDeleteReturnOrder(1,404);|
|F|Invalid|Method always receives existing ID because check is done in API level function.|


## **Class *InternalOrderDAO***

### **Class *InternalOrderDAO* - method *getInternalOrders()***

**Criteria for method *getInternalOrders()*:**
 - DB queries successfull (C1)
 - (Note: data format is checked at API level, so it is considered correct at DAO level).

**Predicates for method *getInternalOrders()*:**

|  Criteria  |  Predicate    |
|:----------:|:-------------:|
|     C1     |  True, False  |

**Boundaries**:

No boundaries for boolean predicates.

**Combination of predicates**:
| DB queries successfull(C1) | Valid / Invalid |         Description of the test case        |           Jest test case           |
|:--------------------------:|:---------------:|:-------------------------------------------:|:----------------------------------:|
|              T             |      Valid      | Method expected to return user data object. | testGetInternalOrders(resExpected) |
|              F             |     Invalid     |        Method expected to return 500.       |                  -                 |


### **Class *InternalOrderDAO* - method *createInternalOrder()***

**Criteria for method *createInternalOrder()*:**
 - DB queries successfull (C1)
 - (Note: data format is checked at API level, so it is considered correct at DAO level).

**Predicates for method *createInternalOrder()*:**

|  Criteria  |  Predicate    |
|:----------:|:-------------:|
|     C1     |  True, False  |

**Boundaries**:

No boundaries for boolean predicates.

**Combination of predicates**:
| DB queries successfull(C1) | Valid / Invalid |         Description of the test case        |                 Jest test case                 |
|:--------------------------:|:---------------:|:-------------------------------------------:|:----------------------------------------------:|
|              T             |      Valid      | Method expected to return user data object. | testCreateInternalOrder(orderData,resExpected) |
|              F             |     Invalid     |        Method expected to return 500.       |                        -                       |


### **Class *InternalOrderDAO* - method *modifyInternalOrderState()***

**Criteria for method *modifyInternalOrderState()*:**
 - DB queries successfull (C1)
 - (Note: data format is checked at API level, so it is considered correct at DAO level).

**Predicates for method *modifyInternalOrderState()*:**

|  Criteria  |  Predicate    |
|:----------:|:-------------:|
|     C1     |  True, False  |

**Boundaries**:

No boundaries for boolean predicates.

**Combination of predicates**:
| DB queries successfull(C1) | Valid / Invalid |         Description of the test case        |                 Jest test case                 |
|:--------------------------:|:---------------:|:-------------------------------------------:|:----------------------------------------------:|
|              T             |      Valid      | Method expected to return user data object. | testModifyInternalOrder(orderData, resExpected) |
|              F             |     Invalid     |        Method expected to return 500.       |                        -                       |


### **Class *InternalOrderDAO* - method *deleteInternalOrder()***

**Criteria for method *deleteInternalOrder()*:**
 - DB queries successfull (C1)
 - (Note: data format is checked at API level, so it is considered correct at DAO level).

**Predicates for method *deleteInternalOrder()*:**

|  Criteria  |  Predicate    |
|:----------:|:-------------:|
|     C1     |  True, False  |

**Boundaries**:

No boundaries for boolean predicates.

**Combination of predicates**:
| DB queries successfull(C1) | Valid / Invalid |         Description of the test case        |                 Jest test case                 |
|:--------------------------:|:---------------:|:-------------------------------------------:|:----------------------------------------------:|
|              T             |      Valid      | Method expected to return user data object. | testDeleteInternalOrder(orderID, resExpected) |
|              F             |     Invalid     |        Method expected to return 500.       |                        -                       |







 ### **Class *SKUDao* - method *getSKUs()***



**Criteria for method *getSKUs()*:**
	

 - DB queries successful
 - SKUs exist





**Predicates for method *newSKU(sku)*:**

| Criteria | Predicate |
| -------- | --------- |
|DB queries successful | True, False |
|SKUs exist | True, False |





**Boundaries**:

No boundaries for boolean predicates.



**Combination of predicates**:


|  DB queries successful | SKUs exist | Valid / Invalid | Description of the test case | Jest test case |
|-------|-------|-------|-------|-------|
|F|-|Invalid|DB error, test fails|testGetSKUs()|
|T|F|Valid|Test is successful, an empty array is returned|testGetSKUs([])|
|T|T|Valid|Skus are returned| testGetSKUs(skus)|

 ### **Class *SKUDao* - method *modifySKU(sku)***

**Criteria for method *modifySKU(sku)*:**
	
 - SKUId exists
- Queries are successful

**Predicates for method *name*:**

| Criteria | Predicate |
| -------- | --------- |
|     SKUId exists     |      True, False     |
|     Queries are successful     |     True, False      |

**Boundaries**:

No boundaries for boolean values

**Combination of predicates**:


| SKUId exists | Queries are successful | Valid / Invalid | Description of the test case | Jest test case |
|-------|-------|-------|-------|-------|
|T|F|Invalid|Test fails because of a DB error|testModifySKU(2, "description", 14, 12, "note", 10000.56, 13, 200)|
|T|T|Valid|The SKU with ID= skuid is modified|testModifySKU(2, "description", 14, 12, "note", 10000.56, 13, 200)|
|F|-|Invalid|The test is expected to return error 404 |testModifySKU(18, "description", 14, 12, "note", 10000.56, 13, 404)|





# White Box Unit Tests

### Test cases definition
    
    
    <Report here all the created Jest test cases, and the units/classes under test >
    <For traceability write the class and method name that contains the test case>


| Unit name | Jest test case |
|--|--|
|storeItem|testStoreItem|
|updateItem|testUpdateItem|
|getItemByID|testGetItemById|
|getSKUIDbyItemID|testGetSKUIDbyItemID|
|getItembyIdSupp|testGetItembyIdSupp|
|getItems|testGetItems|
|deleteItem|testDeleteItem|
|getRestockOrders|testGetRestockOrders|
|getRestockOrdersIssued|testGetRestockOrdersIssued|
|getRestockOrderDeliveredByID|testGetRestockOrderDeliveredByID|
|getItemList|testGetItemList|
|checkItemList|testCheckItemList|
|getRestockOrderByID|testGetRestockOrderByID|
|storeRestockOrder|testStoreRestockOrder|
|storeProducts|testStoreProducts|
|updateState|testUpdateState|
|newSKUItemList|testNewSKUItemList|
|addTransportNote|testAddTransportNote|
|deleteRestockOrder|testDeleteRestockOrder|
|dropTableReturnOrder|beforeAll|
|newTableReturnOrder|beforeAll|
|dropTableItemReturn|beforeAll|
|newTableItemReturn|beforeAll|
|getReturnOrders|testGetReturnOrders|
|getRestockOrderbyID|testGetRestockOrderbyID|
|getReturnOrderbyId|testGetReturnOrderById|
|storeReturnOrder|testStoreReturnOrder|
|setReturnItem|testSetReturnItem|
|deleteReturnOrder|testDeleteReturnOrder|
|InternalOrderDAO.getInternalOrders()|InternalOrderDAO.test.js -> testGetInternalOrders(resExpected)|
|InternalOrderDAO.createInternalOrder(orderData)|InternalOrderDAO.test.js -> testCreateInternalOrder(orderData, resExpected)|
|InternalOrderDAO.modifyInternalOrderState(data)|InternalOrderDAO.test.js -> testModifyInternalOrder(orderData, resExpected)|
|InternalOrderDAO.deleteInternalOrder(orderId)|InternalOrderDAO.test.js -> testDeleteInternalOrder(orderID, resExpected)|
|UserDAO.getUser(data)|UserDAO.test.js -> testGetUser()|
|UserDAO.getSuppliers()|UserDAO.test.js -> testGetSuppliers(resExpected)|
|UserDAO.getUsers()|UserDAO.test.js -> testGetUser()|
|UserDAO.newUser(newUserData)|UserDAO.test.js -> testNewUser(username, name, surname, password, type, resExpected)|
|UserDAO.userSession(userData)|UserDAO.test.js -> testUserSession(username, password, type, idExpected, nameExpected, errExpected)|
|UserDAO.modifyUserType(newUserData)|UserDAO.test.js -> testModifyUserType(username, oldType, newType, resExpected)|
|UserDAO.deleteUser(userData)|UserDAO.test.js -> testDeleteUser(username, type)|






### Code coverage report

    <Add here the screenshot report of the statement and branch coverage obtained using
    the coverage tool. >


### Loop coverage analysis

    <Identify significant loops in the units and reports the test cases
    developed to cover zero, one or multiple iterations >

|Unit name | Loop rows | Number of iterations | Jest test case |
|---|---|---|---|
|getItems|40-46|0|testGetItems([]);|
|getItems|40-46|1|testGetItems([{id:2,description:'New item',price:10.99,skuid:1,supplierid:1}]);|
|getItems|40-46|2|     testGetItems([{id:2,description:'New description',price:9.99,skuid:1,supplierid:1},{id:3,description:'New item',price:10.99,skuid:1,supplierid:1}]);|
|getRestockOrders|148-153|0|testGetRestockOrders([]);|
|getRestockOrders|148-153|1|testGetRestockOrders([{id:1,issueDate: "2021/11/29 09:33",state: "ISSUED",products: [{SKUId:1,description: "New PC",price: 1.99,qty: 30},{SKUId:2,description: "New Pen",price: 10.99,qty: 15 }],supplierId: 1,transportNote: {},skuItems:[]}]);|
|getRestockOrders|148-153|2|testGetRestockOrders([{SKUId:1,description: "New PC",price: 1.99,qty: 30},{SKUId:2,description: "New Pen",price: 10.99,qty: 15 }],supplierId: 1,transportNote: {},skuItems:[]},{id:2,issueDate: "2022/05/21 09:33",state: "ISSUED",products: [{SKUId:1,description: "New PC",price: 1.99,qty: 30},{SKUId:2,description: "New Pen",price: 10.99,qty: 15 }],supplierId: 1,transportNote: {},skuItems:[]}]);|
|getRestockOrdersIssued|211-223|0|testGetRestockOrdersIssued([]);|
|getRestockOrdersIssued|211-223|1|    testGetRestockOrdersIssued([{id:1,issueDate: "2021/11/29 09:33",state: "ISSUED",products: [{SKUId:1,description: "New PC",price: 1.99,qty: 30},{SKUId:2,description: "New Pen",price: 10.99,qty: 15 }],supplierId: 1, skuItems:[]}]);|
|getRestockOrdersIssued|211-223|2|testGetRestockOrdersIssued([{SKUId:1,description: "New PC",price: 1.99,qty: 30},{SKUId:2,description: "New Pen",price: 10.99,qty: 15 }],supplierId: 1, skuItems:[]},{id:2,issueDate: "2022/05/21 09:33",state: "ISSUED",products: [{SKUId:1,description: "New PC",price: 1.99,qty: 30},{SKUId:2,description: "New Pen",price: 10.99,qty: 15 }],supplierId: 1,skuItems:[]}]);|
|getItemList|92-95|0|testGetItemList(1,[]);|
|getItemList|92-95|1|testGetItemList(2,[{SKUId: 1,rfid: "12345678901234567890123456789015"}]);|
|getItemList|92-95|2|testGetItemList(2,[{SKUId: 1,rfid: "12345678901234567890123456789015"},{SKUId: 2,rfid: "12325678901534567790123456789015"}]);|
|getReturnOrders|91-99|0|testGetReturnOrders([]);|
|getReturnOrders|91-99|1|testGetReturnOrders([{id: 1,products:  [{RFID: "12345678901234567890123456789015",SKUId: 1,description: "New Item",price: 10.99},{RFID: "12325678901534567790123456789015",SKUId: 2,description: "New Item",price: 10.99 }],restockOrderId: 2,returnDate: "2021/11/29 09:33" }]);|
|getReturnOrders|91-99|2|testGetReturnOrders([{id: 1,products:  [{RFID: "12345678901234567890123456789015",SKUId: 1,description: "New Item",price: 10.99},{RFID: "12325678901534567790123456789015",SKUId: 2,description: "New Item",price: 10.99 }],restockOrderId: 2,returnDate: "2021/11/29 09:33" },{id:2,products:[],restockOrderId:2, returnDate: "2022/05/22 09:33"}]);|
|getInternalOrders|197-218|0|InternalOrderDAO.test.js - line 61|
|getInternalOrders|197-218|1|InternalOrderDAO.test.js - line 84|
|getInternalOrders|197-218|2|InternalOrderDAO.test.js - line 177|
|createInternalOrder|265-279|0|InternalOrderDAO.test.js - line 327|
|createInternalOrder|265-279|1|InternalOrderDAO.test.js - line 334|
|createInternalOrder|265-279|2|InternalOrderDAO.test.js - line 151|
|||||






