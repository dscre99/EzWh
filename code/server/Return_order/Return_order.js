const express = require('express');
const router = express.Router();
let db = new sqlite.Database('./EZWH_db/EZWH_db.db');
const DAO = new Return_orderDAO(db);
DAO.newTableReturnOrder();

//GET

//GET /api/returnOrders
async function get_return_orders(req, res) {
  try{
    let orderlist = await DAO.getReturnOrders();
    res.status(200).json(orderlist).end();
  }catch(error){
    res.status(500).json(error).end();
  }
}

// GET /api/returnOrders/:id
async function get_return_order_by_id(req, res) {
  if (!parseInt(req.params['id'])) {
    return res.status(422).json({ error: 'Unprocessable Entity ' }).end();
  }

  try {
    let orderbyid = await DAO.getReturnOrderbyId(req.params);
    if (orderbyid===undefined) return res.status(404).json({error: 'No return order associated to id'}).end()
    return res.status(200).json(orderbyid).end(); 
  }catch(error){
    return res.status(500).json(error).end();
  }
}

// POST /api/returnOrder
async function store_return_order(req, res) {
  const requiredKeys = ['returnDate','products','restockOrderId'];

  if (Object.keys(req.body).length === 0 || Object.keys(req.body).length!==3) {
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
      let test = await DAO.getRestockOrderbyID(req.body);
    if (test===undefined) return res.status(404).json({error: 'Not found - No restock order associated to id'}).end(); 
        try{
          
          let insert = await DAO.storeReturnOrder(req.body);
          req.body.products.forEach(prod=>{
            
            let insertitem = DAO.setReturnItem(prod);
          })
          res.status(201).end();
        }catch(error){
          res.status(503).json(error)
        }
        
    }
}

// DELETE /api/returnOrder/:id
async function delete_return_order(req, res) {
  let robyid = await DAO.getReturnOrderbyId(req.params);
  if (robyid===undefined) return res.status(422).json({error: 'Not found - No return order associated to id'}).end(); 

  try{
    let db = await DAO.deleteReturnOrder(req.params)
    res.status(204).json().end();
  }catch(error){
    res.status(503).json(error).end();
  }
}

module.exports = { get_return_orders, get_return_order_by_id, store_return_order, delete_return_order }