const bcrypt = require('bcrypt')
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config');

class User extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
      }
}

User.init({
    // add properites here, ex:
    userName: {
        type: DataTypes.STRING,
        unique:true,
        allowNull: false
    },
    
    password: {
        type: DataTypes.STRING,
        allowNull:false,
        validate: {
            len:[8],
            isAlphanumeric: true
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull:false,
        unique: true,
        validate: {
            isEmail: true
        }
    }

},{
    sequelize,
    hooks:{
        beforeCreate: userObj=>{
            userObj.password = bcrypt.hashSync(userObj.password,3);
            return userObj;
        }
    }
});

module.exports=User