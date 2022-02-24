const express = require('express')
const router = express.Router()
const fileStorage = require('../config/serviceImages')
const path = require('path')
const multer = require('multer')

const fileMimeTypes = [
    'image/jpeg',
    'image/png',
    'images/jpg',
    'application/vnd.ms-excel',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/pdf',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation'
]

const fileUpload = multer({
    storage: fileStorage,
    fileFilter: function (req, file, cb) {
        const ext = path.extname(file.originalname)
        if (!fileMimeTypes.includes(file.mimetype)) {
            return cb(new Error('File type not supported'))
        } else {
            cb(null, true)
        }
    }
})

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

const service = require('../controllers/serviceController')

router.route('/services').get(service.getAllServices)
router.route('/service/:id').get(service.getSingleService)

router.route('/admin/services').get(isAuthenticatedUser, authorizeRoles('Admin', 'Staff'), service.getAllServices)
router.route('/admin/service/:id').get(isAuthenticatedUser, authorizeRoles('Admin', 'Staff'), service.getSingleService)

router.route('/new/service').post(isAuthenticatedUser, fileUpload.array('images'), authorizeRoles('Admin', 'Staff'), service.createService)
router.route('/service/:id').put(isAuthenticatedUser, fileUpload.array('images'), authorizeRoles('Admin', 'Staff'), service.updateService)
router.route('/service/:id').delete(isAuthenticatedUser, authorizeRoles('Admin', 'Staff'), service.deleteService)

module.exports = router
