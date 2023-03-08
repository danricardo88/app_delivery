const express = require('express');
const productsController = require('../controllers/productsController');

const registerRouter = express.Router();

registerRouter.get('/', productsController.getAll);

module.exports = registerRouter;