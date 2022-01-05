const Post = require('../models/Post');

exports.findPosts = function(req, res, next) {
    // On cherche toutes les sauces dans la bdd
    Post.findAll()
        .then(function(posts){
            res.status(200).json(posts);
        })
        .catch(function(error){
            res.status(404).json({error});
        });
};

exports.findPostsByUserId = function(req, res, next) {
    // On cherche toutes les sauces dans la bdd
    Post.findAll({
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

// Middleware qui gère la récupération d'une sauce depuis la bdd
exports.findOnePost = function(req, res, next) {
    // On cherche la sauce avec l'id présent dans la requête dans la bdd
    Post.findOne({_id : req.params.id})
        .then(function(post){
            res.status(200).json(post);
        })
        .catch(function(error){
            res.status(404).json({error});
        });
};

// Middleware qui gère la création d'une nouvelle sauce et sa sauvegarde en bdd
exports.createPost = function(req, res, next) {
    // On transforme les données du corps de la requête en objet Sauce utilisable
    const postObject = req.body.post;
    // Sauvegarde de la nouvelle sauce dans la bdd
    Post.create(postObject)
        .then(function(){
            res.status(201).json({ message : 'Publication enregistrée'})
        })
        .catch(function(error){
            res.status(400).json({ error })
        });
}