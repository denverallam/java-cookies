const express = require('express')
const router = express.Router()
const User = require('../models/user')

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')
const auth = require('../controllers/authController')

/**
 * - all
 * login
 * logout
 * reset password
 * view profile
 * update password
 * 
 * - admin
 * get users
 * get single user
 * create user
 * delete user
 * update user
 * 
 * - staff
 * 
 * 
 */

/* ALL */
router.route('/login').post(auth.login)
router.route('/logout').get(auth.logout)
router.route('/password/forgot').post(auth.forgotPassword)
router.route('/password/reset/:token').put(auth.resetPassword)

router.route('/me/profile').get(isAuthenticatedUser, auth.getMyProfile)
router.route('/update/password').put(isAuthenticatedUser, auth.updatePassword)

/* STAFF */

/* ADMIN */
router.route('/users/:role').get(isAuthenticatedUser, authorizeRoles('Admin'), auth.getUsers)
router.route('/user/:id').get(isAuthenticatedUser, authorizeRoles('Admin'), auth.getUser)
router.route('/user/new').post(isAuthenticatedUser, authorizeRoles('Admin'), auth.registerUser)
router.route('/user/update/:id').put(isAuthenticatedUser, authorizeRoles('Admin'), auth.updateUser)
router.route('/user/delete/:id').delete(isAuthenticatedUser, authorizeRoles('Admin'), auth.deleteUser)


module.exports = router