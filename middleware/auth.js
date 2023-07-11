const { request } = require("express");
const jwt = require("jsonwebtoken");
const Model =  require("../models/model");

const auth = async(req,res,next)=>{
   

    try{
        
    const token = req.cookies.jwtlogin;

    const  verified = jwt.verify(token,process.env.SECRET_KEY);

    const user =  await Model.findOne({_id:verified._id});
    req.user=user;
    req.token= token;

   next();
    }catch(error){
      res.status(401).render("donthaveaccess");
    }

}

module.exports=auth;