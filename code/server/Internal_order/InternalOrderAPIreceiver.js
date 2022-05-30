const DB = require('../EZWH_db/RunDB')
const DBinstance = DB.DBinstance;
const InternalOrderDAO = require('./InternalOrderDAO.js')
const InternalOrderDAOinstance = new InternalOrderDAO(DBinstance);


const internalOrderStates = [ 'ISSUED', 'ACCEPTED', 'REFUSED', 'CANCELLED', 'COMPLETED' ];

//GET /api/internalOrders
async function get_internal_orders(req, res) {

    let getInternalOrderPromise = InternalOrderDAOinstance.getInternalOrders();
    await getInternalOrderPromise.then(
        function(value) {
            console.log('getInternalOrders resolve');
            return res.status(200).json(value).end();
        },
        function(error) {
            console.log('getInternalOrders reject');
            return res.status(error).end();
        }
    ).catch(err => function(err) {
        console.log('getInternalOrders error', err);
        return res.status(500).end();   // 500 Internal Server Error
    });
}

//GET /api/internalOrdersIssued
async function get_issued_orders(req, res) {

    let getInternalOrderPromise = InternalOrderDAOinstance.getInternalOrders();
    await getInternalOrderPromise.then(
        function(value) {
            console.log('getInternalOrders resolve');
            let issuedOrders = [];
            for (let i = 0; i < value.length; i++) {
                if(value[i].state == 'ISSUED'){
                    issuedOrders.push(value[i]);
                }
                
            }
            
            return res.status(200).json(issuedOrders).end();
        },
        function(error) {
            console.log('getInternalOrders reject');
            return res.status(error).end();
        }
    ).catch(err => function(err) {
        console.log('getInternalOrders error', err);
        return res.status(500).end();   // 500 Internal Server Error
    });
}

//GET /api/internalOrdersAccepted
async function get_accepted_orders(req, res) {

    let getInternalOrderPromise = InternalOrderDAOinstance.getInternalOrders();
    await getInternalOrderPromise.then(
        function(value) {
            console.log('getInternalOrders resolve');
            let acceptedOrders = [];
            for (let i = 0; i < value.length; i++) {
                if(value[i].state == 'ACCEPTED'){
                    acceptedOrders.push(value[i]);
                }
                
            }
            
            return res.status(200).json(acceptedOrders).end();
        },
        function(error) {
            console.log('getInternalOrders reject');
            return res.status(error).end();
        }
    ).catch(err => function(err) {
        console.log('getInternalOrders error', err);
        return res.status(500).end();   // 500 Internal Server Error
    });
}

//GET /api/internalOrders/:id
async function get_internal_order_by_id(req, res) {

    if(Number.parseInt(req.params.id) > 0){
        let getInternalOrderPromise = InternalOrderDAOinstance.getInternalOrders(req.params);
        await getInternalOrderPromise.then(
            function(value) {
                console.log('getInternalOrders resolve');
                let order = undefined;
                for (let i = 0; i < value.length; i++) {
                    if(value[i].id == req.params.id){
                        order = value[i];
                    }
                    
                }

                if(order != undefined) {
                    return res.status(200).json(order).end();
                } else {
                    return res.status(404).end();   // 404 Not Found
                }
            },
            function(error) {
                console.log('getInternalOrders reject');
                return res.status(error).end();
            }
        ).catch(err => function(err) {
            console.log('getInternalOrders error', err);
            return res.status(500).end();   // 500 Internal Server Error
        });
    } else {
        return res.status(422).end();   // 422 Unprocessable Entity
    }
}

//POST /api/internalOrders
async function create_internal_order(req, res) {
    
    requestedFields = [ 'issueDate', 'products', 'customerId' ];
    if(Object.keys(req.body).length == 0 || Object.keys(req.body).length != requestedFields.length) {
        return res.status(422).end();
    }
    
    for (let i = 0; i < requestedFields.length; i++) {
        if(!Object.keys(req.body).includes(requestedFields[i])){
            return res.status(422).end();
        }
        
        if(req.body[requestedFields[i]] == undefined || req.body[requestedFields[i]] == ''){
            return res.status(422).end();
        }
    }

    if(req.body.customerId <= 0){
        return res.status(422).end();
    }
    

    let createInternalOrderPromise = InternalOrderDAOinstance.createInternalOrder(req.body);
    await createInternalOrderPromise.then(
        function(value) {
            console.log('createInternalOrder resolve');
            return res.status(201).end();
        },
        function(error) {
            console.log('createInternalOrder reject');
            return res.status(error).end();
        }
    ).catch(err => function(err) {
        console.log('createInternalOrder error', err);
        return res.status(500).end();   // 500 Internal Server Error
    });
}

//PUT '/api/internalOrders'
async function modify_internal_order_state(req, res) {

    // check body is not empty
    if (Object.keys(req.body).length === 0) {
        return res.status(422).end(); // 422 Unprocessable Entity
    }

    // body validation
    if(!Object.keys(req.body).includes('newState') || !internalOrderStates.includes(req.body.newState)) {
        return res.status(422).end(); // 422 Unprocessable Entity
    }

    if((req.body.newState == 'COMPLETED') && (!Object.keys(req.body).includes('products'))) {
        return res.status(422).end(); // 422 Unprocessable Entity
    }

    if(Number.parseInt(req.params.id) <= 0) {
        return res.status(422).end(); // 422 Unprocessable Entity
    }

    let data = req.body;
    data['id'] = Number.parseInt(req.params.id);

    let modifyInternalOrderStatePromise = InternalOrderDAOinstance.modifyInternalOrderState(req.body);
    await modifyInternalOrderStatePromise.then(
        function(value) {
            console.log('modifyInternalOrderStatus resolve');
            return res.status(200).end();
        },
        function(error) {
            console.log('modifyInternalOrderStatus reject', error);
            return res.status(error).end();
        }
    ).catch(err => function(err) {
        console.log('modifyInternalOrderStatus error', err);
        return res.status(503).end();   // 503 Service Unavailable
    });
}

//DELETE /api/internalOrders/:id
async function delete_internal_order(req, res) {

    if(Number.parseInt(req.params.id) > 0) {

        let deleteInternalOrderPromise = InternalOrderDAOinstance.deleteInternalOrder(req.params.id);
        await deleteInternalOrderPromise.then(
            function(value) {
                console.log('deleteInternalOrder resolve');
                return res.status(204).end();
            },
            function(error) {
                console.log('deleteInternalOrder reject');
                return res.status(error).end();
            }
        ).catch(err => function(err) {
            console.log('deleteInternalOrder error', err);
            return res.status(500).end();   // 500 Internal Server Error
        });

    } else {

        return res.status(422).end();   // 422 Unprocessable Entity
    }

}


module.exports = { get_internal_orders, get_issued_orders, get_accepted_orders, get_internal_order_by_id,
                    create_internal_order, modify_internal_order_state, delete_internal_order }