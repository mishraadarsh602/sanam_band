const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

const SanamSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    mobile:{
        type:String,
        unique:true,
        minlength:10
    },
    password:{
        type:String,
        minlength:1
    },
    confirmpassword:{
        type:String,
        minlength:1
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]

})


//generating token
SanamSchema.methods.generateAuthToken = async function(){
    try{
        //id, secret key
      const token = jwt.sign({_id:this._id.toString()},process.env.SECRET_KEY)
      //console.log(token);
      
      this.tokens=this.tokens.concat({token:token});
      await this.save();
      return token;

    }catch(error){
      console.log(error);
    }
}

//secure password using bcryptjs
SanamSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10);
        //console.log("test1");
        this.confirmpassword=await bcrypt.hash(this.password,10);
        //console.log("test2");

    }
   
     next();
})


//create collection

const Model = mongoose.model("registration",SanamSchema);

module.exports=Model;