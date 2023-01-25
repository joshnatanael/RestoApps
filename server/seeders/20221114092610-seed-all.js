'use strict';

const { hashPassword } = require('../helpers/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', require('../data/data.json').User.map(el=>{
      el.password = hashPassword(el.password);
      el.createdAt = el.updatedAt = new Date();
      return el;
    }));
    await queryInterface.bulkInsert('Categories', require('../data/data.json').Category.map(el=>{
      el.createdAt = el.updatedAt = new Date();
      return el;
    }));
    await queryInterface.bulkInsert('Food', require('../data/data.json').Food.map(el=>{
      el.createdAt = el.updatedAt = new Date();
      return el;
    }));
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Categories', null, {});
    await queryInterface.bulkDelete('Food', null, {});
  }
};
