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
                        // Si on ne trouve pas d'utilisateur ayant le même nom d'utilisateur, alors
                        // Création d'un nouvel utilisateur à partir du nom d'utilisateur, de l'email rentré et du hash ainsi créé
                        User.create({
                            username: req.body.username,
                            email: req.body.email,
                            password: hash
                        })
                            .then(function(){
                                res.status(201).json({message: "Utilisateur créé !"});
                            })
                            .catch(function(error){
                                res.status(500).json({error})
                            });
                    } else {
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
                return res.status(404).json({message : "Utilisateur non trouvé !"});
            }
            // On compare le mot de passe rentré et le mot de passe en bdd grace à bcrypt
            bcrypt.compare(req.body.password, user.password)
                .then(function(valid){
                    if (!valid){
                        return res.status(500).json({message : "Mot de passe incorrect !"});
                    }
                    // Si tout se passe bien, on renvoie un status 200 et un objet JSON avec un userId, son username, son status d'admin
                    // Et un TOKEN qui expire au bout de 24h
                    res.status(200).json({
                        userId: user.id,
                        username: user.username,
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

// Middleware qui gère la récupération de tous les utilisateurs depuis la bdd
exports.findUsers = function(req, res, next){
    // On cherche tous les utilisateurs en excluant le mot de passe
    User.findAll({
        attributes: { exclude : ['password'] }
    })
        .then(function(users){
            if (!users){
                return res.status(404).json({message : "Aucun utilisateurs n'a été trouvé !"});
            }
            res.status(200).json(users);
        })
        .catch(function(error){
            res.status(500).json({error});
        })
}

// Middleware qui gère la récupération d'un utilisateur depuis la bdd
exports.findOneUser = function(req, res, next){
    // On cherche l'utilisateur avec l'id présent dans la requête dans la bdd en excluant le mot de passe
    User.findOne({
        attributes: { exclude : ['password'] },
        where : { 
            id : req.params.id 
        }
    })
        .then(function(user){
            if (!user){
                return res.status(404).json({message : "Utilisateur non trouvé !"});
            }
            res.status(200).json(user);
        })
        .catch(function(error){
            res.status(500).json({error});
        })
}

// Middleware qui gère la récupération du nom d'utilisateur d'un utilisateur depuis la bdd
exports.findOneUsername = function(req, res, next){
    // On cherche l'utilisateur avec l'id présent dans la requête dans la bdd en ne voulant que le nom d'utilisateur
    User.findOne({
        attributes : ['username'],
        where : { 
            id : req.params.id 
        }
    })
        .then(function(user){
            if (!user){
                return res.status(404).json({message : "Utilisateur non trouvé !"});
            }
            res.status(200).json(user);
        })
        .catch(function(error){
            res.status(500).json({error});
        })
}

// Middleware qui gère la modification d'un utilisateur avec un id donné
exports.editUser = function(req, res, next){
    const userObject = req.body.user;
    // On cherche l'utilisateur en bdd pour voir avec un id donné
    // 4 cas alors    
    User.findOne({
        where : {
            id : req.params.id
        }
    })
        .then(function(user) {
            if (!user){
                return res.status(404).json({error : "Utilisateur non trouvé !"});
            }
            if (userObject.newPassword){
                // Si l'utilisateur modifie son mot de passe, alors on vérifie si il a bien rentré son vieux mot de passe
                bcrypt.compare(userObject.oldPassword, user.password)
                    .then(function(valid){
                        if (!valid){
                            return res.status(500).json({message : "Ancien mot de passe non valide !"});
                        } else {
                            bcrypt.hash(userObject.newPassword, 10) // On hash avec bcrypt en salant 10 fois
                                .then(function(hash){
                                    userObject.password = hash
                                    if (userObject.username != user.username){
                                        // Si l'utilisateur modifie son nom d'utilisateur
                                        // Alors on cherche si ce nom n'est pas déjà pris
                                        // Cas N°1 : modification nom d'utilisateur + mot de passe
                                        User.findOne({
                                            where : {
                                                username : userObject.username
                                            }
                                        })
                                            .then(function(userFound){
                                                if (userFound){
                                                    return res.status(500).json({message : "Nom d'utilisateur déjà utilisé !"});
                                                } else {
                                                    delete userObject.newPassword;
                                                    delete userObject.oldPassword;
                                                    User.update(userObject,{
                                                        where : {
                                                            id : req.params.id
                                                        }
                                                    })
                                                        .then(function(){
                                                            res.status(200).json({message : 'Utilisateur modifié !'})
                                                        })
                                                        .catch(function(error){
                                                            res.status(500).json({error})
                                                        });
                                                }
                                            })
                                            .catch(function(error){
                                                return res.status(500).json({error});
                                            })
                                    } else {
                                        // Si l'utilisateur ne modifie pas son nom d'utilisateur
                                        // Cas N°2 : modification mot de passe uniquement
                                        delete userObject.newPassword;
                                        delete userObject.oldPassword;
                                        User.update(userObject,{
                                            where : {
                                                id : req.params.id
                                            }
                                        })
                                            .then(function(){
                                                res.status(200).json({message : 'Utilisateur modifié !'})
                                            })
                                            .catch(function(error){
                                                res.status(500).json({error})
                                            });
                                    }
                                })
                                .catch(function(error){
                                    res.status(500).json({error})
                                })
                        }
                    })
                    .catch(function(error){
                        res.status(500).json({error});
                    });
            } else {
                // Si l'utilisateur ne modifie pas son mot de passe
                if (userObject.username != user.username){
                    // Si l'utilisateur modifie son nom d'utilisateur
                    // Alors on cherche si ce nom n'est pas déjà pris
                    // Cas N°3 : modification nom d'utilisateur uniquement
                    User.findOne({
                        where : {
                            username : userObject.username
                        }
                    })
                        .then(function(userFound){
                            if (userFound){
                                return res.status(500).json({message : "Nom d'utilisateur déjà utilisé !"});
                            } else {
                                delete userObject.newPassword;
                                delete userObject.oldPassword;
                                console.log("nom d'utilisateur", userObject);
                                User.update(userObject,{
                                    where : {
                                        id : req.params.id
                                    }
                                })
                                    .then(function(){
                                        res.status(200).json({message : 'Utilisateur modifié !'})
                                    })
                                    .catch(function(error){
                                        res.status(500).json({error})
                                    });
                            }
                        })
                        .catch(function(error){
                            return res.status(500).json({error});
                        })
                } else {
                    // Si l'utilisateur ne modifie pas son nom d'utilisateur
                    // Cas N°4 : modification ni du mot de passe ni du nom d'utilisateur
                    delete userObject.newPassword;
                    delete userObject.oldPassword;
                    console.log("aucun", userObject);
                    User.update(userObject,{
                        where : {
                            id : req.params.id
                        }
                    })
                        .then(function(){
                            res.status(200).json({message : 'Utilisateur modifié !'})
                        })
                        .catch(function(error){
                            res.status(500).json({error})
                        });
                }
            }
        })
        .catch(function(error){
            res.status(500).json({error});
        })
}

// Middleware qui gère la suppression d'un utilisateur avec un id donné de la bdd
exports.deleteUser = function(req, res, next){
    // On supprime l'utilisateur dans la bdd
    User.destroy({
        where : { 
            id : req.params.id
        }
    })
        .then(function(){
            res.status(200).json({message : "L'utilisateur a bien été supprimé"});
        })
        .catch(function(error){
            res.status(500).json({error});
        });
}