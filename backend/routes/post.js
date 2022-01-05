// Ce routeur contient les routes vers les fonctions concernant les utilisateurs
const express = require('express');
const router = express.Router();

// On importe le controller qui défini ce que font les différentes fonctions
const postCtrl = require('../controllers/post');

//On importe les middleware chargés de checker l'email et le mot de passe
// const checkEmail = require('../middleware/check-email');
// const checkPassword = require('../middleware/check-password');
const auth = require('../middleware/auth');

// Routes vers les différentes fonctions
router.get('/user/:id', postCtrl.findPostsByUserId); // Inscription d'un utilisateur

router.post('/', postCtrl.createPost); // Inscription d'un utilisateur

module.exports = router;