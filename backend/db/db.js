const Sequelize = require('sequelize');

// On utilise dotenv pour cacher les informations sensibles grâces à des variables d'environnement
require('dotenv').config();

// On initialise notre objet Sequelize qui va nous permettre de manipuler la base de donnée
module.exports = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, 
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        port: process.env.DB_PORT
    }
);