import { Sequelize, DataTypes } from 'sequelize';
import { sequelizeConfig } from '../config/database';
import User, { UserAttributes, UserCreationAttributes } from './User';
import Todo, { TodoAttributes, TodoCreationAttributes } from './Todo';

const sequelize = new Sequelize(sequelizeConfig);

// models
const models = {
  User: User.init(
    {
      // user properties
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  ),
  Todo: Todo.init(
    {
      //todo properties
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Todo',
    }
  ),
};

Object.values(models).forEach((model) => {
  if (typeof model.associate === 'function') {
    model.associate(models);
  }
});

export { sequelize, models };
export type { UserAttributes, UserCreationAttributes, TodoAttributes, TodoCreationAttributes };
