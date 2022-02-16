const express = require('express')
const router = express.Router()
const User = require('../models/user')

const { isAuthenticatedUser } = require('../middlewares/auth')

const cart = require('../controllers/cartController')

router.route('/update/cart').put(isAuthenticatedUser, cart.updateCart)

module.exports = router
