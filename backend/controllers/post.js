// Controller où se trouve la logique métier liée à la gestion des publications

// On importe le model Post avec le schema sequelize pour traiter les données des publications
const Post = require('../models/Post');

// Middleware qui gère la récupération de toutes les publications depuis la bdd
exports.findPosts = function(req, res, next) {
    // On cherche toutes les publications
    // On le cherche dans l'ordre inverse de leur publication pour afficher le plus récent en premier
    Post.findAll({
        order: [
            ['createdAt', 'DESC']
        ]
    })
        .then(function(posts){
            if (!posts){
                return res.status(404).json({message : "Aucune publication n'a été trouvée !"});
            }
            res.status(200).json(posts);
        })
        .catch(function(error){
            res.status(500).json({error});
        });
};

// Middleware qui gère la récupération d'une publication depuis la bdd
exports.findOnePost = function(req, res, next) {
    // On cherche la publication avec l'id présent dans la requête dans la bdd
    Post.findOne({
        where : {
            id : req.params.id
        }
    })
        .then(function(post){
            if (!post){
                return res.status(404).json({message : "Publication non trouvée !"});
            }
            res.status(200).json(post);
        })
        .catch(function(error){
            res.status(500).json({error});
        });
};

// Middleware qui gère la récupération des publications depuis un userId
exports.findPostsByUserId = function(req, res, next) {
    // On cherche les publications avec le userId présent dans la requête dans la bdd
    // On le cherche dans l'ordre inverse de leur publication pour afficher le plus récent en premier
    Post.findAll({
        where : {
            userId : req.params.id
        },
        order: [
            ['createdAt', 'DESC']
        ]
    })
        .then(function(posts){
            if (!posts){
                return res.status(404).json({message : "Aucune publication n'a été trouvée !"});
            }
            res.status(200).json(posts);
        })
        .catch(function(error){
            res.status(500).json({error});
        });
};

// Middleware qui gère le décompte du nombre de publications depuis un userId
exports.countPostsByUserId = function(req, res, next) {
    // On compte le nombre de publications avec le userId présent dans la requête dans la bdd
    Post.count({
        where : {
            userId : req.params.id
        }
    })
        .then(function(count){
            res.status(200).json(count);
        })
        .catch(function(error){
            res.status(500).json({error});
        });
};

// Middleware qui gère l'enregistrement d'une nouvelle publication dans la BDD
exports.createPost = function(req, res, next) {
    // On cherche si il y a déjà une publication existante avec ce titre, auquel cas on renvoie une erreur
    Post.findOne({
        where : { 
            title : req.body.post.title 
        }
    })
        .then(function(post){
            if (!post){
                // Si on ne trouve aucune publication ayant ce titre, alors sauvegarde de la nouvelle publication dans la bdd
                Post.create(req.body.post)
                    .then(function(){
                        res.status(201).json({ message : 'Publication enregistrée'})
                    })
                    .catch(function(error){
                        res.status(500).json({ error })
                    });
            } else {
                res.status(500).json({message: "Titre déjà utilisé !"})
            }
        })
        .catch(function(error){
            res.status(500).json({ error })
        })
}

// Middleware qui gère la modification d'une publication avec un id donné
exports.editPost = function(req, res, next) {
    // On modifie les données de la publication avec l'id donné dans la bdd avec les nouvelles données
    Post.update(req.body.post,{
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

// Middleware qui gère la suppression d'une publication avec un id donné de la bdd
exports.deletePost = function(req, res, next) {
    // On supprime la publication dans la bdd
    Post.destroy({
        where : { 
            id : req.params.id
        }
    })
        .then(function(){
            res.status(200).json({message : "La publication a bien été supprimée"});
        })
        .catch(function(error){
            res.status(500).json({error});
        });
}