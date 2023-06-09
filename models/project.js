const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config");

class Project extends Model {}

Project.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
      },
    },
  },
  {
    sequelize,
  }
);

module.exports = Project;
