const { Sale, SalesProducts, Product, User } = require('../database/models');

const getUserId = async (userId) => {
  const sales = await Sale.findAll({ where: { userId } });
  return sales;
};

const createSale = async ({
  userId,
  sellerId,
  totalPrice,
  deliveryAddress,
  deliveryNumber,
  saleDate,
  status,
  products,
}) => {
  const saleCreated = await Sale.create({
    userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, saleDate, status,
  });
  await Promise.all(products.map(async (product) => SalesProducts.create({
    productId: product.id, saleId: saleCreated.dataValues.id, quantity: product.quantity,
  })));
  return saleCreated;
};

const updateStatus = async (id, status) => {
  const update = await Sale.update({ status }, { where: { id } });
  return update;
};

const getSaleById = async (id) => {
  const sales = await Sale.findOne({
    where: { id },
    include: [
      { model: User, as: 'seller', attributes: ['name'] },
      { model: Product, as: 'products', through: { attributes: ['quantity'] } },
    ],
    attributes: { exclude: ['deliveryAddress', 'deliveryNumber', 'sellerId'] },
  });
  return sales;
};

const getSellerId = async (sellerId) => {
  const sales = await Sale.findAll({ where: { sellerId } });
  return sales;
};

module.exports = {
  getUserId,
  createSale,
  updateStatus,
  getSaleById,
  getSellerId,
};
