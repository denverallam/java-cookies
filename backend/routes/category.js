const express = require('express')
const router = express.Router()

/**
 * - customer
 * get all categories
 * 
 * - staff and admin
 * create category
 * update category
 * delete category
 * get all categories
 * get single category
 * 
 */
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

const category = require('../controllers/categoryController')

router.route('/categories').get(category.getAllCategories)

router.route('/admin/categories').get(isAuthenticatedUser, authorizeRoles('Admin', 'Staff'), category.getAllCategories)
router.route('/admin/category/:id').get(isAuthenticatedUser, authorizeRoles('Admin', 'Staff'), category.getSingleCategory)

router.route('/new/category').post(isAuthenticatedUser, authorizeRoles('Admin', 'Staff'), category.createCategory)
router.route('/category/:id').put(isAuthenticatedUser, authorizeRoles('Admin', 'Staff'), category.updateCategory)
router.route('/category/:id').delete(isAuthenticatedUser, authorizeRoles('Admin', 'Staff'), category.deleteCategory)

module.exports = router
