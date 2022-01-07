const express = require('express');

// On importe les détails de la base de donnée
const Db = require('./db/db.js');

// On importe les différentes routes de notre application
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');

// Création de notre application express
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

app.use('/api/users', userRoutes); // Gestion des routes dédiées aux utilisateurs
app.use('/api/posts', postRoutes); // Gestion des routes dédiées aux publications
app.use('/api/comments', commentRoutes); // Gestion des routes dédiées aux commentaire

// A décommenter si on veut initialiser (voire forcer un refresh à 0) de la base de donnée
// Db.sync({
//     force : true
// })
//     .then(function(){
//         console.log('Connexion à la Bdd')
//     })
//     .catch(function(err){
//         console.log(err)
//     });

module.exports = app;