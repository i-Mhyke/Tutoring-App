const express = require('express');
const authController = require('./../controllers/authController');
const categoryController = require('./../controllers/categoryController');
const router = express.Router();

router.post('/category', 
                    authController.protectRoutes, 
                    authController.restrictToAdmin, 
                    categoryController.createCategory);
router.post('/category/:category_id',
                    authController.protectRoutes, 
                    authController.restrictToAdmin,
                    categoryController.createSubject);
router.get('/category', authController.protectRoutes, categoryController.getCategories);
router.get('/category/:category_id', authController.protectRoutes, categoryController.getSubjectInCategory);

module.exports = router;