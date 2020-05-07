const express = require('express');
const authController = require('../controllers/authController');
const userController = require('./../controllers/userController');
const router = express.Router();

router.post('/signup', authController.signUp);
router.post('/login', authController.login);
router.get('/users', authController.protectRoutes, authController.restrictToAdmin, userController.getAllUsers);
router.get('/users/:user_id', authController.protectRoutes, authController.restrictToAdmin, userController.getUserById);
router.delete('/user', authController.protectRoutes, userController.deleteUser);
router.put('/user/toAdmin/:user_id', 
                authController.protectRoutes, 
                authController.restrictToAdmin, 
                userController.assignAdminRole);
router.get('/tutors', authController.protectRoutes, authController.restrictToAdmin, userController.getAllTutors);
router.get('/students', authController.protectRoutes, authController.restrictToAdmin, userController.getAllStudents);
router.patch('/tutor/subjects/:subject_id', 
                authController.protectRoutes, 
                authController.restrictTo('tutor'), 
                userController.registerTutorSubject);
router.get('/tutor/subjects', 
                authController.protectRoutes, 
                authController.restrictTo('tutor'), 
                userController.getSubjectsregistered);
router.delete('/tutor/subjects/:subject_id', 
                authController.protectRoutes, 
                authController.restrictTo('tutor'), 
                userController.deleteRegisteredSubject);
//router.param('user_id', userController.userById);

module.exports = router;