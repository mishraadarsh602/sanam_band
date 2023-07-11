const express = require("express");
const app = express();
require('dotenv').config();
const dbconnect = require("../db/conn");
const cookieParser = require('cookie-parser')
const path = require("path")
const hbs = require("hbs")
const router = require("../routes/router")
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
const staticPath = path.join(__dirname, "../public");
const templatePath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// inbuilt  middleware
app.use(express.static(staticPath))
//set the view engine  using hbs
app.set('view engine', 'hbs');
//set the by default views to templatepath
app.set('views', templatePath);
//set the partials  - partials are used for reusable code
hbs.registerPartials(partialsPath);
//cookie-parser middleware
app.use(cookieParser());

//set the router middleware
app.use("/", router);

app.listen(3030, () => {
    console.log("The app is running at port 3030")
})