const express = require('express');
const authController = require('../controllers/authController');
const userController = require('./../controllers/userController');
const router = express.Router();

//user sign-up
router.post('/signup', authController.signUp);
//tutor Sign-up
router.post('/signup/tutor', authController.tutorSignUp);
//user login
router.post('/login', authController.login);
//admin get user by id
router.get('/users/:user_id', authController.protectRoutes, authController.restrictToAdmin, userController.getUserById);
//admin gets all users
router.get('/users', authController.protectRoutes, authController.restrictToAdmin, userController.getAllUsers);
//admin deletes user
router.delete('/user', authController.protectRoutes, userController.deleteUser);
//admin makes a tutor an admin
router.put('/user/:user_id/admin', 
                authController.protectRoutes, 
                authController.restrictToAdmin, 
                userController.assignAdminRole);
//admin gets all tutors
router.get('/tutors', authController.protectRoutes, authController.restrictToAdmin, userController.getAllTutors);
//admin gets all students
router.get('/students', authController.protectRoutes, authController.restrictToAdmin, userController.getAllStudents);

module.exports = router;