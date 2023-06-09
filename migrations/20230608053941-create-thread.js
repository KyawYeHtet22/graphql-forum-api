'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Threads', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      slug: {
        type: Sequelize.STRING,
        unique: true
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false
      },
      channelId: {
        type: Sequelize.UUID,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('UNSOLVED', 'SOLVED'),
        allowNull: false,
        defaultValue: 'UNSOLVED'
      },
      isLocked: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      lastRepliedAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Threads')
  }
}
