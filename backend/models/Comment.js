const DataTypes = require ('sequelize');

const Db = require('../db/db.js');

const User = require('../models/User');
const Post = require('../models/Post');

const Comment = Db.define('Comment', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey : true,
        autoIncrement : true,
        allowNull: false
    },
    text: {
        type: DataTypes.STRING(1000),
        allowNull: false
    }
});

Comment.belongsTo(User,{
    onDelete: 'CASCADE',
    foreignKey: {
        name: 'userId',
        allowNull: false,
    }
});

Comment.belongsTo(Post,{
    onDelete: 'CASCADE',
    foreignKey: {
        name: 'postId',
        allowNull: false,
    }
});




module.exports = Comment;