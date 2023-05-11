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
      type: DataTypes.DATE,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
  }
);

module.exports = Task;
