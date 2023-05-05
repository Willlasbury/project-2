const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config");

class Task extends Model {}

Task.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    due_date: {
      type: DataTypes.TIMESTAMP,
      allowNull: true,
    },
    description: {
      type: TEXT,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: False,
    },
  },
  {
    sequelize,
  }
);

module.exports = Task;
