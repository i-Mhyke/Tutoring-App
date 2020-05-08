const express = require('express');
const authController = require('../controllers/authController');
const userController = require('./../controllers/userController');
const router = express.Router();

router.post('/signup', authController.signUp);
//tutor Sign-up
router.post('/signup/tutor', authController.tutorSignUp);
//user login
router.post('/login', authController.login);
router.get('/users', authController.protectRoutes, authController.restrictToAdmin, authController.getAllUsers);
router.delete('/user', authController.protectRoutes, userController.deleteUser);
router.put('/user/toAdmin/:user_id', authController.protectRoutes, authController.restrictToAdmin, userController.assignAdminRole);

//router.param('user_id', userController.userById);

module.exports = router;