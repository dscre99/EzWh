const express = require('express');
const router = express.Router()
const sku = require('SKU_Item_dao')

class SKUItem{

    #rfid = "";
    #SKUId = undefined;
    #available = undefined;
    #DateOfStock = "";

    constructor(rfid, SKUId, DateOfStock) {
        this.#rfid = rfid;
        this.#SKUId = SKUId;
        this.#available = 0;
        this.#DateOfStock = DateOfStock;
    }

    getRfid() {
        return this.#rfid;
    }

    getSKUId() {
        return this.#SKUId;
    }

    getAvailability() {
        return this.#available;
    }

    getDateOfStock() {
        return this.#DateOfStock;
    }

}