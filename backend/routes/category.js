const express = require('express')
const router = express.Router()

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

const category = require('../controllers/categoryController')

router.route('/categories').get(category.getAllCategories)

router.route('/admin/new/category').post(isAuthenticatedUser, authorizeRoles('Admin', 'Staff'), category.createCategory)
router.route('/admin/category/:id').delete(isAuthenticatedUser, authorizeRoles('Admin', 'Staff'), category.deleteCategory)

module.exports = router
