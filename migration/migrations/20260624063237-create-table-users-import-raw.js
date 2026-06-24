'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users_import_raw', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      employeeId: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      firstName: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      gender: {
        type: Sequelize.ENUM("MALE", "FEMALE", "OTHER"),
        allowNull: false,
      },
      dateOfBirth: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      address: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      department: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      role: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      level: {
        type: Sequelize.ENUM(
          "INTERN",
          "FRESHER",
          "JUNIOR",
          "MIDDLE",
          "SENIOR",
          "TECH_LEAD",
        ),
        allowNull: false,
      },
      startDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM(
          "ACTIVE",
          "INACTIVE",
        ),
        allowNull: false,
        defaultValue: "ACTIVE",
      },
      isScanned: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      isValid: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      errorMessage: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      processedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users_import_raw')
  }
};
