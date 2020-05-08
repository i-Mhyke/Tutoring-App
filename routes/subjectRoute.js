<<<<<<< Updated upstream
const express = require('express');
const authController = require('./../controllers/authController');
const categoryController = require('./../controllers/categoryController');
const router = express.Router();

router.post('/category', 
                    authController.protectRoutes, 
                    authController.restrictToAdmin, 
                    categoryController.createCategory);
router.get('/category', authController.protectRoutes, categoryController.getCategories);
router.put('/category/:category_id', 
                    authController.protectRoutes,
                    authController.restrictToAdmin, 
                    categoryController.updateCategory);
router.delete('/category/:category_id', 
                authController.protectRoutes, 
                authController.restrictToAdmin,
                categoryController.deleteCategory);
router.post('/category/subject/:category_id',
                authController.protectRoutes, 
                authController.restrictToAdmin,
                categoryController.createSubject);
router.get('/category/:category_id/subjects', authController.protectRoutes, categoryController.getSubjectInCategory);
router.get('/category/:subject_id', 
                authController.protectRoutes, 
                authController.restrictToAdmin, 
                categoryController.getSubjectById);
router.get('/subjects', authController.protectRoutes, categoryController.getSubjectsByTitle);
router.put('/subject/:subject_id', 
                authController.protectRoutes,
                authController.restrictToAdmin,
                categoryController.updateSubject);
router.delete('/subject/:subject_id', 
                authController.protectRoutes,
                authController.restrictToAdmin,
                categoryController.deleteSubject);
router.get('/subject/:subject_id/tutors', 
                authController.protectRoutes,
                categoryController.getTutorsBySubject);

module.exports = router;
=======
<<<<<<< Updated upstream
=======
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
router.get('/category/subject/:subject_id', 
                authController.protectRoutes, 
                authController.restrictToAdmin, 
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
>>>>>>> Stashed changes
>>>>>>> Stashed changes
