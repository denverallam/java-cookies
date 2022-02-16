const express = require('express')
const router = express.Router()

/**
 * - customer
 * get all services
 * get single service
 * 
 * - staff and admin
 * create service
 * update service
 * delete service
 * get all services
 * get single service
 * 
 */
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

const service = require('../controllers/serviceController')

router.route('/services').get(service.getAllServices)
router.route('/service/:id').get(service.getSingleService)

router.route('/admin/services').get(isAuthenticatedUser, authorizeRoles('Admin', 'Staff'), service.getAllServices)
router.route('/admin/service/:id').get(isAuthenticatedUser, authorizeRoles('Admin', 'Staff'), service.getSingleService)

router.route('/new/service').post(isAuthenticatedUser, authorizeRoles('Admin', 'Staff'), service.createService)
router.route('/service/:id').put(isAuthenticatedUser, authorizeRoles('Admin', 'Staff'), service.updateService)
router.route('/service/:id').delete(isAuthenticatedUser, authorizeRoles('Admin', 'Staff'), service.deleteService)

module.exports = router
