class Restock_orderDAO{
    sqlite = require('sqlite3');

    constructor(dbname) {
        this.db = new this.sqlite.Database(dbname, (err) => {
            if(err) throw err;
        });
    }
    // RESTOCK ORDER TABLE
    dropTableRestockOrder() {
        return new Promise((resolve, reject)  => {
            const sql = 'DROP TABLE IF EXISTS RESTOCK_ORDER';
            this.db.run(sql, (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(this.lastID);
            });
        });
    }

    newTableRestockOrder() {
        return new Promise((resolve, reject)  => {
            const sql = 'CREATE TABLE IF NOT EXISTS RESTOCK_ORDER(ID INTEGER PRIMARY KEY AUTOINCREMENT, ISSUEDATE DATETIME, STATE VARCHAR, SUPPLIERID INTEGER REFERENCES SUPPLIERD(ID), TRANSPORTNOTE DATE  )';
            this.db.run(sql, (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve('RESTOCK_ORDER');
            });
        });
    }

    //PRODUCTS TABLE: N-N from Restock_Order to SKU
    dropTableProducts() {
        return new Promise((resolve, reject)  => {
            const sql = 'DROP TABLE IF EXISTS PRODUCTS';
            this.db.run(sql, (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(this.lastID);
            });
        });
    }

    newTableProducts() {
        return new Promise((resolve, reject)  => {
            const sql = 'CREATE TABLE IF NOT EXISTS PRODUCTS(ORDERID INEGER REFERENCES RESTOCK_ORDER(ID), SKUID INTEGER REFERENCES SKU(ID), PRIMARY KEY(ORDERID,SKUID), DESCRIPTION VARCHAR, PRICE REAL, QUANTITY INT )';
            this.db.run(sql, (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve('RESTOCK_ORDER');
            });
        });
    }

    // ITEMS TABLE: N-N from Restock_Order to SKUItem
    dropTableItems() {
        return new Promise((resolve, reject)  => {
            const sql = 'DROP TABLE IF EXISTS ITEMS';
            this.db.run(sql, (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(this.lastID);
            });
        });
    }

    newTableItems() {
        return new Promise((resolve, reject)  => {
            const sql = 'CREATE TABLE IF NOT EXISTS ITEMS(ORDERID INEGER REFERENCES RESTOCK_ORDER(ID), SKUID INTEGER , RFID INTEGER, (SKUID, RFID) REFERENCES SKUITEM(ID,RFID), PRIMARY KEY(ORDERID,SKUID,RFID) )';
            this.db.run(sql, (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve('RESTOCK_ORDER');
            });
        });
    }

    // GETTERS

    getProducts(data){
        return new Promise((resolve, reject) => {
            const sql = 'SELECT SKUID, DESCRIPTION, PRICE, QUANTITY FROM PRODUCTS WHERE ORDERID=? ';
            this.db.all(sql, [data.id], (err, rows) => {
                if(err){
                    reject(err);
                    return;
                }
                const products = rows.map((r) => (
                    {
                        id:r.SKUID,
                        description:r.DESCRIPTION,
                        price:r.PRICE,
                        quantity:r.QUANTITY,
                    }
                ));
                resolve(products);
            });
        });
    }

    //corrisponde anche a returnItems 
    getSKUItems(data){
        return new Promise((resolve, reject) => {
            const sql = 'SELECT SKUID, RFID, FROM ITEMS WHERE ORDERID=? ';
            this.db.all(sql, [data.id], (err, rows) => {
                if(err){
                    reject(err);
                    return;
                }
                const products = rows.map((r) => (
                    {
                        id:r.SKUID,
                        rfid:r.RFID,
                       
                    }
                ));
                resolve(products);
            });
        });
    }

