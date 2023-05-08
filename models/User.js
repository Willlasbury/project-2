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
            len:[8]
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull:false,
        validate: {
            isEmail: true
        }
    }

},{
    sequelize,
    // hooks:{
    //     beforeCreate: zooObj=>{
    //         zooObj.password = bcrypt.hashSync(zooObj.password,3);
    //         return zooObj;
    //     }
    // }
});

module.exports=User