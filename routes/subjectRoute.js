const express = require('express');
const authController = require('./../controllers/authController');
const subjectController = require('./../controllers/subjectController');
const userController = require('./../controllers/userController');
const router = express.Router();

//create subject by category
router.post('/category/subject/:category_id',
                authController.protectRoutes, 
                authController.restrictToAdmin,
                subjectController.createSubject);
//get all subjects in a category
router.get('/category/:category_id/subjects', authController.protectRoutes, subjectController.getSubjectInCategory);
//get subjects by id
router.get('/subjects/:subject_id', 
                authController.protectRoutes, 
                subjectController.getSubjectById);
//get subject from search /subject?subject=chemistry
router.get('/subject', authController.protectRoutes, subjectController.getSubjectsByTitle);
//get all subjects
router.get('/subjects', authController.protectRoutes, subjectController.getAllSubjects);
//update subject
router.put('/subject/:subject_id', 
                authController.protectRoutes,
                authController.restrictToAdmin,
                subjectController.updateSubject);
//delete subject
router.delete('/subject/:subject_id', 
                authController.protectRoutes,
                authController.restrictToAdmin,
                subjectController.deleteSubject);
//get tutors taking a subject
router.get('/subject/:subject_id/tutors', 
                authController.protectRoutes,
                subjectController.getTutorsBySubject);
//tutor registration to take subject
router.patch('/tutor/subjects/:subject_id', 
                authController.protectRoutes, 
                authController.restrictTo('tutor'), 
                userController.tutorRegisterSubject);
//logged in tutor gets all subjects they registered for
router.get('/tutor/subjects', 
                authController.protectRoutes, 
                authController.restrictTo('tutor'), 
                userController.getSubjectsregistered);
//logged-in tutor deletes registered subject
router.delete('/tutor/subjects/:subject_id', 
                authController.protectRoutes, 
                authController.restrictTo('tutor'), 
                userController.deleteRegisteredSubject);


module.exports = router;
