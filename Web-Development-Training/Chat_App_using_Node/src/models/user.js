const {sequelize, DataTypes, Op} = require("../db/db");
const validator = require("validator");
const bcryptjs = require("bcryptjs");

const User = sequelize.define("User", {
    _id:{
        type: DataTypes.UUID, 
        defaultValue: DataTypes.UUIDV4, 
        allowNull: false, 
        unique: true,
        primaryKey: true
    },
    userName:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,  
        validate:{
            len: [5,32]
        }
    }, 
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate:{
            isEmail: true
        }
    }, 
    password:{
        type: DataTypes.STRING, 
        allowNull: false, 
        validate:{
            isStrongPassword(value){
                if(!validator.isStrongPassword(value, {minLength:8, minUpperCase:1, minSymbols:1}))
                    throw new Error("You need a stronger password(at least of length 8 with one uppercase letter and one symbol)");
            }
        }
    },
    tokens:{
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
        validate:{
            isExceeding3Tokens(value){
                if(value > 3)
                    throw new Error("Need to only have 3 access to the room by you, so, you need to logout from other sessions.")
            }
        }
    }, 
    profileImage:{
        type: DataTypes.BLOB,
        allowNull: true
    }
}, {
    tableName: "users",
    timestamps: true
});

User.addHook("beforeCreate", async(user, options)=>{
    user.password = await bcryptjs.hash(user.password, 8);
});

const findExistingUser = async(email, password)=>{
    try{
        const user = await User.findOne({
            where:{
                email: email
            }
        });
        if(!user)
            throw new Error("Unable to login");

        const isMatched = await bcryptjs.compare(password, user.password);
        if(!isMatched)
            throw new Error("Unable to login");
        return user;
    
    }catch(err){
        throw new Error(err);
    }
}

module.exports = {
    User,
findExistingUser};