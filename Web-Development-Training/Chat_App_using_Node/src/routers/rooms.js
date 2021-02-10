const chalk = require("chalk");
const express = require("express");
const {User} = require("../models/user");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth")
const { sequelize, Sequelize, Op } = require("../db/db");
const Room = require("../models/room");
const Post = require("../models/post");
const { count } = require("../models/post");
const router = express.Router();


(async()=>{
    try{
        //rawait sequelize.sync();
        /* await Room.sync();
        await User.sync(); */
        console.log(chalk.bgGreen("The rooms table was created/synchronized with."));
    }catch(err){
        console.log(chalk.bgRed("The server failed to connect to the rooms table"));
    }
})();
//UI for the userss
router.get("/me/rooms/:id", async(req, res)=>{
    try{
        //fetch user and replace the token value.
        const payload = await jwt.verify(req.params.id, process.env.JWTSECRETKEY);
        const user = await User.findOne({where:{
            _id: payload._id
        }});
        if(!user)
            throw new Error("Unauthorized user");
        //console.log(user.tokens);
        const lenOld = user.tokens.length;
        const token = await jwt.sign({_id: user._id}, process.env.JWTSECRETKEY);
        await user.update({"tokens": user.tokens.filter(item => item !== req.params.id)});
        await user.save();
        if(lenOld === user.tokens.length)
            throw new Error("Unauthorized user");
        await user.update({"tokens": sequelize.fn("array_append", sequelize.col("tokens"), token)});
        await user.save();

        //now we can retreive rooms available and already logged in
        const rooms = await Room.findAll({attributes: ["roomName", "adminId"], where: {adminId: {
            [Op.ne]: user._id
        }}, includes:{model: User, where: {_id: {[Op.ne]: user._id}}}});

        console.log(rooms);

        const roomsloggedIn = await Room.findAll({attributes: ["roomName", "adminId"], include:{model: User, where:{_id: user._id}, attributes:[], through: {attributes: []}}});

        const roomList = [];
        const adminList = [];
        const loggedAdminList = [];
        const loggedList = [];

        for(let room of roomsloggedIn)
        {
            const user = await User.findOne({where:{_id: room.adminId}, attributes:["userName"]});
            loggedAdminList.push(user.userName);
            loggedList.push(room.roomName);
        }
        for(let room of rooms)
        {
            if(loggedList.includes(room.roomName))
                continue;
            const user = await User.findOne({where:{_id: room.adminId}, attributes:["userName"]})
            roomList.push(room.roomName);
            adminList.push(user.userName);
        }
        console.log(roomList, loggedList)
        //console.log(roomList, '\n', loggedList)
        res.status(200).render("roomslist", {username: user.userName, rooms: roomList, admins: adminList, logged: loggedList, loggedAdminList, token});
    }catch(err)
    {
        console.log(chalk.bgRed("room: " + err));
        res.status(401).send(err);
    }
});
//Get rooms that are availabe and which ones are signed in the user in
//Access the room
router.get("/rooms/redirect/:roomName/:id", async(req, res)=>{
    try{
        const room = await Room.findOne({where: {roomName: req.params.roomName}});
        if(!room)   
            throw new Error("Unauthorized user");

        //fetch user and replace the token value.
        const payload = await jwt.verify(req.params.id, process.env.JWTSECRETKEY);
        const user = await User.findOne({where:{
            _id: payload._id
        }, include: {model: Room, where:{roomName: room.roomName}}});
        //console.log(user)
        if(!user)
            throw new Error("Unauthorized user");
        //console.log(user.tokens);
        const lenOld = user.tokens.length;
        const token = await jwt.sign({_id: user._id}, process.env.JWTSECRETKEY);
        await user.update({"tokens": user.tokens.filter(item => item !== req.params.id)});
        await user.save();
        if(lenOld === user.tokens.length)
            throw new Error("Unauthorized user");
        await user.update({"tokens": sequelize.fn("array_append", sequelize.col("tokens"), token)});
        await user.save();
        //cookie monster
        res.cookie("cookie", token);
        
        res.status(301).redirect("/rooms/me/" + req.params.roomName);
    }catch(err){
        console.log(chalk.bgRed("room: " + err));
        res.status(401).send(err);
    }
});



router.get("/rooms/me/:roomName", async(req, res)=>{
    try{
        //console.log(req.headers);
        //console.log(req.cookies["cookie"]);
        const payload = await jwt.verify(req.cookies["cookie"], process.env.JWTSECRETKEY);
        const user = await User.findOne({where: {_id: payload._id}});
        if(!user)
            throw new Error("Unauthorized User");
        else
        {
            const lenOld = user.tokens.length;
            const token = await jwt.sign({_id: user._id}, process.env.JWTSECRETKEY);
            await user.update({"tokens": user.tokens.filter(item => item !== req.cookies["cookie"])});
            await user.save();
            console.log(lenOld, '-', user.tokens.length);
            if(lenOld === user.tokens.length)
                throw new Error("Unauthorized user");
            await user.update({"tokens": sequelize.fn("array_append", sequelize.col("tokens"), token)});
            await user.save();

            res.clearCookie("cookie");
            res.status(200).render("room_chat", {token, username: user.userName});
        }

    }catch(err)
    {
        console.log(chalk.bgRed("room: " + err));
        res.status(401).send(err);
    }
});


