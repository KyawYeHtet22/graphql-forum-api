'use strict'

const uuid = require('uuid')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Channels',
      [
        {
          id: uuid.v4(),
          name: 'General',
          slug: 'general',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuid.v4(),
          name: 'AdonisJS',
          slug: 'adonisjs',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuid.v4(),
          name: 'Vue',
          slug: 'vue',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Channels', null, {})
  }
}
