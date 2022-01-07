const DataTypes = require ('sequelize');
const Db = require('../db/db.js');
const User = require('../models/User');

// On défini le model lié aux publications
// Le titre est unique
// Le texte est requis à la création
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

// Chaque publication est lié à un utilisateur,
// Si un utilisateur est supprimé, alors on supprime ses publications
Post.belongsTo(User,{
    onDelete: 'CASCADE',
    foreignKey: {
        name: 'userId',
        allowNull: false,
    }
});


module.exports = Post;