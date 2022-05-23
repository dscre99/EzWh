# Integration and API Test Report

Date:

Version:

# Contents

- [Dependency graph](#dependency graph)

- [Integration approach](#integration)

- [Tests](#tests)

- [Scenarios](#scenarios)

- [Coverage of scenarios and FR](#scenario-coverage)
- [Coverage of non-functional requirements](#nfr-coverage)



# Dependency graph 

<img src="./Dependency_graph_img/Dependency_Graph.png" alt="Dependency Graph">
     
# Integration approach

    <Write here the integration sequence you adopted, in general terms (top down, bottom up, mixed) and as sequence
    (ex: step1: class A, step 2: class A+B, step 3: class A+B+C, etc)> 
    <Some steps may  correspond to unit testing (ex step1 in ex above), presented in other document UnitTestReport.md>
    <One step will  correspond to API testing>

The integration sequence adopted is top down: starting from DAO classes, we have developed testing because no dependencies were present, witouth the use of mock-ups and interacting directly with the DB. This step corresponds to unit testing.

The reason of this choice is that methods of each DAO are supposed to interact with the database only and perform just some minor check and validation on data received: all the major checks are performed on API level (A).

Once unit test have been done and validated, integration test has been performed using receiver classes.
Also in this case, since the connection with the DB is performed by DAO classes already tested, no mock-ups have been used. This step correspond to API testing (A+B).



    

#  Integration Tests

   <define below a table for each integration step. For each integration step report the group of classes under test, and the names of
     Jest test cases applied to them, and the mock ups used, if any> Jest test cases should be here code/server/unit_test

## Step 1
| Classes  | mock up used |Jest test cases |
|--|--|--|
|InternalOrderDAO|| getInternalOrders, createInternalOrder,  modifyInternalOrder, modifyInternalOrder|
|ItemDAO||testStoreItem, testUpdateItem, testGetItemById, testGetSKUIDbyItemID, testGetItembyIdSupp, testGetItems, testDeleteItem|
|Position_DAO|||
|Restock_orderDAO||testGetRestockOrders, testGetRestockOrdersIssued, testGetRestockOrderDeliveredByID, testGetItemList, testCheckItemList, testGetRestockOrderByID, testStoreRestockOrder, testStoreProducts, testUpdateState, testNewSKUItemList, testAddTransportNote, testDeleteRestockOrder|
|Return_orderDAO||testGetReturnOrders, testGetRestockOrderbyID, testGetReturnOrderById, testStoreReturnOrder, testSetReturnItem, testDeleteReturnOrder|
|SKUdao||new_sku, get_skus, get_sku_by_id, modify_sku, test_modify_SKU_position, test_delete_sku_by_id|
|SKU_Item||test_new_SKU_Item, get_sku_Items, get_sku_Items_by_SKU_id, get_SKU_Items_by_RFID, modify_SKU_Item, delete_SKU_Item_by_rfid|
|Test_Descriptor_DAO|||
|Test_result_DAO|||
|UserDAO||new_user, get_user, get_suppliers, get_users, get_users_sessions, modify_user_type, delete_user, |




## Step 2
| Classes  | mock up used |Jest test cases |
|--|--|--|
||||


## Step n 

   
| Classes  | mock up used |Jest test cases |
|--|--|--|
||||




# API testing - Scenarios


<If needed, define here additional scenarios for the application. Scenarios should be named
 referring the UC in the OfficialRequirements that they detail>

## Scenario UCx.y

| Scenario |  name |
| ------------- |:-------------:| 
|  Precondition     |  |
|  Post condition     |   |
| Step#        | Description  |
|  1     |  ... |  
|  2     |  ... |



# Coverage of Scenarios and FR


<Report in the following table the coverage of  scenarios (from official requirements and from above) vs FR. 
Report also for each of the scenarios the (one or more) API Mocha tests that cover it. >  Mocha test cases should be here code/server/test




| Scenario ID |      Functional Requirements covered     |                Mocha Test(s)               |
|:-----------:|:----------------------------------------:|:------------------------------------------:|
|     4-1     |               FR1.1, FR1.3               | test UC4-1 - Create user and define rights |
|     4-2     |            FR1.1, FR1.3, FR1.5           |       test UC4-2 - Modify user rights      |
|     4-3     |            FR1.1, FR1.2, FR1.3           |          test UC4-3 - Delete user          |
|     9-1     | FR6.1, FR6.2, FR6.3, FR6.5, FR6.6, FR6.7 |   test UC9-1 - Internal Order IO accepted  |
|     9-2     |               FR6.6, FR6.7               |   test UC9-2 - Internal Order IO refused   |
|     9-3     |               FR6.6, FR6.7               |  test UC9-3 - Internal Order IO cancelled  |
|     10-1    |            FR6.6, FR6.7, FR6.8           |  test UC10-1 - Internal Order IO Completed |          



# Coverage of Non Functional Requirements


<Report in the following table the coverage of the Non Functional Requirements of the application - only those that can be tested with automated testing frameworks.>


### 

| Non Functional Requirement | Test name |
| -------------------------- | --------- |
|                            |           |

