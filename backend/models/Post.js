const DataTypes = require ('sequelize');

const Db = require('../db/db.js');

const User = require('../models/User');

const Post = Db.define('Post', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey : true,
        autoIncrement : true,
        allowNull: false
    },
    title : {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    text: {
        type: DataTypes.STRING(1000),
        allowNull: false
    },
    lastEditUserId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true
    }
});

Post.belongsTo(User,{
    onDelete: 'CASCADE',
    foreignKey: {
        name: 'userId',
        allowNull: false,
    }
});


module.exports = Post;