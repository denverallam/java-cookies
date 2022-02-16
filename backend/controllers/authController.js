const User = require('../models/user')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const sendToken = require('../utils/jwtToken')
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
// templates
// const verifyEmail = require('../config/templates/verifyEmail')


exports.login = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) { return next(new ErrorHandler('Please enter your credentials', 400)) }

    const userEmail = await User.findOne({ email }).select('+password')
    const userUsername = await User.findOne({ username: email }).select('+password')

    if (!userEmail && !userUsername) { return next(new ErrorHandler('Invalid Credentials', 401)) }

    if (userEmail) {
        const isPasswordMatched = await userEmail.comparePassword(password)
        if (!isPasswordMatched) { return next(new ErrorHandler('Invalid Credentials', 401)) }
        sendToken(userEmail, 200, res)
    }

    if (userUsername) {
        const isPasswordMatched = await userUsername.comparePassword(password)
        if (!isPasswordMatched) { return next(new ErrorHandler('Invalid Credentials', 401)) }
        sendToken(userUsername, 200, res)
    }
})

exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Logged out'
    })
})

exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })

    if (!user) { return next(new ErrorHandler('Email does not exist', 404)) }

    const resetToken = user.getResetPasswordToken()

    await user.save({ validateBeforeSave: false })

    const link = `${req.protocol}://${process.env.HOST}/password/reset/${resetToken}`

    try {
        // const message = await resetPassword({ link })

        await sendEmail({
            email: user.email,
            subject: 'FioreX Password Recovery',
            message: `<h1>Reset link: ${link}</h1>`
        })

        res.status(200).json({
            success: true,
            message: `Email sent.\nKindly check your inbox or spam.`
        })

    } catch (error) {
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined

        await user.save({ validateBeforeSave: false })
        return next(new ErrorHandler(error.message, 500))
    }
})

exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')
    const { password, confirmPassword } = req.body

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })
    if (!user) { return next(new ErrorHandler('Password reset link is invalid or has expired')) }


    if (password !== confirmPassword) { return next(new ErrorHandler('Password does not match')) }

    user.password = password
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save()

    res.status(200).json({
        success: true,
        message: `Password has been updated`
    })
})

exports.registerCustomer = catchAsyncErrors(async (req, res, next) => {
    const { email, username, password, confirmPassword } = req.body

    const userEmail = await User.findOne({ email })
    const userUsername = await User.findOne({ username })

    const role = "Customer"
    const cart = []

    if (userEmail || userUsername) { return next(new ErrorHandler('Email account or username already exists', 404)) }

    if (password !== confirmPassword) { return next(new ErrorHandler('Password does not match')) }

    const registerToken = jwt.sign({ ...req.body, role, cart }, process.env.ACCOUNT_TOKEN, { expiresIn: process.env.REGISTER_EXPIRES })

    // create reset password url
    const link = `${req.protocol}://${process.env.HOST}/verify/account/${registerToken}`

    try {
        // const message = await verifyEmail({ link })

        await sendEmail({
            email: email,
            subject: 'FioreX Account Verification',
            message: `<h1>Reset link: ${link}</h1>`
        })

        res.status(200).json({
            success: true,
            message: `Account verification link is now sent \n please check your inbox or spam`
        })

    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
})

exports.verifyCustomer = catchAsyncErrors(async (req, res, next) => {
    const token = req.params.token

    if (token) {
        jwt.verify(token, process.env.ACCOUNT_TOKEN, function (err, customer) {
            if (err) { return next(new ErrorHandler('Token is invalid or expired')) }

            const { email } = customer

            User.findOne({ email }).exec((err, existingUser) => {
                if (existingUser) { return next(new ErrorHandler('Email already exists')) }
                const user = User.create(customer).then(() =>
                    res.status(201).json({
                        success: true,
                        message: "Congratulations! Your FioreX account has been successfully registered. You may now log in."
                    })
                )
            })
        })
    } else {
        return next(new ErrorHandler('Token is invalid or expired'))
    }
})

exports.registerStaff = catchAsyncErrors(async (req, res, next) => {
    const { email, username, password, role, confirmPassword } = req.body

    if (password !== confirmPassword) { return next(new ErrorHandler('Password does not match')) }

    let userRole = role
    const cart = []

    if (!role) {
        userRole = "Staff"
    }

    const userEmail = await User.findOne({ email })
    const userUsername = await User.findOne({ username })

    if (userEmail || userUsername) { return next(new ErrorHandler('Email account or username already exists', 404)) }

    const user = await User.create({ ...req.body, role: userRole, cart })

    res.status(201).json({
        success: true,
        message: "User created successfully",
        user
    })
})

exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password')

    const { oldPassword, password, confirmPassword } = req.body
    const isMatched = await user.comparePassword(oldPassword)

    if (!isMatched) { return next(new ErrorHandler('Old password is incorrect')) }
    if (password !== confirmPassword) { return next(new ErrorHandler('Password and Confirm Password does not match')) }

    user.password = password

    await user.save()
    sendToken(user, 200, res)
})

exports.getMyProfile = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id)

    res.status(200).json({
        success: true,
        user
    })
})

exports.updateMyProfile = catchAsyncErrors(async (req, res, next) => {
    //const newUserData = { role: req.body.role }
    const user = await User.findByIdAndUpdate(req.user.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,
        user
    })
})

exports.getUsers = catchAsyncErrors(async (req, res, next) => {
    let role = req.params.role, users

    if (role === 'all') {
        users = await User.find().sort({ role: 1, first_name: 1 })
    } else {
        users = await User.find({ role }).sort({ role: 1, first_name: 1 })
    }

    res.status(200).json({
        success: true,
        users
    })
})

exports.getUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id)

    if (!user) { return next(new ErrorHandler(`User not found with this id:(${req.params.id})`)) }

    res.status(200).json({
        success: true,
        user
    })
})

exports.updateUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    if (!user) { return next(new ErrorHandler(`User not found with this id:(${req.params.id})`)) }

    res.status(200).json({
        success: true,
        user
    })
})

exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id)

    if (!user) { return next(new ErrorHandler(`User not found with this id:(${req.params.id})`)) }

    await user.remove()

    res.status(200).json({
        success: true,
        message: "User has been deleted"
    })
})