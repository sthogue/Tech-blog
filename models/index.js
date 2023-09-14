const User = require('./user');
const Post = require('./post');
const Comment = require('./comments');

// User has many posts
User.hasMany(Post, {
    foreignKey: 'user_id'
});

// Post belongs to one user
Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

// Comment belongs to one post
Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'SET NULL'
});

// user has many comments
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

// Post has many comments
Post.hasMany(Comment, {
    foreignKey: 'post_id',
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

module.exports = { User, Post, Comment };
