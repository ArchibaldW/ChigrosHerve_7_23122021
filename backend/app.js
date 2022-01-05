const express = require('express');
const Db = require('./db/db.js');

// Donne accès au système de fichier
const path = require('path');

// On importe les différentes routes de notre application
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');

// On utilise dotenv pour cacher les informations sensibles grâces à des variables d'environnement
require('dotenv').config();

const app = express();

// Création d'un middleware Header pour contourner les erreurs CORS
app.use(
    function(req, res, next) {
        // On indique que les ressources peuvent être partagées depuis tous les orgines
        res.setHeader('Access-Control-Allow-Origin', '*');
        // On indique les entêtes qui seront utilisées après la pré-vérification cross-origin afin de donner l'autorisation
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, x-access-token, Content, Accept, Content-Type, Authorization');
        // On indique les méthodes autorisées pour les requêtes HTTP
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
        next();
    }
);

app.use(express.json()); // Transforme les données des requêtes en un objet JSON

// Ce Midleware permet de charger les fichiers qui sont dans le repertoire images et de gérer les ressources d'images de façon statique
app.use('/images', express.static(path.join(__dirname,'images')));

//app.use('/api/sauces', sauceRoutes); // Gestion des routes dédiées aus sauces
app.use('/api/users', userRoutes); // Gestion des routes dédiées aux utilisateurs
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

Db.sync({
    // force : true
})
    .then(function(){
        console.log('Connexion à la Bdd')
    })
    .catch(function(err){
        console.log(err)
    });


module.exports = app;