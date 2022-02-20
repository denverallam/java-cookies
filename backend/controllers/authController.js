const User = require('../models/user')
const Audit = require('../models/audit')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const sendToken = require('../utils/jwtToken')
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
// templates
// const verifyEmail = require('../config/templates/verifyEmail')


exports.login = catchAsyncErrors(async (req, res, next) => {
    const { username, password } = req.body

    if (!username || !password) { return next(new ErrorHandler('Please enter your credentials', 400)) }

    const user = await User.findOne({ username }).select('+password')

    if (!user) { return next(new ErrorHandler('Invalid Credentials', 401)) }

    const isPasswordMatched = await user.comparePassword(password)
    if (!isPasswordMatched) { return next(new ErrorHandler('Invalid Credentials', 401)) }
    sendToken(user, 200, res)
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

    const link = `${req.protocol}://${process.env.HOST}/reset/${resetToken}`

    try {
        // const message = await resetPassword({ link })

        await sendEmail({
            email: user.email,
            subject: 'Java Cookies Password Recovery',
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

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { email, username, password, role, confirmPassword } = req.body

    if (password !== confirmPassword) { return next(new ErrorHandler('Password does not match')) }

    let userRole = role ? role : "Staff"

    const userEmail = await User.findOne({ email })
    const userUsername = await User.findOne({ username })

    if (userEmail || userUsername) { return next(new ErrorHandler('Email account or username already exists', 404)) }

    const user = await User.create({ ...req.body, role: userRole })

    await Audit.create({
        name: "New user createdasdasd",
        description: `${username} created.`,
        created_by: req.user.username,
        date: Date.now()
    })

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

    await Audit.create({
        name: "User updated",
        description: `${user.username} updated.`,
        created_by: req.user.username,
        date: Date.now()
    })

    res.status(200).json({
        success: true,
        user
    })
})

exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id)

    if (!user) { return next(new ErrorHandler(`User not found with this id:(${req.params.id})`)) }

    await Audit.create({
        name: "User deleted",
        description: `${user.username} deleted.`,
        created_by: req.user.username,
        date: Date.now()
    })

    await user.remove()

    res.status(200).json({
        success: true,
        message: "User has been deleted"
    })
})