const User = require('./User');

const Post = require('./Post');

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


module.exports = { User, Post };