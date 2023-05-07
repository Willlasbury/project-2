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
    username: {
        type: DataTypes.STRING,
        unique:true,
        allowNull: false
    },
    
    email: {
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
    sequelize,
    hooks:{
        beforeCreate: zooObj=>{
            zooObj.password = bcrypt.hashSync(zooObj.password,3);
            return zooObj;
        }
    }
});

module.exports=User