 #Requirements Document 

Date: 22 march 2022

Version: 0.0

 
| Version number | Change |
| ----------------- |:-----------|
| | | 


# Contents

- [Informal description](#informal-description)
- [Stakeholders](#stakeholders)
- [Context Diagram and interfaces](#context-diagram-and-interfaces)
	+ [Context Diagram](#context-diagram)
	+ [Interfaces](#interfaces) 
	
- [Stories and personas](#stories-and-personas)
- [Functional and non functional requirements](#functional-and-non-functional-requirements)
	+ [Functional Requirements](#functional-requirements)
	+ [Non functional requirements](#non-functional-requirements)
- [Use case diagram and use cases](#use-case-diagram-and-use-cases)
	+ [Use case diagram](#use-case-diagram)
	+ [Use cases](#use-cases)
    	+ [Relevant scenarios](#relevant-scenarios)
- [Glossary](#glossary)
- [System design](#system-design)
- [Deployment diagram](#deployment-diagram)

# Informal description
Medium companies and retailers need a simple application to manage the relationship with suppliers and the inventory of physical items stocked in a physical warehouse. 
The warehouse is supervised by a manager, who supervises the availability of items. When a certain item is in short supply, the manager issues an order to a supplier. In general the same item can be purchased by many suppliers. The warehouse keeps a list of possible suppliers per item. 

After some time the items ordered to a supplier are received. The items must be quality checked and stored in specific positions in the warehouse. The quality check is performed by specific roles (quality office), who apply specific tests for item (different items are tested differently). Possibly the tests are not made at all, or made randomly on some of the items received. If an item does not pass a quality test it may be rejected and sent back to the supplier. 

Storage of items in the warehouse must take into account the availability of physical space in the warehouse. Further the position of items must be traced to guide later recollection of them.

The warehouse is part of a company. Other organizational units (OU) of the company may ask for items in the warehouse. This is implemented via Internal Orders, received by the warehouse. Upon reception of an Internal Order the warehouse must collect the requested item(s), prepare them and deliver them to a pick up area. When the item is collected by the other OU the Internal Order is completed. 

EZWH (EaSy WareHouse) is a software application to support the management of a warehouse.



# Stakeholders


| Stakeholder name  | Description | 
| ----------------- |:-----------:|
| Supplier | External entity in charge of supply items ordered by a Warehouse |
| Company | Entity that has to follow normal accepted business practices and operates in order to make a profit |
| Organizational Unit (OU) | Sub-unit of a Company with a specific action domain |
| Administrator | Person in charge of supervise and manage a specific area of a company |
| Retailer | Company that buys Item from a manufacturer or wholesaler and sells them to end users or customers |
| Item Manufacturer | Company that owns or runs a manufacturing plant of a certain kind of item |
| Warehouse Manager | In a company, person in charge of supervising the warehouse of a company |
| Consultant Agent | In a company, person who helps a warehouse manager in finding best suppliers/retailers on the marketplace |
| Quality Inspector | In a company, person in charge of testing Item |
| Barcode System | Device able to scan optical machine-readable representation of item codes and to communicate through API	|
| Company Server/Database | Machine hosting the core of EZWH application |
| Internet Provider | Company that provides access to the Internet to both personal and business customers |
| Delivery Company | Company which offers transports of goods in a given geographical area or globally |
| Software House | Company that primarily provides software Item |
| Competitors | Software houses which develop applications with the same purpose of EZWH |
|  |  |

# Context Diagram and interfaces

## Context Diagram
\<Define here Context diagram using UML use case diagram>

\<actors are a subset of stakeholders>

## Interfaces

| Actor | Logical Interface | Physical Interface  |
| ------------- |:-------------:| -----:|
|   Supplier    | API | Internet connection |
| Warehouse manager| GUI | Screen, keyboard |
| Employee | GUI | Screen, barcode reader |
| Product | Barcode | Laser beam, camera |
| Quality inspector | GUI | Screen, keyboard, testing machine, barcode reader |
| Organizational Unit | GUI | Screen, keyboard |
| Barcode scanner | Wireless connection or USB | Laser beam, camera |
| Testing machine | API | USB or Wireless connection |
| Administrator | GUI | Screen, keyboard |
| Delivery company | API | Internet connection |
| Database | API | Internet connection |

# Stories and personas
\<A Persona is a realistic impersonation of an actor. Define here a few personas and describe in plain text how a persona interacts with the system>

\<Persona is-an-instance-of actor>

\<stories will be formalized later as scenarios in use cases>


# Functional and non functional requirements

## Functional Requirements

| ID        | Description  |
| ------------- |:-------------:| 
|  FR1     | Authorize and authenticate |
|   FR1.1  | Login (username, password) |
|   FR1.2  | Log out  |
|  FR2     | Account management |
|   FR2.1  | Create new account(name, surname, password, type)| 
|   FR2.2  | Delete account |
|   FR2.3  | Reset password |
|   FR2.4  | Modify account information |
|  FR3     | Manage external orders |
|   FR3.1  | Select product from the inventory |
|   FR3.2  | Choose one of the possible suppliers available for the product selected |
|   FR3.3  | Define quantity and some other constraints |
|   FR3.4  | Issue order |
|   FR3.5  | Delete order |
|   FR3.6  | Check order status |
|   FR3.7  | Orders history |
|   FR3.8  | Check space availability |
|   FR3.9  | Reject item in case of defects |
|  FR4     | Manage Internal Orders |
|   FR4.1  | Select product from the inventory |
|   FR4.2  | Define quantity and pick-up date |
|   FR4.3  | Issue order |
|   FR4.4  | Delete order |
|   FR4.5  | Check order status |
|   FR4.6  | Check pick-up space |
|   FR4.7  | Orders history |
|  FR5     | Manage inventory |
|   FR5.1  | Select product from the inventory |
|   FR5.2  | Display product properties and number in stock |
|   FR5.3  | Alert when number of certain product runs under a certain threshold |
|   FR5.4  | Locate product (shelf number, etc.) |
|   FR5.5  | Add product into the inventory |
|   FR5.6  | Remove product from the inventory |
|   FR5.7  | Add quality test results |
|   FR5.8  | Find product location by ID |
|   FR5.9  | Show product description by scan |
|  FR6     | Handle product |
|   FR6.1  | Create new product (name, description, category, supplier, barcode, order) |
|   FR6.2  | Modify product |
|   FR6.3  | Delete product |
|  FR7     | Handle catalogue |
|   FR7.1  | Create new product (name, description, category, supplier) |
|   FR7.2  | Add product into catalogue |
|   FR7.3  | Remove product from catalogue |


## Non Functional Requirements

\<Describe constraints on functional requirements>

| ID        | Type (efficiency, reliability, ..)           | Description  | Refers to |
| ------------- |:-------------:| :-----:| -----:|
| NFR1 | Usability | Average time spent in hours by workers to learn using the software product | All FR |
| NFR2 | Response time | Response time less than 0.5s | All FR |
| NFR3 | Efficiency | Bandwidth required to work | All FR |
| NFR4 | Efficiency | CPU and memory required to work without problems | All FR |
| NFR5 | Reliability | Number of defects per hour | All FR |
| NFR6 | Availability | Time in hours/day the software is up and running | All FR |
| NFR7 | Robustness | Time required to restart after a failure | All FR |
| NFR8 | Maintainability | Effort (in working hours) required to customize, add, or delete a software funciton | All FR |
| NFR9 | Portability | Effort (in working hours) required to deploy the software onto another platform | All FR |
| NFR10 | Deployment | Time required to implement the software application | All FR |
| NFR11 | Deployment | Time required to deliver the software application | All FR |
| NFR12 | Compliance | Conformity with european standards (ISO, IEEE, ...) |  All FR |
| NFR13 | Security | Access granted only to authorized users | FR1 |
| NFR14 | Interoperability | Interoperable with suppliers' proprietary ordering system | FR3.4, FR3.4, FR3.6, FR3.7 |
| NFR15 | Compliance | Conformity to European units of measurements (e.g. prices in Euro) | FR3.4 |


# Use case diagram and use cases


## Use case diagram
\<define here UML Use case diagram UCD summarizing all use cases, and their relationships>


\<next describe here each use case in the UCD>


### Use case X, UCX: TEMPLATE
| Actors Involved        |  |
| ------------- |:-------------:| 
|  Precondition     | \<Boolean expression, must evaluate to true before the UC can start> |
|  Post condition     | \<Boolean expression, must evaluate to true after UC is finished> |
|  Nominal Scenario     | \<Textual description of actions executed by the UC> |
|  Variants     | \<other normal executions> |
|  Exceptions     | \<exceptions, errors > |
---

##### Scenario 1.x TEMPLATE

| Scenario 1.1 | |
| ------------- |:-------------:| 
|  Precondition     | \<Boolean expression, must evaluate to true before the scenario can start> |
|  Post condition     | \<Boolean expression, must evaluate to true after scenario is finished> |
| Step#        | Description  |
|  1     |  |  
|  2     |  |
|  ...     |  |

### Use case 1, UC1: Manage Database
| Actors Involved | IT and Database |
| ------------- |:-------------:| 
|  Precondition     | Database data out of date |
|  Post condition     | Database data updated |
|  Nominal Scenario     | Items are added and some others are removed from stock, so the IT person needs to update the database |
|  Variants     | Add new Item, Modify Item, Delete Item |
|  Exceptions     | Internet connection not available, Wrong Database Query |

##### Scenario 1.1

\<describe here scenarios instances of UC1>

\<a scenario is a sequence of steps that corresponds to a particular execution of one use case>

\<a scenario is a more formal description of a story>

\<only relevant scenarios should be described>

| Scenario 1.1 | Insert new Item in Database |
| ------------- |:-------------:| 
|  Precondition     | Item does not exists in Database |
|  Post condition     | Item added to database |
| Step#        | Description  |
|  1     | Retrieve Item specifications |  
|  2     | Prepare Database query to add an entry with all needed information |
| 3 | Submit query to database |

##### Scenario 1.2

| Scenario 1.2 | Modify Item in Database |
| ------------- |:-------------:| 
|  Precondition     | Item specifications are wrong or out of date |
|  Post condition     | Item specifications are up to date |
| Step#        | Description  |
|  1     | Retrieve Item updated specifications |  
|  2     | Prepare proper Database query to modify an entry by passing all corrected/updated information |
| 3 | Submit query to database |

##### Scenario 1.3

| Scenario 1.3 | Delete Item in Database |
| ------------- |:-------------:| 
|  Precondition     | Item entry is obsolete |
|  Post condition     | Item entry removed from Databse |
| Step#        | Description  |
|  1     | Prepare proper Database query to delete entry of interest |  
| 2 | Submit query to database |

### Use case 2, UC2: Manage User Account
| Actors Involved        | IT Manager |
| ------------- |:-------------:| 
|  Precondition     | User Account not existing or User data Out of date or User Account obsolete or User forgot Password |
|  Post condition     | User Account up to date or User Account Removed |
|  Nominal Scenario     | IT Manager creates a new user account |
|  Variants     | User Account updated, User Account password reset, User Account deleted |
|  Exceptions     | User Account already exists, Invalid character within a field, User Account does not exist |

##### Scenario 2.1

| Scenario 2.1 | Register new User |
| ------------- |:-------------:| 
|  Precondition     | WH Employee has been hired by company and User Account does not exist |
|  Post condition     | User Account created |
| Step#        | Description  |
|  1     | Retrieve User's info |  
|  2     | Fill new Account form |
|  3     | Select correct permission for the User |
| 4 | Submit User data for Account creation |

##### Scenario 2.2

| Scenario 2.2 | Register new User (wrong field) |
| ------------- |:-------------:| 
|  Precondition     | WH Employee has been hired by company and User Account does not exist |
|  Post condition     | User Account created |
| Step#        | Description  |
|  1     | Retrieve User's info |  
|  2     | Fill new Account form |
|  3     | Select correct permission for the User |
| 4 | Submit User data for Account creation |
| 5 | Error message for some invalid field, User Account not created |
| 6 | Correct interested fields |
| 7 | Submit User data for Account creation |
| ... | Repeat steps #5 to #7 if necessary |

##### Scenario 2.3

| Scenario 2.3 | Modify User |
| ------------- |:-------------:| 
|  Precondition     | User data is wrong or obsolete |
|  Post condition     | User data is up to date |
| Step#        | Description  |
|  1     | Retrieve User Account data by ID or by Name |  
|  2     | Update necessary data |
| 3 | Submit User data for Account update |

##### Scenario 2.4

| Scenario 2.4 | Modify User (wrong field) |
| ------------- |:-------------:| 
|  Precondition     | User data is wrong or obsolete |
|  Post condition     | User data is up to date |
| Step#        | Description  |
|  1     | Retrieve User Account data by ID or by Name |  
|  2     | Update necessary data |
| 3 | Submit User data for Account update |
| 4 | Error message for some invalid field, User Account not updated |
| 5 | Correct interested fields |
| 6 | Submit User data for Account creation |
| ... | Repeat steps #4 to #6 if necessary |

##### Scenario 2.5

| Scenario 2.5 | User modifies his/her own data |
| ------------- |:-------------:| 
|  Precondition     | User data is wrong or obsolete |
|  Post condition     | User data is up to date |
| Step#        | Description  |
| 1 | Log into account |
| 2 | Access form to modify data |
| 3 | Update necessary data |
| 4 | Submit data for Account update |
| 5 | Error message for some invalid field, User Account not updated |
| 6 | Correct interested fields |
| 7 | Submit User data for Account creation |
| ... | Repeat steps #4 to #6 if necessary |

### Use case 3, UC3: Authentication
| Actors Involved        | Application Users |
| ------------- |:-------------:| 
|  Precondition     | Application is installed on the device. Network connectivity available. User account already created. ( The account credentials are provided by the company, precisely by the IT Manager ) |
|  Post condition     | User is logged into her/his account. Show different UI based on the role of the User |
|  Nominal Scenario     | Actor authenticates himself when he/she needs to work with the application |
|  Variants     | - |
|  Exceptions     | Account doesn’t exist. No Internet Connectivity. Wrong credentials. Password expired. |

##### Scenario 3.1

| Scenario 3.1 | Login |
| ------------- |:-------------:| 
|  Precondition     | Application is installed on the device. Network connectivity available. User account already created. ( The account credentials are provided by the company, precisely by the IT Manager ) |
|  Post condition     | User is logged into the application |
| Step#        | Description  |
| 1 | Open application |
| 2 | Insert username and password |
| 3 | Login |
| 4 | User diplays application UI (based on its role) |
| 4b | Error message for wrong credentials |
| 5b | Re-insert Credentials |
| 6b | Back to step #3 |
| 4c | Error message for nonexistent account |
| 5c | If first attempt: go back to step 5b  |
| 5c | If many attempts: contact IT Manager |

##### Scenario 3.2

| Scenario 3.2 | Logout |
| ------------- |:-------------:| 
|  Precondition     | User is logged into the application |
|  Post condition     | User has logged out from the application  |
| Step#        | Description  |
| 1 | Open account menu |
| 2 | Press 'Logout' button from account panel |
| 3 | Successful logout |
| 3b | Unsuccessful logout due to network issues |
| 4b | Check network connection |
| 5b | Back to step #1 |


##### Scenario 3.3

| Scenario 3.3 | Credentials Recovery |
| ------------- |:-------------:| 
|  Precondition     | User doesn’t remember the correct credentials needed to login |
|  Post condition     | Credentials recovered and updated  |
| Step#        | Description  |
| 1 | Press 'Recover Credentials' |
| 2 | Receive new credentials from IT Manager |
| 3 | Perform Scenario 3.1 Login |
| 2b | Unsucessful recovery |
| 3b | Check network connection |
| 4b | Back to step #1 |


### Use case 4, UC4: Manage Catalog
| Actors Involved        | WH Manager, DB Manager |
| ------------- |:-------------:| 
|  Precondition     | Catalog exists or not |
|  Post condition     | Catalog created and/or updated |
|  Nominal Scenario     | Actor can perform a variety of operations on the Catalog |
|  Variants     | - |
|  Exceptions     | Errors while performing an operation |

##### Scenario 4.1

| Scenario 4.1 | Create Catalog |
| ------------- |:-------------:| 
|  Precondition     | Catalog does not exist |
|  Post condition     | New Catalog created |
| Step#        | Description  |
| 1 | Go to Catalog panel |
| 2 | Press 'Create Catalog' |
| 3 | Insert all needed Catalog's data |
| 4 | Confirm creation |
| 5 | Catalog creation successful |
| 5b | Catalog creation unsuccessful (wrong field) |
| 6b | Correct wrong Catalog field(s) |
| 7b | Back to step #4 |

##### Scenario 4.2

| Scenario 4.2 | Insert Item in Catalog |
| ------------- |:-------------:| 
|  Precondition     | A new item is available on the marketplace, Catalog exists (may be empty) |
|  Post condition     | The new item is present in the catalog |
| Step#        | Description  |
| 1 | Go to Catalog panel |
| 2 | Press 'Insert Item' |
| 3 | Insert all needed Item's data |
| 4 | Confirm insertion |
| 5 | Item insertion successful |
| 5b | Item insertion unsuccessful (wrong field) |
| 6b | Correct wrong Item field(s) |
| 7b | Back to step #4 |
| 5c | Item insertion unsuccessful (Item code already existing) |
| 6c | Change Item code |
| 7c | Back to step #4 |


##### Scenario 4.3

| Scenario 4.3 | Modify Item in Catalog |
| ------------- |:-------------:| 
|  Precondition     | Item exists in Catalog |
|  Post condition     | Item fields have been modified |
| Step#        | Description  |
| 1 | Go to Catalog panel |
| 2 | Press 'Modify Item' |
| 3 | Insert Item code |
| 4 | Confirm insertion |
| 5b | Wrong Item code |
| 6b | Back to step #3 |
| 5 | Modify Item's fields |
| 6 | Confirm modifications |
| 7 | Item modification successful |
| 7c | Item modification unsuccessful (wrong field) |
| 8c | Correct wrong Item field(s) |
| 9c | Back to step #5 |

##### Scenario 4.4

| Scenario 4.4 | Remove Item from Catalog |
| ------------- |:-------------:| 
|  Precondition     | Item exists in Catalog |
|  Post condition     | Item removed from catalog |
| Step#        | Description  |
| 1 | Go to Catalog panel |
| 2 | Press 'Delete Item' |
| 3 | Insert Item code |
| 4 | Confirm insertion |
| 5 | Confirm deletion
| 5b | Wrong Item code |
| 6b | Back to step #3 |


### Use case 5, UC5: Manage Inventory
| Actors Involved        | WH Manager, WH Worker, DB Manager |
| ------------- |:-------------:| 
|  Precondition     | Inventory exists or not |
|  Post condition     | Inventory created and/or updated |
|  Nominal Scenario     | Actor can perform a variety of operations on the Inventory |
|  Variants     | - |
|  Exceptions     | Errors while performing an operation |

##### Scenario 5.1

| Scenario 5.1 | Create Inventory |
| ------------- |:-------------:| 
|  Precondition     | Inventory does not exist |
|  Post condition     | New Inventory created |
| Step#        | Description  |
| 1 | Go to Inventory panel |
| 2 | Press 'Inventory Catalog' |
| 3 | Insert all needed Inventory's data |
| 4 | Confirm creation |
| 5 | Inventory creation successful |
| 5b | Inventory creation unsuccessful (wrong field) |
| 6b | Correct wrong Inventory field(s) |
| 7b | Back to step #4 |

##### Scenario 5.2

| Scenario 5.2 | Insert Item in Inventory |
| ------------- |:-------------:| 
|  Precondition     | A new item arrived in the Warehouse, Item present in Catalog, Inventory exists (may be empty)  |
|  Post condition     | The is registered into the Inventory |
| Step#        | Description  |
| 1 | Go to Inventory panel |
| 2 | Press 'Insert Item' |
| 3 | Insert Item code |
| 3b | Scan Item barcode |
| 4 | Insert all needed Item's data (Item code insertion automatically retrieves already existing data from catalog) |
| 5 | Confirm insertion |
| 6 | Item insertion successful |
| 6b | Item insertion unsuccessful (wrong field) |
| 7b | Correct wrong Item field(s) |
| 8b | Back to step #4 |
| 6c | Item insertion unsuccessful (Item code nonexistent) |
| 7c | Correct Item code |
| 8c | Back to step #4 |


##### Scenario 5.3

| Scenario 5.3 | Modify Item in Inventory |
| ------------- |:-------------:| 
|  Precondition     | Item exists in Inventory |
|  Post condition     | Item fields have been modified |
| Step#        | Description  |
| 1 | Go to Catalog panel |
| 2 | Press 'Modify Item' |
| 3 | Insert Item code |
| 3b | Scan Item barcode |
| 4 | Confirm insertion |
| 5b | Wrong Item code |
| 6b | Back to step #3 |
| 5 | Modify Item's fields |
| 6 | Confirm modifications |
| 7 | Item modification successful |
| 7c | Item modification unsuccessful (wrong field) |
| 8c | Correct wrong Item field(s) |
| 9c | Back to step #5 |

##### Scenario 5.4

| Scenario 5.4 | Remove Item from Inventory |
| ------------- |:-------------:| 
|  Precondition     | Item exists in Inventory |
|  Post condition     | Item removed from Inventory |
| Step#        | Description  |
| 1 | Go to Inventory panel |
| 2 | Press 'Delete Item' |
| 3 | Insert Item code |
| 3b | Scan Item barcode |
| 4 | Confirm insertion |
| 5 | Confirm deletion
| 5b | Wrong Item code |
| 6b | Back to step #3 |

##### Scenario 5.5

| Scenario 5.5 | Track Item in Inventory |
| ------------- |:-------------:| 
|  Precondition     | Internal Order received or Actor needs to locate an Item |
|  Post condition     | Item position displayed to Actor |
| Step#        | Description  |
| 1 | Go to Catalog panel |
| 2 | Press 'Track Item' |
| 3 | Insert Item code |
| 3b | Scan Item barcode |
| 4 | Confirm insertion |
| 5b | Wrong Item code or Item untracked |
| 6b | Back to step #3 |
| 5 | Display Item location |


### Use case 6, UC6: Issue External Order
| Actors Involved        | WH Manager |
| ------------- |:-------------:| 
|  Precondition     | Stocks are lacking |
|  Post condition     | Items re-stocked in Inventory |
|  Nominal Scenario     | Manager Issues an Order for Items short in Inventory |
|  Variants     | View Order statistics |
|  Exceptions     | No Internet Connectivity. Device is broken. Account lifetime expired. Database is not updated. |

##### Scenario 6.1

| Scenario 6.1 | WH Manager re-stocks itmes |
| ------------- |:-------------:| 
|  Precondition     | Item is missing in inventory it is short in stocks |
|  Post condition     | Item re-stocked in Inventory |
| Step#        | Description  |
| 1 | Go to Order panel |
| 2 | Press 'Issue New Order' |
| 3 | Press 'Order Item' |
| 4 | Insert Item code |
| 4b | Scan Item barcode |
| 5 | Select Supplier from available choices|
| 5c | Wrong Item code |
| 6c | Back to step #3 |
| 6 | Insert quantity |
| 7 | Confirm insertion |
| ... | Repeat for each Item which needs to be ordered |
| 8 | Checkout |
| 9 | Confirm Order |

##### Scenario 6.2

| Scenario 6.2 | WH Manager displays order statistics |
| ------------- |:-------------:| 
|  Precondition     | Order has already been issued |
|  Post condition     | Order statistics displayed |
| Step#        | Description  |
| 1 | Go to Order panel |
| 2 | Press 'Issued Orders' |
| 3 | Select desired order |
| 4 | Press 'Status' |

##### Scenario 6.3

| Scenario 6.3 | WH Manager returns damaged Items |
| ------------- |:-------------:| 
|  Precondition     | Order has already been received |
|  Post condition     | Items return request issued |
| Step#        | Description  |
| 1 | Go to Order panel |
| 2 | Press 'Issued Orders' |
| 3 | Select desired order |
| 4 | Press 'Return Items' |
| 5 | Insert Item code |
| 5b | Scan Item barcode |
| 6 | Insert number of Items to be returned |
| ... | Repeat for each Item which needs to be returned |
| 7 | Issue return request |


### Use case 7, UC7: Receive External Order
| Actors Involved        | WH Worker, WH Quality Inspector, WH Manager |
| ------------- |:-------------:| 
|  Precondition     | Items are available for stocking  |
|  Post condition     | Items are added to the Inventory  |
|  Nominal Scenario     | WH Worker scans and adds received Items to Inventory |
|  Variants     | Item needs to be added to inventory. Item already exists in Inventory, simply modify its quantity. |
|  Exceptions     | Item fails testing. No available space in Inventory |

##### Scenario 7.1

| Scenario 7.1 | WH Worker stocks Items |
| ------------- |:-------------:| 
|  Precondition     | Items are available for stocking |
|  Post condition     | Items are added to the inventory  |
| Step#        | Description  |
| ... | Repeat scenario 5.2 for each Item which needs to be stocked |

##### Scenario 7.2

| Scenario 7.2 | WH Quality inspector tests Item |
| ------------- |:-------------:| 
|  Precondition     | Items present in Inventory |
|  Post condition     | Tested Sample Items received test results in |
| Step#        | Description  |
| 1 | Pick a sample Item |
| 2 | Insert Item code |
| 2b | Scan Item barcode |
| 3 | Peform testing |
| 4 | Insert testing results |


### Use case 8, UC8: OU Issues Internal Order
| Actors Involved        | Organizational Unit OU |
| ------------- |:-------------:| 
|  Precondition     | OU lacking Items |
|  Post condition     | OU issued Internal Order  |
|  Nominal Scenario     | OU is looking for a certain Item and issues an Internal Order to WH chosing Items from Catalog |
|  Variants     | - |
|  Exceptions     | Item not present in Catalog |

##### Scenario 8.1

| Scenario 8.1 | OU Issues Internal Order |
| ------------- |:-------------:| 
|  Precondition     | OU lacking Items |
|  Post condition     | OU issued Internal Order  |
| Step#        | Description  |
| 1 | Go to Order panel |
| 2 | Press 'Issue New Order' |
| 3 | Press 'Order Item' |
| 4 | Insert Item code |
| 4b | Select Item from Catalog list |
| 5 | Insert quantity |
| ... | Repeat for each Item which needs to be ordered |
| 8 | Checkout |
| 9 | Confirm Order |

##### Scenario 8.2

| Scenario 8.2 | OU checks Internal Order status |
| ------------- |:-------------:| 
|  Precondition     | Internal Order already issued |
|  Post condition     | OU displays Internal Order status  |
| Step#        | Description  |
| 1 | Go to Order panel |
| 2 | Press 'Issued Orders' |
| 3 | Select desired order |
| 4 | Press 'Status' |

##### Scenario 8.3

| Scenario 8.3 | Necessary Item not in Catalog |
| ------------- |:-------------:| 
|  Precondition     | OU cannot find Item in Catalog |
|  Post condition     | Item added to Catalog  |
| Step#        | Description  |
| 1 | Contact WH Manager |


### Use case 9, UC9: Manage Internal Order
| Actors Involved        | WH Worker |
| ------------- |:-------------:| 
|  Precondition     | OU issued Internal Order |
|  Post condition     | WH Worker prepared Internal Order  |
|  Nominal Scenario     | WH Worker localizes each ordered Item, picks it up from Inventory |
|  Variants     | - |
|  Exceptions     | Not enogh Items available |

##### Scenario 9.1

| Scenario 9.1 | WH Worker Prepares Order |
| ------------- |:-------------:| 
|  Precondition     | Items available in Inventory |
|  Post condition     | Items added to prepared order and removed from Inventory |
| Step#        | Description  |
| 1 | Go to Received Order panel |
| 2 | Select an Order |
| 3 | Retrieve Item Code |
| 4 | Scenario 5.5 |
| 5 | Pick-up Item |
| 6 | Decrement Item availability Scenario 5.3 |
| 7 | Put Item in preparation station |
| ... | Repeat for all Items in Order |

##### Scenario 9.2

| Scenario 9.2 | Internal Order Ready |
| ------------- |:-------------:| 
|  Precondition     | WH Worker Prepared Internal Order |
|  Post condition     | Internal Order ready in pick-up station |
| Step#        | Description  |
| 1 | Take order from preparation station to pick-up station |
| 2 | Go to Received Order panel |
| 3 | Select the prepared Order |
| 4 | Mark it as 'Ready to pick-up' |


### Use case 10, UC10: Bar Code Read
| Actors Involved        | WH Worker |
| ------------- |:-------------:| 
|  Precondition     | WH Worker authenticated |
|  Post condition     | Item code acquired |
|  Nominal Scenario     | WH Worker acquires Item code through bar code reader |
|  Variants     | - |
|  Exceptions     | Product barcode unreadable |

##### Scenario 10.1

| Scenario 10.1 | Internal Order Ready |
| ------------- |:-------------:| 
|  Precondition     | WH Worker authenticated |
|  Post condition     | Item code acquired |
|  Nominal Scenario     | WH Worker acquires Item code through bar code reader |
| Step#        | Description  |
| 1 | Press 'Read Code' |
| 2 | Scan Item Barcode |
| 2b | Unreadable Bar Code |
| 3b | Insert Code by hand |


# Glossary

\<use UML class diagram to define important terms, or concepts in the domain of the system, and their relationships> 

\<concepts are used consistently all over the document, ex in use cases, requirements etc>

# System Design
\<describe here system design>

\<must be consistent with Context diagram>

# Deployment Diagram 

\<describe here deployment diagram >




