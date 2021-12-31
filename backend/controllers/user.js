// Controller où se trouve la logique métier liée à la gestion des utilisateurs

// Importation de bcrypt pour hasher le mot de passe utilisateur
const bcrypt = require('bcrypt');

// Importation de jwt pour attribuer et gérer un token à un utilisateur quand il se connecte
const jwt = require('jsonwebtoken');

// On importe le model User avec le schema mongoose pour traiter les données utilisateurs
const User = require('../models/User');

// On utilise dotenv pour cacher les informations sensibles grâces à des variables d'environnement
require('dotenv').config();

// Middleware qui gère l'inscription d'un utilisateur, crypte son mot de passe avec bcrypt et le sauvegarde dans la base de données
exports.signup = function(req, res, next){
    bcrypt.hash(req.body.password, 10) // On hash avec bcrypt en salant 10 fois
        .then(function(hash){
            User.findOne({
                where : { 
                    username : req.body.username 
                }
            })
                .then(function(user){
                    if (!user){
                        // Création d'un nouvel utilisateur à partir de l'email rentré et du hash ainsi créé
                        User.create({
                            username: req.body.username,
                            email: req.body.email,
                            password: hash
                        })
                        .then(function(){
                            res.status(201).json({message: "Utilisateur créé !"});
                        })
                        .catch(function(error){
                            res.status(400).json({error})
                        });
                    } else {
                        console.log('trouvé1');
                        res.status(500).json({message: "Nom d'utilisateur déjà utilisé !"})
                    }
                })
                .catch(function(error){
                    res.status(500).json({error})
                }); 
        })
        .catch(function(error){
            res.status(500).json({error})
        })
}

//Middleware qui gère la connection d'un utilisateur et lui génère un token temporaire
exports.login = function(req, res, next){
    // On cherche si l'utilisateur existe bien dans la base de données
    User.findOne({
        where : { 
            username : req.body.username 
        }
    })
        .then(function(user){
            if (!user){
                return res.status(401).json({message : "Utilisateur non trouvé !"});
            }
            // On compare le mot de passe rentré et le mot de passe en bdd grace à bcrypt
            bcrypt.compare(req.body.password, user.password)
                .then(function(valid){
                    if (!valid){
                        return res.status(401).json({message : "Mot de passe incorrect !"});
                    }
                    // Si tout se passe bien, on renvoie un status 200 et un objet JSON avec un userId et un TOKEN qui expire au bout de 24h
                    res.status(200).json({
                        userId: user.id,
                        token: jwt.sign(
                            {userId: user._id},
                            process.env.SECRET_TOKEN,
                            {expiresIn: "24h"}
                        ),
                        admin: user.admin
                    });
                })
                .catch(function(error){
                    res.status(500).json({error});
                });
        })
        .catch(function(error){
            res.status(500).json({error});
        });
}

exports.profile = function(req, res, next){
    User.findOne({
        where : { 
            id : req.params.id 
        }
    })
        .then(function(user){
            if (!user){
                return res.status(401).json({message : "Utilisateur non trouvé !"});
            }
            res.status(200).json(user);

        })
        .catch(function(error){
            res.status(500).json({error});
        })
}