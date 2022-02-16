const Audit = require('../models/audit')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')

exports.getAllAudits = catchAsyncErrors(async (req, res, next) => {
    const audits = await Audit.find()

    res.status(200).json({
        success: true,
        audits
    })
})

exports.getSingleAudit = catchAsyncErrors(async (req, res, next) => {
    const audit = await Audit.findById(req.params.id)

    if (!audit) { return next(new ErrorHandler('Audit not found', 404)) }

    res.status(200).json({
        success: true,
        audit
    })
})