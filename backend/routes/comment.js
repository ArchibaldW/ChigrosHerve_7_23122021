// Ce routeur contient les routes vers les fonctions concernant les utilisateurs
const express = require('express');
const router = express.Router();

// On importe le controller qui défini ce que font les différentes fonctions
const commentCtrl = require('../controllers/comment');

// On importe le middleware auth pour sécuriser les routes
const auth = require('../middleware/auth');

// Routes vers les différentes fonctions
router.get('/:id', auth, commentCtrl.findOneComment); // Récupération d'un commentaire avec son id
router.get('/post/:id', auth, commentCtrl.findCommentsByPostId); // Récupération des commentaires avec postId donné
router.get('/post/:id/count/', auth, commentCtrl.countCommentsByPostId); // Récupération du nombre de commentaires avec un postId donné
router.post('/', auth, commentCtrl.createComment); // Création d'un commentaire
router.put('/:id', auth, commentCtrl.editComment); // Modification d'un commentaire
router.delete('/:id', auth, commentCtrl.deleteComment); // Suppression d'un commentaire



module.exports = router;