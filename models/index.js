const User = require("./User");
const Task = require("./task");
const Project = require('./project')

// Post.belongsTo(User, {
//     onDelete: 'CASCADE'
// })
// User.hasMany(Post)

// Comment.belongsTo(Post, {
//     onDelete: 'CASCADE'
// })
// Post.hasMany(Comment)

module.exports = { User, Task, Project };
