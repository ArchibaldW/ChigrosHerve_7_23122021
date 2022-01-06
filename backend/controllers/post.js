const Post = require('../models/Post');

exports.findPosts = function(req, res, next) {
    Post.findAll({
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

// Middleware qui gère la récupération d'une publication depuis la bdd
exports.findOnePost = function(req, res, next) {
    // On cherche la sauce avec l'id présent dans la requête dans la bdd
    Post.findOne({
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

exports.findPostsByUserId = function(req, res, next) {
    Post.findAll({
        where : {
            userId : req.params.id
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

exports.countPostsByUserId = function(req, res, next) {
    Post.count({
        where : {
            userId : req.params.id
        }
    })
        .then(function(posts){
            res.status(200).json(posts);
        })
        .catch(function(error){
            res.status(404).json({error});
        });
};

// Middleware qui gère la création d'une nouvelle publication et sa sauvegarde en bdd
exports.createPost = function(req, res, next) {
    // Sauvegarde de la nouvelle publication dans la bdd
    Post.findOne({
        where : { 
            title : req.body.post.title 
        }
    })
        .then(function(post){
            if (!post){
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

exports.editPost = function(req, res, next) {
    // On transforme les données du corps de la requête en objet Sauce utilisable
    const postObject = req.body.post;
    Post.findOne({
        where : {
            id : req.params.id
        }
    })
        .then(function(post){
            if (!post){
                return res.status(401).json({error : "Publication non trouvée !"});
            }
            console.log(req.body.post);
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
        })
}

exports.deletePost = function(req, res, next) {
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