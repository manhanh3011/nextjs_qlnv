'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn(
      'users_import_raw',
      'gender',
      {
        type: Sequelize.STRING(50),
        allowNull: true,
      }
    );

    await queryInterface.changeColumn(
      'users_import_raw',
      'level',
      {
        type: Sequelize.STRING(50),
        allowNull: true,
      }
    );

    await queryInterface.changeColumn(
      'users_import_raw',
      'status',
      {
        type: Sequelize.STRING(50),
        allowNull: true,
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn(
      'users_import_raw',
      'gender',
      {
        type: Sequelize.ENUM(
          'MALE',
          'FEMALE',
          'OTHER'
        ),
        allowNull: false,
      }
    );

    await queryInterface.changeColumn(
      'users_import_raw',
      'level',
      {
        type: Sequelize.ENUM(
          'INTERN',
          'FRESHER',
          'JUNIOR',
          'MIDDLE',
          'SENIOR',
          'TECH_LEAD'
        ),
        allowNull: false,
      }
    );

    await queryInterface.changeColumn(
      'users_import_raw',
      'status',
      {
        type: Sequelize.ENUM(
          'ACTIVE',
          'INACTIVE'
        ),
        allowNull: false,
      }
    );
  },
};