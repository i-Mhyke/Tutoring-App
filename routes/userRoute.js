const express = require('express');
const authController = require('../controllers/authController');
const userController = require('./../controllers/userController');
const lessonController = require('./../controllers/lessonController');
const router = express.Router();

//user sign-up
router.post('/signup', authController.signUp);
//user login
router.post('/login', authController.login);
//admin get user by id
router.get('/users/:user_id', authController.protectRoutes, authController.restrictToAdmin, userController.getUserById);
//admin gets all users
router.get('/users', authController.protectRoutes, authController.restrictToAdmin, userController.getAllUsers);
//admin deletes user
router.delete('/users/:user_id', authController.protectRoutes, authController.restrictToAdmin, userController.deleteUser);
//user deletes his/herself
router.delete('/user/me', authController.protectRoutes, userController.deleteMe);
router.put('/user/:user_id/admin', 
                authController.protectRoutes, 
                authController.restrictToAdmin, 
                userController.assignAdminRole);
//admin gets all tutors
router.get('/tutors', authController.protectRoutes, userController.getAllTutors);
//admin gets all students
router.get('/students', authController.protectRoutes, authController.restrictToAdmin, userController.getAllStudents);


module.exports = router;