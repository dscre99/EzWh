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

The warehouse is part of a company. Other organizational units (OU) of the company may ask for items in the warehouse. This is implemented via internal orders, received by the warehouse. Upon reception of an internal order the warehouse must collect the requested item(s), prepare them and deliver them to a pick up area. When the item is collected by the other OU the internal order is completed. 

EZWH (EaSy WareHouse) is a software application to support the management of a warehouse.



# Stakeholders


| Stakeholder name  | Description | 
| ----------------- |:-----------:|
| Supplier | External entity in charge of supply items ordered by a Warehouse |
| Company | Entity that has to follow normal accepted business practices and operates in order to make a profit |
| Organizational Unit (OU) | Sub-unit of a Company with a specific action domain |
| Administrator | Person in charge of supervise and manage a specific area of a company |
| Retailer | Company that buys products from a manufacturer or wholesaler and sells them to end users or customers |
| Item Manufacturer | Company that owns or runs a manufacturing plant of a certain kind of item |
| Warehouse Manager | In a company, person in charge of supervising the warehouse of a company |
| Consultant Agent | In a company, person who helps a warehouse manager in finding best suppliers/retailers on the marketplace |
| Quality Inspector | In a company, person in charge of testing products |
| Barcode System | Device able to scan optical machine-readable representation of item codes and to communicate through API	|
| Company Server/Database | Machine hosting the core of EZWH application |
| Internet Provider | Company that provides access to the Internet to both personal and business customers |
| Delivery Company | Company which offers transports of goods in a given geographical area or globally |
| Software House | Company that primarily provides software products |
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
|  FR4     | Manage internal orders |
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
### Use case 1, UC1
| Actors Involved        |  |
| ------------- |:-------------:| 
|  Precondition     | \<Boolean expression, must evaluate to true before the UC can start> |
|  Post condition     | \<Boolean expression, must evaluate to true after UC is finished> |
|  Nominal Scenario     | \<Textual description of actions executed by the UC> |
|  Variants     | \<other normal executions> |
|  Exceptions     | \<exceptions, errors > |

##### Scenario 1.1 

\<describe here scenarios instances of UC1>

\<a scenario is a sequence of steps that corresponds to a particular execution of one use case>

\<a scenario is a more formal description of a story>

\<only relevant scenarios should be described>

| Scenario 1.1 | |
| ------------- |:-------------:| 
|  Precondition     | \<Boolean expression, must evaluate to true before the scenario can start> |
|  Post condition     | \<Boolean expression, must evaluate to true after scenario is finished> |
| Step#        | Description  |
|  1     |  |  
|  2     |  |
|  ...     |  |

##### Scenario 1.2

##### Scenario 1.x

### Use case 2, UC2
..

### Use case x, UCx
..



# Glossary

\<use UML class diagram to define important terms, or concepts in the domain of the system, and their relationships> 

\<concepts are used consistently all over the document, ex in use cases, requirements etc>

# System Design
\<describe here system design>

\<must be consistent with Context diagram>

# Deployment Diagram 

\<describe here deployment diagram >




