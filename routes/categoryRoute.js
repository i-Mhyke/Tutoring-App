const express = require('express');
const authController = require('./../controllers/authController');
const categoryController = require('./../controllers/categoryController');
const router = express.Router();

//admin creates category
router.post('/category', 
                    authController.protectRoutes, 
                    authController.restrictToAdmin, 
                    categoryController.createCategory);
//get all categories
router.get('/categories', authController.protectRoutes, categoryController.getCategories);
//update a category
router.put('/categories/:category_id', 
                    authController.protectRoutes,
                    authController.restrictToAdmin, 
                    categoryController.updateCategory);
//delete a category
router.delete('/categories/:category_id', 
                authController.protectRoutes, 
                authController.restrictToAdmin,
                categoryController.deleteCategory);

module.exports = router;