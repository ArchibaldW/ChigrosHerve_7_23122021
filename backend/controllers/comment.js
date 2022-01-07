// Controller où se trouve la logique métier liée à la gestion des commentaires

// On importe le model Comment avec le schema sequelize pour traiter les données des commentaires
const Comment = require('../models/Comment');

// Middleware qui gère la récupération d'un commentaire via son Id
exports.findOneComment = function(req, res, next) {
    // On cherche le commentaire avec l'id présent dans la requête dans la bdd
    Comment.findOne({
        where : {
            id : req.params.id
        }
    })
        .then(function(comment){
            if (!comment){
                return res.status(404).json({message : "Commentaire non trouvé !"});
            }
            res.status(200).json(comment);
        })
        .catch(function(error){
            res.status(500).json({error});
        });
};

// Middleware qui gère la récupération des commentaire depuis un postId
exports.findCommentsByPostId = function(req, res, next) {
    // On cherche les commentaire avec le postId présent dans la requête dans la bdd
    // On le cherche dans l'ordre inverse de leur publication pour afficher le plus récent en premier
    Comment.findAll({
        where : {
            postId : req.params.id
        },
        order: [
            ['createdAt', 'DESC']
        ]
    })
        .then(function(comments){
            if (!comments){
                return res.status(404).json({message : "Aucun commentaire n'a été trouvée !"});
            }
            res.status(200).json(comments);
        })
        .catch(function(error){
            res.status(500).json({error});
        });
};

// Middleware qui gère le décompte du nombre de commentaires depuis un postId
exports.countCommentsByPostId = function(req, res, next) {
    // On compte le nombre de commentaires avec le postId présent dans la requête dans la bdd
    Comment.count({
        where : {
            postId : req.params.id
        }
    })
        .then(function(count){
            res.status(200).json(count);
        })
        .catch(function(error){
            res.status(500).json({error});
        });
};

// Middleware qui gère l'enregistrement d'un nouveau commentaire dans la BDD
exports.createComment = function(req, res, next) {
    // Sauvegarde du nouveau commentaire dans la bdd
    Comment.create(req.body.comment)
        .then(function(){
            res.status(201).json({ message : 'Commentaire enregistrée'})
        })
        .catch(function(error){
            res.status(500).json({ error })
        });
}

// Middleware qui gère la modification d'un commentaire avec un id donné
exports.editComment = function(req, res, next) {
    // On modifie les données du commentaire avec l'id donné dans la bdd avec les nouvelles données
    Comment.update(req.body.comment,{
        where : {
            id : req.params.id
        }
    })
        .then(function(){
            res.status(200).json({ message : "Publication modifiée !"});
        })
        .catch(function(error){
            res.status(500).json({error});
        });
}

// Middleware qui gère la suppression d'un commentaire avec un id donné de la bdd
exports.deleteComment = function(req, res, next) {
    // On supprime le commentaire dans la bdd
    Comment.destroy({
        where : { 
            id : req.params.id
        }
    })
        .then(function(){
            res.status(200).json({message : "Le commentaire a bien été supprimé"});
        })
        .catch(function(error){
            res.status(500).json({error});
        });
}