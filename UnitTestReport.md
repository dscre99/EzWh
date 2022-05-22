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




 ### **Class *UserDAO***

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
|T|Valid| Method expects to return the restock order given| testGetRestockOrderByID(1,[{ id:1, issueDate: "2021/11/29 09:33", state: "ISSUED", products: [{ SKUId:1 description: "New PC", price: 1.99, qty: 30},{ SKUId:2, description: "New Pen", price: 10.99, qty: 15  }],supplierId: 1,transportNote: {},skuItems:[] }]);|
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


 ### **Class *SKUDao* - method *getSKUbyID(id)***



**Criteria for method *getSKUbyID(id)*:**
	

 - params.id already exists in database





**Predicates for method *getSKUbyID(id)*:**

| Criteria | Predicate |
| -------- | --------- |
|params.id already exists in database| True, False          |





**Boundaries**:

No boundaries for boolean predicates.



**Combination of predicates**:


| Criteria 1 | Criteria 2 | ... | Valid / Invalid | Description of the test case | Jest test case |
|-------|-------|-------|-------|-------|-------|
|||||||
|||||||
|||||||
|||||||
|||||||



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
|||
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








### Code coverage report

    <Add here the screenshot report of the statement and branch coverage obtained using
    the coverage tool. >


### Loop coverage analysis

    <Identify significant loops in the units and reports the test cases
    developed to cover zero, one or multiple iterations >

|Unit name | Loop rows | Number of iterations | Jest test case |
|---|---|---|---|
|||||
|||||
||||||





