const User = require('./User')
const Comment = require('./Comment')
const Post = require('./Post')

// Post.belongsTo(User, {
//     onDelete: 'CASCADE'
// })
// User.hasMany(Post)

// Comment.belongsTo(Post, {
//     onDelete: 'CASCADE'
// })
// Post.hasMany(Comment)



module.exports = {User, Post, Comment}