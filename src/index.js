 const path =require("path")
const hbs = require("hbs")
const express = require("express");

const  app = express();

const staticPath =path.join(__dirname,"../public");
const templatePath =path.join(__dirname,"../templates/views");
const partialsPath =path.join(__dirname,"../templates/partials");

console.log(staticPath)  
// inbuilt  middleware
app.use(express.static(staticPath))
//set the view engine  using hbs
app.set('view engine','hbs');
//set the by default views to templatepath
app.set('views',templatePath);
//set the partials  - partials are used for reusable code
hbs.registerPartials(partialsPath);

app.get("/",(request,response)=>{
    response.render('index',{
        name:"Adarsh",
        songs:[
            {song1:"Gulabi Aankhen"},{song2:"Dil Kya Kre"},{song3:"Dilbar Mere"},{song4:"Hai Apna Dil To Awaara"},{song5:"Kya Hua Tera Wada"},{song6:"Neele Neele Ambar Par"},{song7:"Yeh Raat Bheegi Bheegi"}
        ],
        about:"The band SANAM comprises of VENKY S, SANAM PURI, KESHAV DHANRAJ and SAMAR PURI (from left to right). Together, these four friends have embarked on a magical journey to explore, create and share their music with the world. From recreating old classics, to composing deep and catchy originals, SANAM is on a mission to spread love and happiness through their music releases and their live concerts."
    });
})


app.get("/aboutus",(request,response)=>{
    response.render('aboutus',{
        about:"The band SANAM comprises of VENKY S, SANAM PURI, KESHAV DHANRAJ and SAMAR PURI (from left to right). Together, these four friends have embarked on a magical journey to explore, create and share their music with the world. From recreating old classics, to composing deep and catchy originals, SANAM is on a mission to spread love and happiness through their music releases and their live concerts."
    });
})

app.get("/contactus",(request,response)=>{
    response.render("contactus");
})
app.get("/gallery",(request,response)=>{
    response.render("gallery");
})
app.get("/band-members",(request,response)=>{
    response.render("band-members");
})

app.get("*",(request,response)=>{
    response.render("404",{
        pagenotfound:"Oops !! Page Not Found"
    });
})

// app.get("/temp",(request,response)=>{
//    // response.send("Welcome to homepage");
//    //response.json(); // also change the non-object to string
//   // response.send();  // do not change non-object
//    response.send({
//     name:"adarsh",
//     designation:"software developer"
//    })

// })

app.listen(3030,()=>{
   console.log("The app is running at port 3030")
})