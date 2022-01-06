const Comment = require('../models/Comment');

// Middleware qui gère la récupération d'une publication depuis la bdd
exports.findOneComment = function(req, res, next) {
    // On cherche la sauce avec l'id présent dans la requête dans la bdd
    Comment.findOne({
        where : {
            id : req.params.id
        }
    })
        .then(function(post){
            res.status(200).json(post);
        })
        .catch(function(error){
            res.status(404).json({error});
        });
};

exports.findCommentsByPostId = function(req, res, next) {
    Comment.findAll({
        where : {
            postId : req.params.id
        },
        order: [
            ['createdAt', 'DESC']
        ]
    })
        .then(function(posts){
            res.status(200).json(posts);
        })
        .catch(function(error){
            res.status(404).json({error});
        });
};

exports.countCommentsByPostId = function(req, res, next) {
    Comment.count({
        where : {
            postId : req.params.id
        }
    })
        .then(function(posts){
            res.status(200).json(posts);
        })
        .catch(function(error){
            res.status(404).json({error});
        });
};

exports.createComment = function(req, res, next) {
   
}

exports.editComment = function(req, res, next) {
    
}

exports.deleteComment = function(req, res, next) {
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