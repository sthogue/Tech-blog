const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
    {
        // post will go here
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        //title
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        //content
        content: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                //content must be at least one character long
                len: [1]
            },
        },
        //user id
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
    },
);

module.exports = Post;