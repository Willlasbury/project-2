const router = require("express").Router()

const userRoutes = require('./user')
router.use("/users", userRoutes)

const taskRoutes = require('./task')
router.use("/tasks", taskRoutes)

const projectRoutes = require('./project')
router.use("/projects", projectRoutes)

module.exports = router