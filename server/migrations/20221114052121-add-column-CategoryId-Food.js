'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn('Food', 'categoryId', { type: Sequelize.INTEGER,
      references: {
        model: "Categories",
        key: 'id'
      },
      onDelete: "cascade",
      onUpdate: "cascade"
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Food', 'categoryId');
  }
};
