const express = require('express');
const router = express.Router();
const restock_orderDAO = require('Restock_orderDAO');
const db = new restock_orderDAO('EzWh');

/*
function Restock_Order(id, issueDate, state, supplierId, transportNote) {
    this.id = id;
    this.issueDate = issueDate;
    this.state = state;
    this.supplierId = supplierId;
    this.transportNote = transportNote;
    
}
*/

//GET /api/restockOrders

router.get('/api/restockOrders', (req, res) => {
    restock_order.getRestockOrders().then(
        function (restock_order) { return res.status(200).json(restock_order); },
        function (error) { return res.status(500).json(error);  }
    );
});

//GET /api/restockOrdersIssued

router.get('/api/restockOrdersIssued', (req, res) => {
    restock_order.getRestockOrdersIssued(req.body).then(
        function (restock_order) { return res.status(200).json(restock_order); },
        function (error) { return res.status(500).json(error);  }
    );
});

//GET /api/restockOrders/:id

router.get('/api/restockOrders/:id', (req, res) => {
    restock_order.getRestockOrderByID(req.body).then(
        function (restock_order) { return res.status(200).json(restock_order); },
        function (error) { return res.status(500).json(error); }
    );
});

//GET /api/restockOrders/:id/returnItems

router.get('/api/restockOrders/:id/returnItems', (req, res) => {
    restock_order.getSKUItems(req.body).then(
        function (restock_order) { return res.status(200).json(restock_order); },
        function (error) { return res.status(500).json(error); }
    );
});


//POST /api/restockOrder


router.post('/api/restockOrder', (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(422).json({ error: 'Unprocessable Entity' });
    }
    restock_order.storeRestockOrder(req.body).then(
        function (restock_order) { return res.status(200).json(restock_order); },
        function (error) { return res.status(500).json(error) }
    );

    let message = {
        message: 'Created',
        received: req.body
    }
    return res.status(201).json(message);
});

//PUT /api/restockOrder/:id

router.put('/api/restockOrder/:id', (req, res) => {
    sku.modifySKU(req.body);
});

//PUT /api/sku/:id/position

router.put('/api/sku/:id/position', (req, res) => {
    sku.modifySKUPosition(req.body);
});
    

//DELETE /api/skus/:id

router.delete('/api/skus/:id', (req, res) => {
    sku.deleteSKUbyID(req.body);
});
