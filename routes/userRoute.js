const express = require('express');
const authController = require('../controllers/authController');
const userController = require('./../controllers/userController');
const lessonController = require('./../controllers/lessonController');
const router = express.Router();

//user sign-up
router.post('/signup', authController.signUp);
//user login
router.post('/login', authController.login);
//admin gets all users
router.get('/users', authController.protectRoutes, authController.restrictToAdmin, userController.getAllUsers);
//admin get user by id
router.get('/users/:user_id', authController.protectRoutes, authController.restrictToAdmin, userController.getUserById);
//admin deletes use
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
<<<<<<< Updated upstream
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
router.post('/admin/lesson', 
                authController.protectRoutes, 
                authController.restrictToAdmin, 
                lessonController.adminCreateLesson);
router.post('/student/lesson', 
                authController.protectRoutes, 
                authController.restrictTo("user"), 
                lessonController.studentCreateLesson);
router.get('/student/lessons', authController.protectRoutes, lessonController.studentLessons);
router.get('/tutor/lessons', authController.protectRoutes, lessonController.tutorLessons);
router.get('/lessons', authController.protectRoutes, authController.restrictToAdmin, lessonController.getAllLessons);
router.put('/lessons/:lesson_id', 
                authController.protectRoutes, 
                authController.restrictToAdmin, 
                lessonController.updateLesson);
router.delete('/lesson/:lesson_id', 
                authController.protectRoutes, 
                authController.restrictToAdmin, 
                lessonController.deleteLesson);
//router.param('user_id', userController.userById);
=======
>>>>>>> Stashed changes

module.exports = router;