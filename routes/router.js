const express = require("express");
// const cookieParser = require('cookie-parser')

const router = new express.Router();
const Model = require("../models/model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const auth = require("../middleware/auth");

router.get("/", (request, response) => {
    response.render('index', {
        name: "Adarsh",
        songs: [
            { song1: "Gulabi Aankhen" }, { song2: "Dil Kya Kre" }, { song3: "Dilbar Mere" }, { song4: "Hai Apna Dil To Awaara" }, { song5: "Kya Hua Tera Wada" }, { song6: "Neele Neele Ambar Par" }, { song7: "Yeh Raat Bheegi Bheegi" }
        ],
        about: "The band SANAM comprises of VENKY S, SANAM PURI, KESHAV DHANRAJ and SAMAR PURI (from left to right). Together, these four friends have embarked on a magical journey to explore, create and share their music with the world. From recreating old classics, to composing deep and catchy originals, SANAM is on a mission to spread love and happiness through their music releases and their live concerts."
    });
})


router.get("/aboutus", (request, response) => {
    response.render('aboutus', {
        about: "The band SANAM comprises of VENKY S, SANAM PURI, KESHAV DHANRAJ and SAMAR PURI (from left to right). Together, these four friends have embarked on a magical journey to explore, create and share their music with the world. From recreating old classics, to composing deep and catchy originals, SANAM is on a mission to spread love and happiness through their music releases and their live concerts."
    });
})

router.get("/contactus", (request, response) => {
    response.render("contactus");
})
router.get("/gallery", (request, response) => {
    response.render("gallery");
})
router.get("/band-members", (request, response) => {
    response.render("band-members");
})

router.get("/secretpage", auth, (request,response) => {
   // console.log(request.cookies.jwtlogin);
    response.render("secretpage");
})
router.get("/register", (request, response) => {
    response.render("register");
})

router.post("/register", async (request, response) => {
    const password = request.body.password;
    const confirmpassword = request.body.confirmpassword;
    try {
        if (password === confirmpassword) {

            const insertData = new Model({
                firstname: request.body.firstname,
                lastname: request.body.lastname,
                email: request.body.email,
                mobile: request.body.mobile,
                password: request.body.password,
                confirmpassword: request.body.confirmpassword

            })
            const token = await insertData.generateAuthToken();
            //create a cookie - to store the JWT in cookie
            response.cookie("jwt",token,{
                expires:new Date(Date.now()+30000),
                httpOnly:true
               // secure:true  : used only when website is live on https

            });
            //console.log(cookie);
            

            const result = await insertData.save();
            response.status(201).render("index");

        } else {
            response.send("Please enter the same password and confirm password")

        }

    } catch (error) {
        response.send("Eror here");

    }

})


router.get("/login", (request, response) => {
    response.render("login")
})

router.get("/logout",auth,async(request,response)=>{
    try{
        // //loutfrom one and cureent device
        // request.user.tokens= request.user.tokens.filter((element)=>{
        //   return element.token!==request.token
        // })
        //logout from all devices
        request.user.tokens=[];
        response.clearCookie("jwtlogin");
        console.log("logout successfully");
         await request.user.save();
         response.render("login")
    }
    catch(error){
        response.send(error);
    }
}) 

router.post("/login", async (request, response) => {
    // response.render("register");
    try {
        password = request.body.password;
        email = request.body.email;
        const result = await Model.findOne({ email: email })
        //console.log(result.password);
        const getpass = await bcrypt.compare(password, result.password);
        const token = await result.generateAuthToken();

     // set cookie for token
       response.cookie("jwtlogin",token,{
        expires:new Date(Date.now()+2*24*60*60*1000),
        httpOnly:true
        // secure:true  : used only when website is live on https
       })


        if (getpass) {
            response.render("index")
        }
        else {
            response.send("Invalid Login Details");

        }
    } catch (error) {
        response.send("Invalid Login Details2");

    }

})


router.get("*", (request, response) => {
    response.render("404", {
        pagenotfound: "Oops !! Page Not Found"
    });
})

module.exports = router;