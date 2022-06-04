const DB = require('../EZWH_db/RunDB');
const DBInstance = DB.DBinstance;
const Restock_orderDAO = require ('./Restock_orderDAO');
const DAO = new Restock_orderDAO(DBInstance);

// GET 
//GET /api/restockOrders
async function get_restock_order(req, res) {
  try{
    let orderlist = await DAO.getRestockOrders();
    return res.status(200).json(orderlist).end();
  }catch(error){
    return res.status(500).json(error).end();
  }
}
  
  //GET /api/restockOrdersIssued
async function get_restock_order_issued(req, res) {
  let orderlist = DAO.getRestockOrdersIssued();
  orderlist.then(
    function(value) { return res.status(200).json(value).end(); },
    function(error) { return res.status(500).json(error).end(); }
  ).catch(err => function(err) {
    return res.status(500).json(err).end();
  });
}
  
  // GET /api/restockOrders/:id
async function get_restock_order_by_id(req, res) {
  if (!parseInt(req.params['id'])) {
    return res.status(422).json({ error: 'Unprocessable Entity ' }).end();
  }
  let orderbyid = DAO.getRestockOrderByID(req.params);
  orderbyid.then(
    function(value) { 
      if (value===undefined) return res.status(404).json({error: 'No restock order associated to id'}).end();
      return res.status(200).json(value).end(); 
    },
    function(error) { return res.status(error).end(); }
  ).catch(err => function(err) {
    return res.status(500).json(err).end();
  });
}
  
  // GET /api/restockOrders/:id/returnItems
async function get_item_list(req, res) {
  if (!parseInt(req.params['id'])) {
    return res.status(422).json({ error: 'Unprocessable Entity ' }).end();
  }
  let robyid = await DAO.getRestockOrderByID(req.params);
  if (robyid===undefined) return res.status(404).json({error: 'Not found - No restock order associated to id'}).end(); 


    let listsku = DAO.getItemList(req.params);
    listsku.then(
      function(value) { 
        return res.status(200).json(value).end(); 
      },
      function(error) { return res.status(error).end(); }
    ).catch(err => function(err) {
      return res.status(500).end(err);
    });
}
  
  // POST /api/restockOrder
async function store_restock_order(req, res) {
  const requiredKeys = ['issueDate','products','supplierId'];

  if (Object.keys(req.body).length === 0 ) {
      return res.status(422).json({ error: 'Unprocessable Entity - Empty/Too much field' }).end();
  } 
  let err =0;
    requiredKeys.forEach(key => {
      // checks for necessary field presence
      if(!Object.keys(req.body).includes(key)){
        return err=1,res.status(422).json({ error: 'Unprocessable Entity - Wrong/missing field name' }).end();
      }
      // checks for fields not empty
      if(req.body[key] == undefined || req.body[key] == ''){
        return err=1,res.status(422).json({ error: 'Unprocessable Entity - Missing field value' }).end();
      }
    });
    if(err===0){
        try{
          
          req.body.products.forEach(async prod=>{
            let insertproducts = await DAO.storeProducts(prod);
          });
          let insert = await DAO.storeRestockOrder(req.body);

          return res.status(201).end();
        }catch(error){
          return res.status(503).json(error).end();
        }
        
    }
}
  
  // PUT /api/restockOrder/:id
async function update_restock_order_state(req, res) {
  const requiredState = ['ISSUED','DELIVERY','DELIVERED','TESTED','COMPLETEDRETURN','COMPLETED'];

  if (Object.keys(req.body).length === 0 || Object.keys(req.body).length !== 1) {
      return res.status(422).json({ error: 'Unprocessable Entity - Empty/Too much field' }).end();
  }

  if(!Object.keys(req.body).includes('newState')){
    return res.status(422).json({ error: 'Unprocessable Entity - Wrong/missing field name' }).end();
  }

  if(requiredState.includes(req.body['newState'])===false){
    return res.status(422).json({ error: 'Unprocessable Entity - Wrong field value' }).end();
  }

  if (!parseInt(req.params['id'])) {
    return res.status(422).json({ error: 'Unprocessable Entity ' }).end();
  }

  let robyid = await DAO.getRestockOrderByID(req.params);
  if (robyid===undefined) return res.status(404).json({error: 'Not found - No restock order associated to id'}).end(); 

  
  try{
    let db = await DAO.updateState(req.body,req.params);
    return res.status(200).end();
  }catch (error){
    return res.status(503).json(error).end();
  }
}
  
  
  // PUT /api/restockOrder/:id/skuItems
