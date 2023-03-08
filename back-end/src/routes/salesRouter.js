const express = require('express');
const salesController = require('../controllers/salesController');


const salesRouter = express.Router();

salesRouter.get('/customer/:id', salesController.getUserId);
salesRouter.post('/', salesController.createSale);
salesRouter.patch('/:id', salesController.updateStatus);
salesRouter.get('/:id', salesController.getSaleById);
salesRouter.get('/seller/:id', salesController.getSellerId);

module.exports = salesRouter;
