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
                return res.status(500).json({message : "Utilisateur non trouvé !"});
            }
            // On compare le mot de passe rentré et le mot de passe en bdd grace à bcrypt
            bcrypt.compare(req.body.password, user.password)
                .then(function(valid){
                    if (!valid){
                        return res.status(500).json({message : "Mot de passe incorrect !"});
                    }
                    // Si tout se passe bien, on renvoie un status 200 et un objet JSON avec un userId et un TOKEN qui expire au bout de 24h
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

exports.findUsers = function(req, res, next){
    User.findAll({
        attributes: { exclude : ['password', 'createdAt', 'updatedAt']}
    })
        .then(function(list){
            if (!list){
                return res.status(500).json({message : "Aucun utilisateurs n'a été trouvé !"});
            }
            res.status(200).json(list);
        })
        .catch(function(error){
            res.status(500).json({error});
        })
}

exports.findOneUser = function(req, res, next){
    User.findOne({
        where : { 
            id : req.params.id 
        }
    })
        .then(function(user){
            if (!user){
                return res.status(500).json({message : "Utilisateur non trouvé !"});
            }
            res.status(200).json(user);
        })
        .catch(function(error){
            res.status(500).json({error});
        })
}

exports.editUser = function(req, res, next){
    const userObject = req.body.user;
    User.findOne({
        where : {
            id : req.params.id
        }
    })
        .then(function(user) {
            if (!user){
                return res.status(401).json({error : "Utilisateur non trouvé !"});
            }
            if (userObject.newPassword){
                bcrypt.compare(userObject.oldPassword, user.password)
                    .then(function(valid){
                        if (!valid){
                            return res.status(500).json({message : "Ancien mot de passe non valide !"});
                        } else {
                            bcrypt.hash(userObject.newPassword, 10) // On hash avec bcrypt en salant 10 fois
                                .then(function(hash){
                                    userObject.password = hash
                                    if (userObject.username != user.username){
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
                                                    console.log("mot de passe + nom d'utilisateur", userObject);
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
                                        delete userObject.newPassword;
                                        delete userObject.oldPassword;
                                        console.log("mot de passe",userObject);
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
                if (userObject.username != user.username){
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

exports.deleteUser = function(req, res, next){
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