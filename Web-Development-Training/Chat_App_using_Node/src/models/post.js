const {sequelize, DataTypes, Op} = require("../db/db");
const {User} = require("./user");
const Room = require("./room");


const Post = sequelize.define("Post", {
    _id:{
        type: DataTypes.UUID, 
        allowNull: false, 
        defaultValue: DataTypes.UUIDV4, 
        unique: true,
        primaryKey: true
    },
    content:{
        type: DataTypes.STRING,
        allowNull: false,
        len:[10, 250] 
    },
    RoomId:{
        type: DataTypes.UUID,  
        allowNull: false
    },
    UserId:{
        type: DataTypes.UUID,   
        allowNull: false
    }
}, {
    tableName: "posts", 
    timestamps: true
});


module.exports = Post;