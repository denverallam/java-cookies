const Service = require('../models/service')
const Audit = require('../models/audit')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const APIFeatures = require('../utils/apiFeatures')

exports.getAllServices = catchAsyncErrors(async (req, res, next) => {
    const resPerPage = 5
    const serviceCount = await Service.countDocuments()

    const apiFeatures = new APIFeatures(Service.find(), req.query)
        // .search()
        .filter()
        // .pagination(resPerPage)

    const services = await apiFeatures.query
    // const services = await Service.find()

    res.status(200).json({
        success: true,
        serviceCount,
        services
    })
})

exports.getSingleService = catchAsyncErrors(async (req, res, next) => {
    const service = await Service.findById(req.params.id)

    if (!service) { return next(new ErrorHandler('Service not found', 404)) }

    res.status(200).json({
        success: true,
        service
    })
})

exports.createService = catchAsyncErrors(async (req, res, next) => {
    const service = await Service.create({
        ...req.body, 
        created_at: new Date(Date.now()),
        updated_at: new Date(Date.now()),
        created_by: req.user.username,
        updated_by: req.user.username
    })

    await Audit.create({
        name: "New service created",
        description: `${req.body.name} created.`,
        created_by: req.user.username,
        date: Date.now()
    })

    res.status(201).json({
        success: true,
        message: "New service added!",
        service
    })
})

exports.updateService = catchAsyncErrors(async (req, res, next) => {
    let service = await Service.findById(req.params.id)

    if (!service) { return next(new ErrorHandler('service not found', 404)) }

    service = await Service.findByIdAndUpdate(req.params.id, {
        ...req.body,
        updated_at: new Date(Date.now()),
        updated_by: req.user.username
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    await Audit.create({
        name: "Service updated",
        description: `${service.name} updated.`,
        created_by: req.user.username,
        date: Date.now()
    })

    res.status(200).json({
        success: true, 
        service
    })
})

exports.deleteService = catchAsyncErrors(async (req, res, next) => {
    const service = await Service.findById(req.params.id)

    if (!service) { return next(new ErrorHandler('Service not found', 404)) }

    await Audit.create({
        name: "Service deleted",
        description: `${service.name} deleted.`,
        created_by: req.user.username,
        date: Date.now()
    })

    await Service.remove()

    res.status(200).json({
        success: true,
        message: 'Service is deleted successfully',
    })
})