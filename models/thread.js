'use strict'
const { Model } = require('sequelize')

const SequelizeSlugify = require('sequelize-slugify')

module.exports = (sequelize, DataTypes) => {
  class Thread extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here

      Thread.belongsTo(models.User, { foreignKey: 'userId' })
      Thread.belongsTo(models.Channel, { foreignKey: 'channelId' })

      Thread.hasMany(models.Reply)
    }
  }
  Thread.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      slug: {
        type: DataTypes.STRING,
        unique: true
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      channelId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM('UNSOLVED', 'SOLVED'),
        allowNull: false,
        defaultValue: 'UNSOLVED'
      },
      isLocked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      lastRepliedAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    },
    {
      sequelize,
      modelName: 'Thread'
    }
  )

  SequelizeSlugify.slugifyModel(Thread, { source: ['title'] })
  return Thread
}
