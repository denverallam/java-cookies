const Service = require('../models/service')
const Audit = require('../models/audit')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const APIFeatures = require('../utils/apiFeatures')
const cloudinary = require('cloudinary').v2

exports.getAllServices = catchAsyncErrors(async (req, res, next) => {
    const resPerPage = 5
    const serviceCount = await Service.countDocuments()

    const apiFeatures = new APIFeatures(Service.find(), req.query)
        .search()
        .filter()
        .pagination(resPerPage)

    const services = await apiFeatures.query

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
    const images = req.files

    const service = await Service.create({
        ...req.body, 
        images,
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

    let newImages = req.files

    const oldImages = service.images
    const length = oldImages && oldImages.length
    let ids = []

    for (let i = 0; i < length; i++) {
        ids.push(oldImages[i].filename)
    }

    if (newImages == null || newImages == '') {
        newImages = service.images
    } else {
        if (ids.length != 0) {
            for (let x = 0; x < ids.length; x++) {
                cloudinary.uploader.destroy(ids[x],
                    { resource_type: 'raw' })
            }
        }
    }
    
    service = await Service.findByIdAndUpdate(req.params.id, {
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

    const images = service.images
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
        name: "Service deleted",
        description: `${service.name} deleted.`,
        created_by: req.user.username,
        date: Date.now()
    })

    await service.remove()

    res.status(200).json({
        success: true,
        message: 'Service is deleted successfully',
    })
})