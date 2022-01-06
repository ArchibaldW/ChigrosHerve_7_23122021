const DataTypes = require ('sequelize');

const Db = require('../db/db.js');

const User = Db.define('User', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey : true,
        autoIncrement : true,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    phoneNumber: {
        type: DataTypes.STRING(10),
        allowNull: true
    },
    admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    },
    
},
{
    timestamps : false
});


module.exports = User;