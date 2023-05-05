const router = require('express').Router()

const userRoutes = require('./api/user')
router.use('api/users', userRoutes)

const pageRoutes = require('./pages')
router.use('/', pageRoutes)

module.exports = router