    getRestockOrders() {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM RESTOCK_ORDER ';
            this.db.all(sql, (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                const resOrders = rows.map((r) => (
                    {
                        id: r.ID,
                        issueDate: r.issueDate,
                        state: r.state,
                        products: this.getProducts(r.ID),
                        supplierId: r.supplierId,
                        transportNote: r.transportNote,
                        skuItems: this.getSKUItems(r.ID),
                    }
                ));
                resolve(resOrders);
            });
        });
    }

    getRestockOrdersIssued() {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM RESTOCK_ORDER WHERE STATE="ISSUED" ';
            this.db.all(sql, (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                const resOrders = rows.map((r) => (
                    {
                        id: r.ID,
                        issueDate: r.issueDate,
                        state: r.state,
                        products: this.getProducts(r.ID),
                        supplierId: r.supplierId,
                        transportNote: r.transportNote,
                        skuItems: [],
                    }
                ));
                resolve(resOrders);
            });
        });
    }


    getRestockOrderByID(data) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM RESTOCK_ORDER WHERE ID= ? ';
            this.db.all(sql, [data.id], (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                const resOrder = rows.map((r) => (
                    {
                        id: r.ID,
                        issueDate: r.issueDate,
                        state: r.state,
                        products: this.getProducts(r.ID),
                        supplierId: r.supplierId,
                        transportNote: r.transportNote,
                        skuItems: this.getSKUItems(r.ID),
                    }
                ));
                resolve(resOrder[0]);
            });
        });
    }

    //POST

    storeRestockOrder(data){
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO RESTOCK_ORDER(ISSUEDATE, STATE, SUPPLIERID) VALUES (?, "ISSUED", ?)';
            this.db.run(sql, [data.issueDate, data.state, data.supplierId], (err) => {
                if (err) {
                    reject(err);
                    return
                }
                resolve(data.id);
            });
        });
    }
 
    storeProduct(data) {
        return new Promise((resolve, reject) => {
            const sql = ' INSERT INTO PRODUCTS (ORDERID,SKUID,DESCRIPTION, PRICE, QUANTITY) VALUES (?,?,?,?,?) ';
            this.db.run(sql, [data.orderid,data.skuid,data.description,data.price,data.quantity], (err) => {
                if (err) {
                    reject(err);
                    return
                }
                resolve(data.id);
            });
        });
    }

    storeItem(data) {
        return new Promise((resolve, reject) => {
            const sql = ' INSERT INTO ITEMS (ORDERID,SKUID,RFID) VALUES (?,?,?) ';
            this.db.run(sql, [data.orderid,data.skuid,data.rfid], (err) => {
                if (err) {
                    reject(err);
                    return
                }
                resolve(data.id);
            });
        });
    }

    // PUT

    updateState(data) {
        return new Promise((resolve, reject) => {
            const sql = ' UPDATE TABLE RESTOCK_ORDER  SET STATE= ? WHERE ID=? ';
            this.db.run(sql, [data.newState, data.ID], (err) => {
                if (err) {
                    reject(err);
                    return
                }
                resolve(data.id);
            });
        });
    }

    newSKUItem(data) {
        return new Promise((resolve, reject) => {
            const sql = ' INSERT INTO ITEMS (ORDERID,SKUID,RFID) VALUES (?,?,?) ';
            this.db.run(sql, [data.orderid, data.skuid, data.rfid], (err) => {
                if (err) {
                    reject(err);
                    return
                }
                resolve(data.id);
            });
        });
    }

    addTransportNote(data) {
        return new Promise((resolve, reject) => {
            const sql = ' UPDATE TABLE RESTOCK_ORDER  SET TRANSPORTNOTE= ? WHERE ID=? ';
            this.db.run(sql, [data.transportNote, data.ID], (err) => {
                if (err) {
                    reject(err);
                    return
                }
                resolve(data.id);
            });
        });
    }

    //DELETE 
    deleteRestockOrder(data) {
        return new Promise((resolve, reject) => {
            const sql = ' DELETE FROM RESTOCK_ORDER WHERE ID=? ';
            this.db.run(sql, [data.ID], (err) => {
                if (err) {
                    reject(err);
                    return
                }
                resolve(data.id);
            });
        });
    }



    

}

module.exports = Restock_orderDAO;