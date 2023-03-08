'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.createTable('products', { 
    id: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    price: {
      type: Sequelize.DECIMAL(10,2),
      allowNull: false,
    },
    urlImage: {
      type: Sequelize.STRING(200),
      field: 'url_image',
      allowNull: false,
    },
    });
  
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.dropTable('products');
    
  }
};
