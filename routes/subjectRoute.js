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