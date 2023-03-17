const express = require('express');
const salesController = require('../controllers/salesController');
const { validateTokenMiddle } = require('../middlewares/tokenMiddlewares');

const salesRouter = express.Router();

salesRouter.get('/customer/:id', validateTokenMiddle, salesController.getUserId);
salesRouter.post('/', validateTokenMiddle, salesController.createSale);
salesRouter.patch('/:id', validateTokenMiddle, salesController.updateStatus);
salesRouter.get('/:id', validateTokenMiddle, salesController.getSaleById);
salesRouter.get('/seller/:id', validateTokenMiddle, salesController.getSellerId);

module.exports = salesRouter;
