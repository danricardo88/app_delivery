'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('sales', { 
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        field: 'user_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      sellerId: {
        type: Sequelize.INTEGER,
        field: 'seller_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      totalPrice: {
        type: Sequelize.DOUBLE,
        field: 'total_price',
        allowNull: false,
      },
      deliveryAddress: {
        type: DataTypes.STRING,
        field: 'delivery_address',
        allowNull: false,
      },
      deliveryNumber: {
        type: DataTypes.STRING,
        field: 'delivery_number',
        allowNull: false,
      },
      saleDate: {
        type: DataTypes.DATE,
        field: 'sale_date',
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      }
     });
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.dropTable('sales');
  }
};
