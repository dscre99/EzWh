# Graphical User Interface Prototype  

Authors:

Date:

Version:

# Use case 1: Manage user account

## Scenario 1.5: WH workers list and retrieve information
The WH manager can check the list of WH workers and their specific job: <br>

<img src="./GUI_Images/employees.png" alt="List of WH workers" widht="175" height="250">

# Use case 2: Authentication

## Scenario 2.1: Login

<img src="./GUI_Images/Main_page.png" alt="Login"  width="175" height="250"> <br>
Error message in case of incomplete login: <br>

<img src="./GUI_Images/Error_credentials.png" alt="Login not complete"  width="175" height="250"> <br>
<img src="./GUI_Images/Login_user.png" alt="Username insertion"  width="175" height="250">
<img src="./GUI_Images/Login_password.png" alt="Password insertion"  width="175" height="250">

## Scenario 2.2: Login with errors

<img src="./GUI_Images/wrong_credentials.png" alt="Wrong credentials"  width="175" height="250">

## Scenario 2.4: Credentials Recovery

<img src="./GUI_Images/Forgot_credentials.png" alt="Forgot credentials"  width="175" height="250">

## Scenario 2.3: Logout

This scenario is implemented in three different pages: the main page of the warehouse manager, of the warehouse worker and of the organizational unit employee. These images also represent the main pages for both actors, they can be distinguished by the color and content of the top bar.

<img src="./GUI_Images/Administrator_main.png" alt="Administrator's first page" width="175" height="250">
<img src="./GUI_Images/employee_main.png" alt="Employee's first page"  width="175" height="250">
<img src="./GUI_Images/OU_home.png" alt="OU employee's first page"  width="175" height="250">

# Use case 4: Manage inventory 

<img src="./GUI_Images/Inventory_main.png" alt="Inventory main page" width="175" height="250">

## Scenario 4.1 and 4.2: Create and insert Product in Inventory

<img src="./GUI_Images/Inventory_add_product.png" alt="Add product in inventory" width="175" height="250">
<img src="./GUI_Images/Inventory_add_product_confirmation.png" alt="Confirmation to add product in inventory" width="175" height="250">
<img src="./GUI_Images/inventory_successful.png" alt="Product inserted" width="175" height="250">

## Scenario 4.3: Modify product quantity in Inventory

To find a product in the list one can use the filter results option. By clicking on the product slot it is possible to see the product info and then, by clicking on the circle button on the bottom right side, one can modify it.

<img src="./GUI_Images/filter_inventory.png" alt="Filter research of products" width="175" height="250">
<img src="./GUI_Images/Product_info.png" alt="Product info" width="175" height="250">
<img src="./GUI_Images/inventory_modify_product.png" alt="Modify product" width="175" height="250">

## Scenario 4.4: Remove product from inventory

<img src="./GUI_Images/inventory_delete.png" alt="Delete product" width="175" height="250">

## Scenario 4.5: Track product in inventory

This function is implemented in the WH worker page.

<img src="./GUI_Images/employee_find_product.png" alt="Find product in inventory" width="175" height="250">
<img src="./GUI_Images/employee_findproduct2.png" alt="Product found in inventory" width="175" height="250">

# Use case 3: Manage catalogue

## Scenario 3.1 and 3.2: Create catalogue and add new product

<img src="./GUI_Images/catalogue_admin.png" alt="Catalogue main page"  width="175" height="250">
<img src="./GUI_Images/catalogue_add_product.png" alt="Add product in catalogue"  width="175" height="250">

## Scenario 3.3: Modify product in catalogue

<img src="./GUI_Images/catalog_filter.png" alt="Filter product research in catalogue"  width="175" height="250">
<img src="./GUI_Images/catalog_product_info.png" alt="Product info"  width="175" height="250">
<img src="./GUI_Images/catalog_modify.png" alt="Modify product in catalogue"  width="175" height="250">

## Scenario 3.4: Remove product from catalogue

<img src="./GUI_Images/catalog_delete_product.png" alt="Remove product from catalogue"  width="175" height="250">

# Use case 6: External Orders stock and management

## Scenario 6.1: WH Worker stocks products

WH worker stocks products by scanning the barcode: <br>

<img src="./GUI_Images/employee_scan_product.png" alt="Stock product with barcode"  width="175" height="250">
<img src="./GUI_Images/employee_add_product_info.png" alt="Product information appear after scanning the barcode"  width="175" height="250">
<img src="./GUI_Images/employee_add_product_confirmation.png" alt="Added product confirmation"  width="175" height="250"> <br>

WH worker stocks products by inserting the product code: <br>

<img src="./GUI_Images/employee_addproduct_code.png" alt="Stock product with code"  width="175" height="250">
<img src="./GUI_Images/employee_productbycode_confirmation.png" alt="Added product confirmation" widht="175" height="250">

# Use case 7: Internal order issue

## Scenario 7.1: OU issues internal order

<img src="./GUI_Images/OU_productinfo.png" alt="Product infor and selection" widht="175" height="250">
<img src="./GUI_Images/OU_cart.png " alt="Order cart with selected products" widht="175" height="250">

## Scenario 7.2: OU checks Internal Order status

<img src="./GUI_Images/OU_history.png" alt="OU checks previous orders and order status" widht="175" height="250">

# Use case 8:Internal order stock and management

## Scenario 8.1: WH Worker Prepares Order

When the order is received, the WH manager needs to accept it first:

<img src="./GUI_Images/admin_new_order.png" alt="Order needs to be accepted" widht="175" height="250"> <br>

Then, the WH worker or manager can send it to be delivered, but the WH worker can also see the location of the product by tapping on its name: <br>
WH manager: <br>

<img src="./GUI_Images/admin_accepted_orders.png" alt="Order status is set to 'to be delivered' by the manager" widht="175" height="250"> <br>

WH worker: <br>

<img src="./GUI_Images/employee_orders_to_be.png" alt="Product ready to be delivered" widht="175" height="250">

<img src="./GUI_Images/employee_ordertobe_productinfo.png" alt="Product info and location" widht="175" height="250">

## Scenario 8.2: Internal Order Ready

As in the last scenario, both the WH worker and manager can see the delivered products: <br>
WH manager: <br>
<img src="./GUI_Images/admin_check_orders.png" alt="Products delivered from WH manager view" widht="175" height="250"> <br>
WH worker: <br>
<img src="./GUI_Images/employee_delivered_orders.png" alt="Products delivered from WH worker view" widht="175" height="250"> <br>