//CRUD operations for room
//get all room for postman
router.get("/rooms", async(req, res)=>{
    try{
        const rooms = await Room.findAll({});
        res.status(200).send(rooms);

    }catch(err){
        console.log(chalk.bgRed("room: " + err));
        res.status(401).send(err);
    }
});
//create room and assign the user as its admin
router.post("/rooms", auth, async(req, res)=>{
    try{
        const checkRoom = await Room.findOne({where: {roomName: req.body.roomName}});
        if(checkRoom)
            throw new Error("Room already exist!");
        const room = await Room.create({roomName: req.body.roomName, adminId: req.user._id});
        await room.save();
        res.status(201).send({name: room.roomName});
    }catch(err){
        console.log(chalk.bgRed("room: " + err));
        res.status(401).send(err);
    }
});

/* router.patch("/rooms", async(req, res)=>{
    try{
        const room = await Room.findOne({where: {roomName: req.body.roomName }});
        await room.update({"roomName": req.body.newRoomName});
        await room.save();
        res.status(202).send(room);

    }catch(err){
        console.log(chalk.bgRed("room: " + err));
        res.status(401).send(err);
    }
}); */

//delete the room if user was the admin of it
router.delete("/rooms/delete/:roomName/:id", auth, async(req, res)=>{
    try{
        console.log("********************")
        console.log('-------', req.params.roomName)
        console.log(req.user._id);
        const token = req.token;
        const room = await Room.findOne({where: {roomName: req.params.roomName, adminId: req.user._id}});
        if(!room)
            throw new Error("Unauthorized job");
        await room.destroy();
        await room.save();
        //then refresh the page
        res.status(201).send({token: token});

    }catch(err){
        console.log(chalk.bgRed("room: " + err));
        res.status(401).send(err);
    }

});
//exit room
router.delete("/rooms/delete/me/:roomName/:id", auth, async(req, res)=>{
    try{
        const token = req.token;
        const room = await Room.findOne({where: {roomName: req.params.roomName}});
        if(!room)
            throw new Error("Unauthorized job");
       await Post.destroy({where: {UserId: req.user._id, RoomId: room._id}});
        
        await room.removeUsers(req.user);
        await room.save();
        //then refresh the page
        res.status(201).send({token: token});

    }catch(err){
        console.log(chalk.bgRed("room: " + err));
        res.status(401).send(err);
    }

});

//Add users to the room
router.post("/rooms/users", auth, async(req, res)=>{
    try{
        const room = await Room.findOne({where:{roomName: req.body.roomName}});
        if(!room)
            throw new Error("This room doesn't exist");
        //console.log(req.user)
        const checkUserExist = await Room.findOne({where: {_id: room._id}, include:{model: User, where:{_id: req.user._id}}});
        if(checkUserExist)
            return res.status(200).send({msg: "Success"});
        await room.addUser(req.user);
        await room.save();
        const users = await Room.findOne({attributes: ["_id", "adminId", "roomName"],include: {model: User, attributes: ["_id", "userName"], through: {attributes: []}}});

        //Need to remove the console log, I will use it for postman
        console.log(users.Users)
        res.status(202).send({msg: "Success"});

    }catch(err){
        console.log(chalk.bgRed("room: " + err));
        res.status(401).send(err);
    }
});
//get userlist and images that are in the room
router.post("/rooms/userslist", auth, async(req, res)=>{
    try{
        //console.log(req.body);
        const isSignedUser = await Room.findOne({where: {roomName: req.body.roomName}, attributes: ["roomName"], include:{model: User, attributes: ["profileImage", "userName"], through: {attributes: []}}});
        if(!isSignedUser)
            throw new Error("Unauthorized User");
        
        let images = [];
        let userNames = [];
        for(let user of isSignedUser.Users)
        {
            const tmp = user.profileImage.toString();
            //console.log(tmp);
            if(tmp.includes("data:image/jpg;base64,"))
                images.push(tmp.replace("data:image/jpg;base64,", ""));
            else
                images.push(user.profileImage.toString());
            userNames.push(user.userName);
        }

        //res.set("Content-Type", "image/jpg");
        res.status(200).send({images, userNames});

    }catch(err){
        console.log(chalk.bgRed("room: " + err));
        res.status(401).send(err);
    }
});



module.exports = router;