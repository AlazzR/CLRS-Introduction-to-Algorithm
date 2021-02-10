const chalk = require("chalk");
const express = require("express");
const jwt = require("jsonwebtoken");
const base64Img = require('base64-img');//Read an image and can't change the type of an image.
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const sharp = require("sharp");
const {User, findExistingUser} = require("../models/user");
const Room = require("../models/room");
const auth = require("../middleware/auth")
const { sequelize, Sequelize, Op } = require("../db/db");
const router = express.Router();

//upload for multer 
const upload = multer({
    limits: 2000000,
    fileFilter(req, file, cb){
        console.log(file.originalname)
        if(file.originalname.match(/\.(PNG|JPG|JPEG|png|jpg|jpeg|tif|tiff)$/))
            cb(undefined, true);
        else
            cb(new Error("Please upload a file of type jpg."))
    }
});

(async()=>{
    try{
        await sequelize.sync();
/*         await User.sync();
        await Room.sync(); */
        console.log(chalk.bgGreen("The users table was created/synchronized with."));
    }catch(err){
        console.log(chalk.bgRed("The server failed to connect to the users table"));
    }

})();
router.get("/users", async(req, res)=>{
    const users = await User.findAll({attributes: ["userName", "tokens"]});
    res.send(users);
})

//Rendering signup page
router.get("/signup/", (req, res)=>{
    res.status(200).render("signup");
});
//Creating new user
router.post("/users/signup", async(req, res)=>{
    try{
        //console.log(req.body);
        const user = await User.create({
            userName: req.body.userName, 
            password: req.body.password,
            email: req.body.email
        });
        await user.update({"profileImage": base64Img.base64Sync(path.join(__dirname, "../../public/images/defaultImage.jpg"))});
        const token = jwt.sign({_id: user._id}, process.env.JWTSECRETKEY);
        //console.log(user.tokens)
        if(!user.tokens)
        {  
            user.tokens = [];
            user.tokens.push(token);
        }
        else{
            //user.update({"tokens": sequelize.fn("array_append", sequelize.col("tokens"), token)});
            user.tokens.push(token);
        }
        await user.save();
        //It seems that you can't pass a header with redirect.
        //res.set({"Authorization": "Bearer " + token});
        //const tokenSplit = token.split(".");
        //console.log(tokenSplit[0] + '&' + tokenSplit[1] + '&' + tokenSplit[2]);
        //res.redirect(301, "/users/me/postProfileImage/?" + tokenSplit[0] + '&' + tokenSplit[1] + '&' + tokenSplit[2]);
        //res.status(201).render("postProfileImage", {token: token});
        res.status(201).send({token: token});
    }catch(err){
        if(err instanceof Sequelize.ValidationError)
        {
            const errors = [];
            for(let error of err.errors)
                errors.push(error.path);
            return res.status(400).send(errors);  
        }
        console.log(chalk.bgRed("users:post ", err));
        res.status(400).send(err);  
    }
    
});
//Redirecting to upload avatar
router.get("/users/me/pages/uploadAvatar", async(req, res)=>{
    //res.cookie("token", req.token);
    //res.status(301).redirect("/users/me/uploadAvatar/");
    res.status(200).render("uploadAvatar");

});
//Get user and the token
router.get("/users/me/uploadAvatar/", auth, async(req, res)=>{
    try{
        const payload = await jwt.verify(req.token, process.env.JWTSECRETKEY);
        const user = await User.findOne({where:{
            _id: payload._id
        }});
        if(!user)
            throw new Error("Unauthorized user");
        //console.log(user.tokens);
        const lenOld = user.tokens.length;
        const token = await jwt.sign({_id: user._id}, process.env.JWTSECRETKEY);
        await user.update({"tokens": user.tokens.filter(item => item !== req.token)});
        await user.save();
        if(lenOld === user.tokens.length)
            throw new Error("Unauthorized user");
        await user.update({"tokens": sequelize.fn("array_append", sequelize.col("tokens"), token)});
        await user.save();
        //res.clearCookie("token");
        res.status(200).send({username: user.userName, token: token});

    }catch(err){
        res.status(401).send("Unauthorized user");

    }
});


//users login path
router.get("/login/", (req, res)=>{
    try{
        res.status(200).render("login")
    }catch(err){
        res.status(401).send(err);
    }
})


router.post("/users/login", async(req, res)=>{
    try{
        const user = await findExistingUser(req.body.email, req.body.password);
        const token = jwt.sign({_id: user._id}, process.env.JWTSECRETKEY);
        //console.log(user.tokens)
        if(!user)
            throw new Error();
        if(!user.tokens)
            user.tokens = [];
        await user.update({"tokens": sequelize.fn("array_append", sequelize.col("tokens"), token)});
        await user.save();
        
        res.status(200).send({"token": token});
    }catch(err){
        console.log(chalk.bgRed(err));
        res.status(403).send("Unable to Login");
    }
});

//User logout end point
router.get("/users/me/logout", auth, async(req, res)=>{
    try{
        const tokens = req.user.tokens;
        req.user.update({"tokens": tokens.filter(item => item !== req.token)});
        await req.user.save();
        res.status(200).send(req.user);
    }catch(err){
        console.log(chalk.bgRed(err));  
        res.status(403).send("Unable to Login");
    }
});

//The following are the endpoints that are responsible for getting and setting the image.
router.post("/users/me/avatar", auth, upload.single("profile"), async(req, res)=>{
    //console.log("zzz", req.file);   
    await req.user.update({"profileImage": req.file.buffer.toString("base64")});
    await req.user.save();
    res.status(200).send();
    
}, (error, req, res, next)=>{
    //this will capture the error in our middleware
    res.status(400).send({error: error.message});
});

router.get("/users/me/avatar", auth, async(req, res)=>{
    //req.user.profileImage = req.file.buffer;
    //console.log(req.user.profileImage.toString("base64"))
    //const image = base64Img.base64Sync(path.join(__dirname, "../../public/images/defaultImage.jpg"));
    const tmp = req.user.profileImage.toString();
    //console.log(tmp);
    let image;
    if(tmp.includes("data:image/jpg;base64,"))
        image = tmp.replace("data:image/jpg;base64,", "");
    else
        image = req.user.profileImage.toString()
    res.set("Content-Type", "image/jpg");
    res.send({image});
}, (error, req, res, next)=>{
    //this will capture the error in our middleware
    res.status(400).send({error: error.message});
});


module.exports = router;