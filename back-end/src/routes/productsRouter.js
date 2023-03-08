const express = require('express');
const productsController = require('../controllers/productsController');
// const { validateTokenMiddle } = require('../middlewares/tokenMiddlewares');

const productsRouter = express.Router();

// colocar middleware do token
productsRouter.get('/', productsController.getAll);

module.exports = productsRouter;