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
    totalPrice: DataTypes.DOUBLE,
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
    Sale.hasMany(models.User,
      { foreignKey: 'user_id', as: 'user' }, 
      { foreignKey: 'seller_id', as: 'seller' });
  };
  
  return Sale;
}