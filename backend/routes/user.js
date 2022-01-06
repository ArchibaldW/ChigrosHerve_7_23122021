// Ce routeur contient les routes vers les fonctions concernant les utilisateurs
const express = require('express');
const router = express.Router();

// On importe le controller qui défini ce que font les différentes fonctions
const userCtrl = require('../controllers/user');

//On importe les middleware chargés de checker l'email et le mot de passe
// const checkEmail = require('../middleware/check-email');
// const checkPassword = require('../middleware/check-password');
const auth = require('../middleware/auth');

// Routes vers les différentes fonctions
router.post('/auth/signup', userCtrl.signup); // Inscription d'un utilisateur
router.post('/auth/login', userCtrl.login); // Connection d'un utilisateur

router.get('/', auth, userCtrl.findUsers); // Récupération des utilisateurs
router.get('/:id', auth, userCtrl.findOneUser); // Récupération d'un utilisateur avec son id
router.put('/:id', auth, userCtrl.editUser); // Modification d'un utilisateur
router.delete('/:id', auth, userCtrl.deleteUser); // Suppression d'un utilisateur

module.exports = router;