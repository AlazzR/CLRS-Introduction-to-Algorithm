/*
    TODO list:
        -Need to put endpoints for errors and need to render a specific html file for this endpoints and for each of the 4xx http status code.
        -Need to change from passing the token in the url to rendering specific elements based on the request.
        -Need to use the concept pagination to pass only a subset of posts.
        -Need to implement scrolling mechanism but this will need to completely rewrite the code to ensure that we don't refresh the page on sending a post event.
        -Need to make the html handle screen-width changes.
        -Need to make my css style cross-platform, in which the current project works well only with Firefox.
*/


const express = require("express");
const socketio = require("socket.io");
const chalk = require("chalk");
const cookieParser = require('cookie-parser');
const path = require("path");
const hbs = require("hbs");
const app = express();
const http = require("http");
const jwt = require("jsonwebtoken");
const {User} = require("./models/user");
const Room = require("./models/room");


const userRouter = require("./routers/users");
const postRouter = require("./routers/posts");
const roomRouter = require("./routers/rooms");
const server = http.createServer(app);
const io = socketio(server);

//console.log(path.join(__dirname, "../public"))
require("./db/db");
app.use(express.json());
app.use(express.urlencoded({ extended: true })) // for form data

app.use(express.static(path.join(__dirname, "../public")));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../templates/views"));
hbs.registerPartials(path.join(__dirname, "../templates/partials"), (err) => console.log(chalk.bgRed(err)));
app.use(cookieParser());//To use cookie in redirect
app.get("/", async(req, res)=>{
    res.render("index");
})

app.use(userRouter);
app.use(postRouter);
app.use(roomRouter);

//Sockets
io.on("connection", (socket)=>{
    socket.on("joining-room", async(message)=>{
        try{
            const {roomname, userToken} = message;
            const payload = await jwt.verify(userToken, process.env.JWTSECRETKEY);
            if(!payload)
                throw new Error("Unable to join");
            const room = await Room.findOne({where: {roomName: roomname}, include:{model: User, where:{_id: payload._id}}});
            if(!room)
                throw new Error("Unable to join");
                console.log(room.roomName)
            socket.join(room.roomName);
            socket.to(room.roomName).emit("room-joined", {roomname: room.roomName});
        }catch(err){
            console.log(chalk.bgRed(err))
        }
    });
    //refreshin the posts
    socket.on("posted-new-post", async({roomname, token})=>{
        try{
            const payload = await jwt.verify(token, process.env.JWTSECRETKEY);
            if(!payload)
                throw new Error("Unable to join");
            const room = await Room.findOne({where: {roomName: roomname}, include:{model: User, where:{_id: payload._id}}});
            if(!room)
                throw new Error("Unable to join");
                console.log(room.roomName)
            socket.join(room.roomName);
            socket.to(room.roomName).emit("room-joined", {roomname: room.roomName});

        }catch(err){
            console.log(chalk.bgRed(err))
        }
    });

    socket.on("delete-post", async({roomname, token})=>{
        try{
            const payload = await jwt.verify(token, process.env.JWTSECRETKEY);
            if(!payload)
                throw new Error("Unable to join");
            const room = await Room.findOne({where: {roomName: roomname}, include:{model: User, where:{_id: payload._id}}});
            if(!room)
                throw new Error("Unable to join");
            console.log(room.roomName)
            socket.join(room.roomName);
            socket.to(room.roomName).emit("room-joined", {roomname: room.roomName});
        }catch(err){
            console.log(chalk.bgRed(err))
        }
    });

    socket.on("remove-user", async({roomname, token, flag})=>{
        try{
            console.log("ddddd", roomname)
            const payload = await jwt.verify(token, process.env.JWTSECRETKEY);
            const user = await User.findOne({where:{_id: payload._id}})
            if(!user)
                throw new Error("Unable to join");
            if(!flag)
            {
                //Users only exited without authority on the room 
                const room = await Room.findOne({where: {roomName: roomname}});
                if(!room)
                    throw new Error("Unable to join");
               
    
                socket.join(room.roomName);
                socket.to(room.roomName).emit("room-joined", {roomname: room.roomName, flag});
            }
            else{
                socket.join(roomname);
                socket.to(roomname).emit("room-joined", {roomname, flag});
            }

        }catch(err){
            console.log(chalk.bgRed(err))
        }
    });
});

module.exports = {server, io};