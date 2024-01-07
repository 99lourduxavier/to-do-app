import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from './index';

interface TodoAttributes {
  id: number;
  title: string;
  description: string | null;
}

interface TodoCreationAttributes extends Optional<TodoAttributes, 'id'> {}

class Todo extends Model<TodoAttributes, TodoCreationAttributes> implements TodoAttributes {
  public id!: number;
  public title!: string;
  public description!: string | null;

  // associations
  public static associate(models: any): void {
    Todo.belongsTo(models.User, { foreignKey: 'userId' });
  }
}

Todo.init(
  {
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
);

export default Todo;
export { TodoAttributes, TodoCreationAttributes };
