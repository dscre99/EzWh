const DB = require('../EZWH_db/RunDB');
const DBInstance = DB.DBinstance;
const ItemDAO = require('./ItemDAO.js');
const DAO=new ItemDAO(DBInstance);


// ITEM

//GET /api/items
async function get_items(req, res) {
  let itemlist = DAO.getItems();
  itemlist.then(
    function(value) { return res.status(200).json(value).end(); },
    function(error) { return res.status(error).end(); }
  ).catch(err => function(err) {
    return res.status(500).end(err);
  });
}

//GET /api/items/:id
async function get_item_by_id(req, res) {

  if (!parseInt(req.params['id'])) {
    return res.status(422).json({ error: 'Unprocessable Entity ' }).end();
  }

  let itembyid = DAO.getItemByID(req.params);
  itembyid.then(
    function(value) { 
      if (value===undefined) return res.status(404).json({error: 'No item associated to id'}).end(); 
      else return res.status(200).json(value).end(); },
    function(error) { return res.status(500).json(error).end(); }
  ).catch(err => function(err) {
    return res.status(500).json(err).end();
  });
}

//POST /api/item
async function store_item(req, res) {
  const requiredKeys = ['id','description','price','SKUId','supplierId'];

  if (Object.keys(req.body).length === 0 || Object.keys(req.body).length !== 5 ) {
      return res.status(422).json({ error: 'Unprocessable Entity - Empty/Too much field' }).end();
  }
  let err =0;
    requiredKeys.forEach(key => {
      // checks for necessary field presence
      if(!Object.keys(req.body).includes(key)){
        return err=1, res.status(422).json({ error: 'Unprocessable Entity - Wrong/missing field name' }).end();
      }
      // checks for fields not empty
      if(req.body[key] == undefined || req.body[key] == ''){
        return err=1, res.status(422).json({ error: 'Unprocessable Entity - Missing field value' }).end();
      }
    });
  
    if(err===0){
      let itembyid = await DAO.getItembyIdSupp(req.body);
      if(itembyid!==undefined) return res.status(422).json({error: ' Unprocessable Entity - ID already there'});
    
  let skuidbyid = await DAO.getSKUIDbyItemID(req.body);
    if(skuidbyid!==undefined) return res.status(422).json({error: ' Unprocessable Entity - SKUId already there'});
      
      try {
        let db =  await DAO.storeItem(req.body);
        res.status(201).end();
      }catch(error){
        res.status(503).json(error);
      }
    }
}


//PUT /api/item/:id
async function update_item(req,res) {
  const requiredKeys = ['newDescription','newPrice'];
  
  // checks for integer value as id 
  if (!parseInt(req.params['id'])) {
     return res.status(422).json({ error: 'Unprocessable Entity ' });
  }

  // checks for number of parameters in body 
  if (Object.keys(req.body).length === 0 || Object.keys(req.body).length !== 2 ) {
       return res.status(422).json({ error: 'Unprocessable Entity - Empty/Too much field' });
  }
  let err =0;
  requiredKeys.forEach(key => {
    // checks for necessary field presence
    if(!Object.keys(req.body).includes(key)){
      return err =1, res.status(422).json({ error: 'Unprocessable Entity - Wrong/missing field name' });
    }
    // checks for fields not empty
    if(req.body[key] == undefined || req.body[key] == ''){
      return err=1, res.status(422).json({ error: 'Unprocessable Entity - Missing field value' });
    }
  });

  if(err===0){
    let itembyid = await DAO.getItemByID(req.params);
    if (itembyid===undefined) return res.status(404).json({error: 'Not found - Item not existing'}).end(); 


  try{
  let db = await DAO.updateItem(req.body,req.params);
  res.status(200).end();
  }catch (error){
  res.status(503).json();
  }

  }
}

// DELETE /api/items/:id
async function delete_item(req, res) {
  // Validation if ID
  if (!parseInt(req.params['id'])) {
    return res.status(422).json({ error: 'Unprocessable Entity ' });
  }
  // Check if ID exists
  let itembyid = await DAO.getItemByID(req.params);
    if (itembyid===undefined) return res.status(422).json({error: 'Not found - Item not existing'}).end(); 

  try{
    let db = await DAO.deleteItem(req.params);
    res.status(204).end();
  }catch{
    res.status(503).end();
  }
}

module.exports = { get_items, get_item_by_id, store_item, update_item, delete_item }