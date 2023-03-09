const express = require('express');
const productsController = require('../controllers/productsController');
const { validateTokenMiddle } = require('../middlewares/tokenMiddlewares');

const productsRouter = express.Router();

productsRouter.get('/', validateTokenMiddle, productsController.getAll);

module.exports = productsRouter;