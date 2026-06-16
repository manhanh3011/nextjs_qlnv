'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'firstName', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '',
    });

    await queryInterface.addColumn('users', 'lastName', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '',
    });

    await queryInterface.removeColumn('users', 'fullName');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'fullName', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '',
    });

    await queryInterface.removeColumn('users', 'firstName');

    await queryInterface.removeColumn('users', 'lastName');
  }
};
