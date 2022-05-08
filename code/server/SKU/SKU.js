const express = require('express');
const router = express.Router()
const sku = require('SKUDao')

function SKU(id, description, weight, volume, notes, position, availableQuantity, price, testDescriptors) {
    this.id = id;
    this.description = description;
    this.weight = weight;
    this.volume = volume;
    this.notes = notes;
    this.position = position;
    this.availableQuantity = availableQuantity;
    this.price = price;
    this.testDescriptors = testDescriptors;
}

//GET /api/skus

router.get('/api/skus', (req, res) => {
    sku.getSKU(req.body).then(
        function (sku) { return res.status(200).json(sku); },
        function (error) { console.log(error); }
    );
});

//GET /api/skus/:id

router.get('/api/skus/:id', (req, res) => {
    sku.getSKUbyID(req.body).then(
        function (sku) { return res.status(200).json(sku); },
        function (error) { console.log(error); }
    );
});

//POST /api/sku

router.post('/api/sku', (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(422).json({ error: 'Empty body request' });
    }
    sku.newSKU(req.body).then(
        function (sku) { return res.status(200).json(sku); },
        function (error) { console.log(error); }
    );

    let message = {
        message: 'Received new SKU addition request',
        received: req.body
    }
    return res.status(201).json(message);
});

//PUT /api/sku/:id

router.put('/api/sku/:id', (req, res) => {
    sku.modifySKU(req.body);
});

//PUT /api/sku/:id/position

router.put('/api/sku/:id/position', (req, res) => {
    sku.modifySKUPosition(req.body);
});
    

//DELETE /api/skus/:id

router.delete('/api/skus/:id', (req, res) {
    sku.deleteSKUbyID(req.body);
});