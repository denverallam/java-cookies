const Order = require('../models/order')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')

exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
    const orderCount = await Order.countDocuments()

    const orders = await Order.find()

    res.status(200).json({
        success: true,
        orderCount,
        orders
    })
})

exports.getAllUserOrders = catchAsyncErrors(async (req, res, next) => {
    const orderCount = await Order.countDocuments()

    const orders = await Order.find()

    res.status(200).json({
        success: true,
        orderCount,
        orders
    })
})

exports.getAllUserOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await orders.find({ "user.id": req.user.id })

    if (!orders) { return next(new ErrorHandler('Order not found', 404)) }

    res.status(200).json({
        success: true,
        orders
    })
})

exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id)

    if (!order) { return next(new ErrorHandler('Order not found', 404)) }

    res.status(200).json({
        success: true,
        order
    })
})

exports.createOrder = catchAsyncErrors(async (req, res, next) => {
    const status = "Order Placed";

    const order_history = {
        status,
        date: new Date(Date.now()),
        description: "Order Placed",
        updated_by: req.user.id
    }

    const { first_name, _id, last_name, email, contact_number } = req.user
    const order = await Order.create({ ...req.body, user: {first_name, _id, last_name, email, contact_number }, order_history, status })

    res.status(201).json({
        success: true,
        order
    })
})

exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
    let order = await Order.findById(req.params.id)
    if (!order) { return next(new ErrorHandler('Order not found', 404)) }

    const { status, description } = req.body;

    var order_history = order.order_history
    order_history.push({
        status,
        description,
        date: new Date(Date.now()),
        updated_by: req.user.id
    })

    order = await Order.findByIdAndUpdate(req.params.id, {...req.body, order_history}, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        order
    })
})

exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id)

    if (!order) { return next(new ErrorHandler('Order not found', 404)) }

    await order.remove()

    res.status(200).json({
        success: true,
        message: 'Order is deleted successfully'
    })
})