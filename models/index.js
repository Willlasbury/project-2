const User = require("./User");
const Task = require("./task");
const Project = require('./project')

Project.belongsToMany(User, {
    through: 'ProjectUsers'
})
User.belongsToMany(Project, {
    through: 'ProjectUsers'
})

Task.belongsTo(Project, {
    onDelete: 'CASCADE'
})
Project.hasMany(Task)

Task.belongsTo(User)

User.hasMany(Task)


module.exports = { User, Task, Project };
