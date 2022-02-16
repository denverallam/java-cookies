const express = require('express')
const router = express.Router()

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

const product = require('../controllers/productController')

router.route('/products').get(isAuthenticatedUser, product.getAllProducts)
router.route('/product/:id').get(isAuthenticatedUser, product.getSingleProduct)

router.route('/new/product').post(isAuthenticatedUser, authorizeRoles('Admin', 'Staff'), product.createProduct)
router.route('/product/:id').put(isAuthenticatedUser, authorizeRoles('Admin', 'Staff'), product.updateProduct)
router.route('/product/:id').delete(isAuthenticatedUser, authorizeRoles('Admin', 'Staff'), product.deleteProduct)

module.exports = router
