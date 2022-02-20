const Audit = require('../models/audit')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')

exports.getAllAudits = catchAsyncErrors(async (req, res, next) => {
    const audits = await Audit.find()

    res.status(200).json({
        success: true,
        audits
    })
})