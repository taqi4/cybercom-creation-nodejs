'use strict';

const { SequelizeStorage } = require("umzug");

module.exports = {
  async up({context : queryInterface}) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      
      userName: {
        type: Sequelize.STRING
        
      },
      password:{
        type:Sequelize.STRING
      },
      role:{
        type:Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down({context : queryInterface}) {
    await queryInterface.dropTable('Users');
  }
};