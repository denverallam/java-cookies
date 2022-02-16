const express = require('express')
const router = express.Router()

/**
 * - customer
 * get all product
 * get single product
 * 
 * - staff and admin
 * create product
 * update product
 * delete product
 * get all products
 * get single product
 * 
 */
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

const product = require('../controllers/productController')

router.route('/products').get(product.getAllProducts)
router.route('/product/:id').get(product.getSingleProduct)

router.route('/admin/products').get(isAuthenticatedUser, authorizeRoles('Admin', 'Staff'), product.getAllProducts)
router.route('/admin/product/:id').get(isAuthenticatedUser, authorizeRoles('Admin', 'Staff'), product.getSingleProduct)

router.route('/new/product').post(isAuthenticatedUser, authorizeRoles('Admin', 'Staff'), product.createProduct)
router.route('/product/:id').put(isAuthenticatedUser, authorizeRoles('Admin', 'Staff'), product.updateProduct)
router.route('/product/:id').delete(isAuthenticatedUser, authorizeRoles('Admin', 'Staff'), product.deleteProduct)

module.exports = router
