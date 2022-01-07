// Ce routeur contient les routes vers les fonctions concernant les publications
const express = require('express');
const router = express.Router();

// On importe le controller qui défini ce que font les différentes fonctions
const postCtrl = require('../controllers/post');

// On importe le middleware auth pour sécuriser les routes
const auth = require('../middleware/auth');

// Routes vers les différentes fonctions
router.get('/', auth, postCtrl.findPosts); // Récupération des publications
router.get('/:id', auth, postCtrl.findOnePost); // Récupération d'une publication avec son id
router.get('/user/:id', auth, postCtrl.findPostsByUserId); // Récupération des publications avec userId donné
router.get('/user/:id/count/', auth, postCtrl.countPostsByUserId); // Récupération du nombre de publications avec un userId donné
router.post('/', auth, postCtrl.createPost); // Création d'une publication
router.put('/:id', auth, postCtrl.editPost); // Modification d'une publication
router.delete('/:id', auth, postCtrl.deletePost); // Suppression d'une publication

module.exports = router;