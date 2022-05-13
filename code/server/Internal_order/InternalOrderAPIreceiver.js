const express = require('express');
const router = express.Router();
const DB = require('../EZWH_db/EZWH_db.js');
const InternalOrderDAO = require('./InternalOrderDAO.js')
const InternalOrderDAOinstance = new InternalOrderDAO();

const internalOrderStates = [ 'ISSUED', 'ACCEPTED', 'REFUSED', 'CANCELED', 'COMPLETED' ];

//GET /api/internalOrders
async function get_internal_orders(req, res) {

    let getInternalOrderPromise = InternalOrderDAOinstance.getInternalOrders();
    await getInternalOrderPromise.then(
        function(value) {
            console.log('getInternalOrders resolve');
            return res.status(200).json(value).end();
            //console.log(value);
            //return res.status(200).end(value);
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
                //console.log(req.params);
                // check for empty params
                let order = undefined;
                for (let i = 0; i < value.length; i++) {
                    if(value[i].id == req.params.id){
                        order = value[i];
                    }
                    
                }

                if(order != undefined) {
                    console.log(order);
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

module.exports = { get_internal_orders, get_issued_orders, get_accepted_orders, get_internal_order_by_id }