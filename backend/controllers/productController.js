const Product = require('../models/product')
const Audit = require('../models/audit')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const APIFeatures = require('../utils/apiFeatures')

exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
    const resPerPage = 5
    const productCount = await Product.countDocuments()

    const apiFeatures = new APIFeatures(Product.find(), req.query)
        // .search()
        .filter()
        // .pagination(resPerPage)

    const products = await apiFeatures.query
    // const products = await Product.find()

    res.status(200).json({
        success: true,
        productCount,
        products
    })
})

exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id)

    if (!product) { return next(new ErrorHandler('Product not found', 404)) }

    res.status(200).json({
        success: true,
        product
    })
})

exports.createProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.create({
        ...req.body, 
        created_at: new Date(Date.now()),
        updated_at: new Date(Date.now()),
        created_by: req.user.username,
        updated_by: req.user.username
    })

    await Audit.create({
        name: "New product created",
        description: `${req.body.name} created.`,
        created_by: req.user.username,
        date: Date.now()
    })

    res.status(201).json({
        success: true,
        message: "New product added!",
        product
    })
})

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id)

    if (!product) { return next(new ErrorHandler('Product not found', 404)) }

    product = await Product.findByIdAndUpdate(req.params.id, {
        ...req.body, 
        updated_at: new Date(Date.now()),
        updated_by: req.user.username
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    await Audit.create({
        name: "Product updated",
        description: `${product.name} updated.`,
        created_by: req.user.username,
        date: Date.now()
    })

    res.status(200).json({
        success: true, 
        product
    })
})

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id)

    if (!product) { return next(new ErrorHandler('Product not found', 404)) }

    await Audit.create({
        name: "Product deleted",
        description: `${product.name} deleted.`,
        created_by: req.user.username,
        date: Date.now()
    })

    await product.remove()

    res.status(200).json({
        success: true,
        message: 'Product is deleted successfully',
    })
})