async function add_skuitems_to_restock_order(req, res) {
  if (Object.keys(req.body).length === 0 || Object.keys(req.body).length !== 1) {
    return res.status(422).json({ error: 'Unprocessable Entity - Empty/Too much field' }).end();
} 

  if(!Object.keys(req.body).includes('skuItems')){
    return res.status(422).json({ error: 'Unprocessable Entity - Wrong/missing field name' }).end();
  }


  if (!parseInt(req.params['id'])) {
    return res.status(422).json({ error: 'Unprocessable Entity ' }).end();
}


  let robyid = await DAO.getRestockOrderByID(req.params);
  if (robyid===undefined) return res.status(404).json({error: 'Not found - No restock order associated to id'}).end(); 

  robyid = await DAO.getRestockOrderDeliveredByID(req.params);
  if (robyid===undefined) return res.status(422).json({error: 'Unprocessable Entity'}).end(); 
  

  try{
    req.body.skuItems.forEach(async item => {

      let s = await DAO.checkItemList(req.params,item);
      if (s===undefined){
        let db = await DAO.newSKUItemList(item,req.params);
      }

    });
     return res.status(200).end();
    }catch (error){
     return res.status(503).json(error).end();
    }
}
  
// PUT /api/restockOrder/:id/transportNote
async function add_tnote_to_restock_order(req, res) {
  const requiredKeys = ['transportNote'];

  if (Object.keys(req.body).length === 0 ||Object.keys(req.body).length >1 ) {
      return res.status(422).json({ error: 'Unprocessable Entity - Empty/Too much field' }).end();
  } else{
    if(!Object.keys(req.body).includes('transportNote')){
      return res.status(422).json({ error: 'Unprocessable Entity - Wrong/missing field name' }).end();
    }

    if(req.body[requiredKeys]==undefined || req.body[requiredKeys]=='' ){
      return res.status(422).json({ error: 'Unprocessable Entity - Wrong field value' }).end();
    }

    if(!Object.keys(req.body['transportNote']).includes('deliveryDate')){
      return res.status(422).json({ error: 'Unprocessable Entity - Wrong/missing field name' }).end();
    }

    if(req.body[requiredKeys].deliveryDate==undefined || req.body[requiredKeys].deliveryDate=='' ){
      return res.status(422).json({ error: 'Unprocessable Entity - Wrong field value' }).end();
    }
    
  }
  
  
  if (!parseInt(req.params['id'])) {
    return res.status(422).json({ error: 'Unprocessable Entity ' }).end();
  }
  let robyid = await DAO.getRestockOrderByID(req.params);
  if (robyid===undefined) return res.status(404).json({error: 'Not found - No restock order associated to id'}).end(); 


  try{
    let db = await DAO.addTransportNote(req.body['transportNote'],req.params);
    if(db===422){
      return res.status(422).end(); // State != Delivery or DeliveryDate is antecedent IssueDate
    }else{
      return res.status(200).end();
    }
    }catch (error){
      return res.status(503).json(error).end();
    }
}

// DELETE /api/restockOrder/:id
async function delete_restock_order(req, res) {
  let robyid = await DAO.getRestockOrderByID(req.params);
  if (!parseInt(req.params['id'])) {
    return res.status(422).json({ error: 'Unprocessable Entity ' }).end();
  }

  if (robyid===undefined) return res.status(422).json({error: 'Not found - No restock order associated to id'}).end(); 
  
  try{
    let db = await DAO.deleteRestockOrder(req.params)
    return res.status(204).json().end();
  }catch(error){
    return res.status(503).json().end();
  }
}

async function clear_restock_order_table(req,res){
  try{
    let res1 = await DAO.dropTableRestockOrder();
    let res2= await DAO.dropTableProducts();
    let res3 = await DAO.dropTableItemlist();
    
    let new1 = await DAO.newTableRestockOrder();
    let new2 = await DAO.newTableProducts();
    let new3 = await DAO.newTableItemlist();

    return res.status(200).end();

  }catch(err){
    return res.status(500).end();
  }
}

module.exports = { get_restock_order, get_restock_order_issued, get_restock_order_by_id, get_item_list,
                    store_restock_order, update_restock_order_state, add_skuitems_to_restock_order,
                    add_tnote_to_restock_order, delete_restock_order, clear_restock_order_table }