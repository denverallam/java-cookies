const express = require('express')
const router = express.Router()

/**
 * - staff and admin
 * create audit --to be part of each user, product, and services controller
 * get all audits
 * get single audit
 * 
 */
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

const audit = require('../controllers/auditController')

router.route('/admin/audits').get(isAuthenticatedUser, authorizeRoles('Admin', 'Staff'), audit.getAllAudits)
router.route('/admin/audit/:id').get(isAuthenticatedUser, authorizeRoles('Admin', 'Staff'), audit.getSingleAudit)

module.exports = router
