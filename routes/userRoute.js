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
router.delete('/users/:user_id', authController.protectRoutes, authController.restrictToAdmin, userController.deleteUser);
//user deletes his/herself
router.delete('/user/me', authController.protectRoutes, userController.deleteMe);
//admin assigns role to tutor
router.patch('/user/:user_id/admin', 
                authController.protectRoutes, 
                authController.restrictToAdmin, 
                userController.assignAdminRole);
//user updates their account
router.patch('/user/me', authController.protectRoutes, userController.updateMe);
// Admin updates user's profile
router.put('/users/:user_id', authController.protectRoutes, authController.restrictToAdmin, userController.updateUser);
//admin gets all tutors
router.get('/tutors', authController.protectRoutes, userController.getAllTutors);
//admin gets all students
router.get('/students', authController.protectRoutes, authController.restrictToAdmin, userController.getAllStudents);

module.exports = router;