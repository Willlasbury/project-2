const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config');

class User extends Model {}

User.init({
    // add properites here, ex:
    username: {
        type: DataTypes.STRING,
        allowNull:false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull:false,
        validate: {
            len:[8]
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull:false,
        type: TEXT
    }

},{
    sequelize
});

module.exports=User