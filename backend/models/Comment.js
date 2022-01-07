const DataTypes = require ('sequelize');
const Db = require('../db/db.js');
const User = require('../models/User');
const Post = require('../models/Post');

// On défini le model lié aux commentaires
// Le texte est requis à la création
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

// Chaque commentaire est lié à un utilisateur,
// Si un utilisateur est supprimé, alors on supprime ses commentaires
Comment.belongsTo(User,{
    onDelete: 'CASCADE',
    foreignKey: {
        name: 'userId',
        allowNull: false,
    }
});

// Chaque commentaire est lié à une publication,
// Si une publication est supprimée, alors on supprime ses commentaires
Comment.belongsTo(Post,{
    onDelete: 'CASCADE',
    foreignKey: {
        name: 'postId',
        allowNull: false,
    }
});

module.exports = Comment;