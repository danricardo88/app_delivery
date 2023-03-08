const salesService = require('../services/salesService');

const getUserId = async (req, res) => {
  const { id } = req.params;
  const sales = await salesService.getUserId(id);
  if (sales.length <= 0) return res.status(404).json({ message: 'sale not found'});
  return res.status(200).json(sales); 
};

const createSale = async (req, res) => {
  const newSale = req.body;
  const createdSale = await salesService.createSale(newSale)
  return res.status(201).json(createdSale);
};

const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const updatedSale = await salesService.updateStatus(id, status);
  return res.status(204).json(updatedSale);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const sale = await salesService.getSaleById(Number(id));
  if (!sale) return res.status(404).json({ message: 'sale not found'});
  return res.status(200).json(sale);
};

const getSellerId = async (req, res) => {
  const { id } = req.params;
  const sales = await salesService.getSellerId(Number(id));
  if (sales.length <= 0) return res.status(404).json({ message: 'sale not found'});
  return res.status(200).json(sales);
};


module.exports = {
  getUserId,
  createSale,
  updateStatus,
  getSaleById,
  getSellerId,
};
