const User = require('../models/user')
// const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')

exports.updateCart = catchAsyncErrors(async (req, res, next) => {
    const cart = await User.findByIdAndUpdate(req.user.id, { cart: req.body.cart }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        cart
    })
})