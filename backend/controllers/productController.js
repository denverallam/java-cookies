const Product = require('../models/product')
const Audit = require('../models/audit')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const APIFeatures = require('../utils/apiFeatures')
const cloudinary = require('cloudinary').v2

exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
    const resPerPage = 5
    const productCount = await Product.countDocuments()

    const apiFeatures = new APIFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resPerPage)

    const products = await apiFeatures.query

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
    const images = req.files

    const product = await Product.create({
        ...req.body, 
        images,
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

    let newImages = req.files

    const oldImages = product.images
    const length = oldImages && oldImages.length
    let ids = []

    for (let i = 0; i < length; i++) {
        ids.push(oldImages[i].filename)
    }

    if (newImages == null || newImages == '') {
        newImages = product.images
    } else {
        if (ids.length != 0) {
            for (let x = 0; x < ids.length; x++) {
                cloudinary.uploader.destroy(ids[x],
                    { resource_type: 'raw' })
            }
        }
    }

    product = await Product.findByIdAndUpdate(req.params.id, {
        ...req.body, 
        images: newImages,
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

    const images = product.images
    const length = images.length
    let ids = []

    for (let i = 0; i < length; i++) {
        ids.push(images[i].filename)
    }

    if (ids.length != 0) {
        for (let x = 0; x < ids.length; x++) {
            cloudinary.uploader.destroy(ids[x],
                { resource_type: 'raw' })
        }
    }

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