// Ce routeur contient les routes vers les fonctions concernant les utilisateurs
const express = require('express');
const router = express.Router();

// On importe le controller qui défini ce que font les différentes fonctions
const userCtrl = require('../controllers/user');

// On importe le middlewares, auth pour sécuriser les routes et checkEmail/checkPassword chargés de checker l'email et le mot de passe
const auth = require('../middleware/auth');
const checkEmail = require('../middleware/check-email');
const checkPassword = require('../middleware/check-password');

// Routes vers les différentes fonctions
router.post('/auth/signup', checkEmail, checkPassword, userCtrl.signup); // Inscription d'un utilisateur
router.post('/auth/login', userCtrl.login); // Connection d'un utilisateur
router.get('/', auth, userCtrl.findUsers); // Récupération des utilisateurs
router.get('/:id', auth, userCtrl.findOneUser); // Récupération d'un utilisateur avec son id
router.get('/:id/username', auth, userCtrl.findOneUsername); // Récupération d'un nom d'utilisateur avec son id
router.put('/:id', auth, userCtrl.editUser); // Modification d'un utilisateur
router.delete('/:id', auth, userCtrl.deleteUser); // Suppression d'un utilisateur

module.exports = router;