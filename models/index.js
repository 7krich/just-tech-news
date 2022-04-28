const User = require('./User');

const Post = require('./Post');

const Vote = require('./Vote');

// create association
// one to many relationship
// one user can create many posts
User.hasMany(Post, {
    foreignKey: 'user_id'
});

// post can only belong to one user
Post.belongsTo(User, {
    foreignKey: 'user_id',
});

// voter many to many relationship
// see which users voted on a single post
User.belongsToMany(Post, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'user_id'
});

// see which posts a single user voted on
Post.belongsToMany(User, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'post_id'
});

Vote.belongsTo(User, {
    foreignKey: 'user_id'
});

Vote.belongsTo(Post, {
    foreignKey: 'post_id'
});

User.hasMany(Vote, {
    foreignKey: 'user_id'
});

Post.hasMany(Vote, {
    foreignKey: 'post_id'
});


module.exports = { User, Post, Vote };