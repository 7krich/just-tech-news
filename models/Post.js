// import Model & Datatypes from sequelize
const { Model, DataTypes } = require('sequelize');
// mysql connection
const sequelize = require('../config/connection');

// crate Post model
class Post extends Model {}

// create fields/columns for Post model table
Post.init(
    {
        // define post schema
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            // set as primary key
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        post_url: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
            isURL: true
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
            model: 'user',
            key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
    }
);

module.exports = Post;