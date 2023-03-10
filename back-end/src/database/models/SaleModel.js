module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER, 
      foreignKey: true
    },
    sellerId: {
      type: DataTypes.INTEGER, 
      foreignKey: true
    },
    totalPrice: DataTypes.DECIMAL,
    deliveryAddress: DataTypes.STRING,
    deliveryNumber: DataTypes.STRING,
    saleDate: DataTypes.DATE,
    status: DataTypes.STRING,
  }, 
  {
  underscored: true,
  timestamps: false,
  modelName: 'sales',
  });

  Sale.associate = (models) => {
    Sale.hasMany(models.SalesProducts, {
      as: 'sales_id',
      foreignKey: 'saleId',
    });
    Sale.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    Sale.belongsTo(models.User, { foreignKey: 'sellerId', as: 'seller' });
  };
  
  return Sale;
}