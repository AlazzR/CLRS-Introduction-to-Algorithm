const chalk = require("chalk");
const express = require("express");
const {User, findExistingUser} = require("../models/user");
const Room = require("../models/room");
const auth = require("../middleware/auth")
const { sequelize, Sequelize, Op } = require("../db/db");
const Post = require("../models/post");
const router = express.Router();

(async()=>{
    try{
        await sequelize.sync();
        //await Post.sync();
        console.log(chalk.bgGreen("The posts table was created/synchronized with."));
    }catch(err){
        console.log(chalk.bgRed("The server failed to connect to the posts table"));
    }
})();

//ONLY CRD
router.get("/posts/:roomname", auth, async(req, res)=>{
    try{
        const room = await Room.findOne({where: {roomName: req.params.roomname}});
        //easy exit
        if(!room)
            throw new Error("Unauthorized posting");
        const posts = await Post.findAll({ where:{RoomId: room._id},  attributes: ["content", "createdAt", ["_id", "postid"]], include:{model: User, attributes:["userName"]}, order:[["createdAt", "ASC"]]});
        console.log(posts)
        if(!posts)
            throw new Error("Unauthorized posting");
        res.status(200).send({posts});
    }catch(err){
        console.log(chalk.bgRed("post: " + err));
        res.status(401).send(err);
    }

});

router.post("/posts", auth, async(req, res)=>{
    try{
        console.log(req.body.content)
        const room = await Room.findOne({attributes:["roomName", "_id"], where: {roomName: req.body.roomName}, include: {model: User, where: {_id: req.user._id}, attributes: ["userName"]}});
        if(!room)
            throw new Error("Unauthorized posting");
        const post = await Post.create({
            content: req.body.content,
            RoomId: room._id,
            UserId: req.user._id
        });
        await post.save();
        res.status(201).send({postid: post._id, content: post.content, createdAt: post.createdAt, username: req.user.userName});
    }catch(err){
        console.log(chalk.bgRed("post: " + err));
        res.status(401).send(err)
    }
});


router.delete("/posts", auth, async(req, res)=>{
    try{
        const post = await Post.findOne({where: {_id: req.body._id}});
        if(!post)
            throw new Error("Unable to delete the post");
        await post.destroy();
        await post.save();
        res.status(202).send(post);
    }catch(err){
        console.log(chalk.bgRed("post: " + err));
        res.status(401).send(err)
    }
});



module.exports = router;