const {sequelize, DataTypes, Op} = require("../db/db");
const {User} = require("./user");
const Post = require("./post");

const Room = sequelize.define("Room", {
    _id:{
        type: DataTypes.UUID, 
        allowNull: false, 
        defaultValue: DataTypes.UUIDV4, 
        unique: true,
        primaryKey: true
    },
    roomName:{
        type: DataTypes.STRING,
        allowNull: false, 
        unique: true, 
        validate:{
            len: [5, 25], 
        }
    },
    adminId:{
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    }
}, {
    tableName: "rooms", 
    timestamps: true
});

Room.belongsToMany(User, {through: "RoomToUser", onDelete: "CASCADE"});
User.belongsToMany(Room, {through: "RoomToUser", onDelete: "CASCADE"});

User.hasMany(Post, {onDelete: "SET NULL"});
Post.belongsTo(User);

Room.hasMany(Post, {onDelete: "CASCADE"})
Post.belongsTo(Room);

module.exports = Room;