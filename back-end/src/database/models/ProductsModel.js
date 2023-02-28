module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    urlImage: DataTypes.STRING,
  }, 
  {
  underscored: true,
  timestamps: false,
  modelName: 'products',
  });

  
  return Product;
}