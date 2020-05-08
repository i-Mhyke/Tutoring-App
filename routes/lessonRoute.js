const express = require('express');
const authController = require('../controllers/authController');
const lessonController = require('./../controllers/lessonController');
const router = express.Router();

//admin create lesson for student with tutor
router.post('/admin/lesson', 
                authController.protectRoutes, 
                authController.restrictToAdmin, 
                lessonController.adminCreateLesson);
//student book/create lesson with tutor
router.post('/student/lesson', 
                authController.protectRoutes, 
                authController.restrictTo("student"), 
                lessonController.studentBookLesson);
//student views all booked lessons
router.get('/student/lessons', authController.protectRoutes, lessonController.studentLessons);
//tutor views all cooked lesson
router.get('/tutor/lessons', authController.protectRoutes, lessonController.tutorLessons);
//admin gets all lessons
router.get('/lessons', authController.protectRoutes, authController.restrictToAdmin, lessonController.getAllLessons);
//admin update lesson
router.put('/lessons/:lesson_id', 
                authController.protectRoutes, 
                authController.restrictToAdmin, 
                lessonController.updateLesson);
//admin delete lesson
router.delete('/lesson/:lesson_id', 
                authController.protectRoutes, 
                authController.restrictToAdmin, 
                lessonController.deleteLesson);

module.exports = router;