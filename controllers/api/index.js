const router = require("express").Router()

const userRoutes = require('./user')
router.use("/users", userRoutes)

const taskRoutes = require('./task')
router.use("/tasks", taskRoutes)

module.exports = router