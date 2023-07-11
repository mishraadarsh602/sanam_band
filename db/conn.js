const mongoose = require("mongoose");
//local
// const dbconnect =  mongoose.connect("mongodb://127.0.0.1:27017/sanamband").then(()=>{
    const password = encodeURIComponent("adarsh@cluster0");

const dbconnect =  mongoose.connect(`mongodb+srv://mishraadarsh602:${password}@cluster0.hqsqpnx.mongodb.net/sanamband?retryWrites=true&w=majority`).then(()=>{
    console.log("connected to db successfully")  
}).catch((error)=>{
 console.log(error);
})

module.exports= dbconnect;