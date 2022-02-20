const express = require('express')
const router = express.Router()

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

const audit = require('../controllers/auditController')

router.route('/admin/audits').get(isAuthenticatedUser, authorizeRoles('Admin'), audit.getAllAudits)

module.exports = router
