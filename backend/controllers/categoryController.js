const Category = require('../models/category')
const Audit = require('../models/audit')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')

exports.getAllCategories = catchAsyncErrors(async (req, res, next) => {
    const categories = await Category.find()

    res.status(200).json({
        success: true,
        categories
    })
})

exports.createCategory = catchAsyncErrors(async (req, res, next) => {
    const category = await Category.create({name: req.body.name, created_by: req.user.username})

    await Audit.create({
        name: "New category created",
        description: `${req.body.name} created.`,
        created_by: req.user.username,
        date: Date.now()
    })

    res.status(201).json({
        success: true,
        message: "New category added!",
        category
    })
})

exports.deleteCategory = catchAsyncErrors(async (req, res, next) => {
    const category = await Category.findById(req.params.id)

    if (!category) { return next(new ErrorHandler('Category not found', 404)) }

    await Audit.create({
        name: "Category deleted",
        description: `${category.name} deleted.`,
        created_by: req.user.username,
        date: Date.now()
    })

    await category.remove()

    res.status(200).json({
        success: true,
        message: 'Category is deleted successfully',
    })
})