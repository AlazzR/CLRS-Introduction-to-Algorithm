const {User} = require("../models/user");
const jwt = require("jsonwebtoken");
const {Op} = require("../db/db");

const auth = async(req, res, next)=>{
    try{ 
        //console.log("--------------------------ddddd");
        //console.log("wede ", await req.header("Authorization"));
        const token = await req.header("Authorization").replace("Bearer ", "");
        const payload = await jwt.verify(token, process.env.JWTSECRETKEY);
        //console.log(payload);
        const user = await User.findOne({where:{
            _id: payload._id,
            tokens: {[Op.contains]: [token]}
        }});
        //console.log('|||||', user);
        if(!user)
            throw new Error();
        req.user = user;
        req.token = token;
        next();
    }catch(err){
        res.status(401).send("Unauthorized User");
    }
}

module.exports = auth;