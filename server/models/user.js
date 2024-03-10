const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    googleId:{type:String},
    email:{type:String,required:true,unique:true},
    dp:{type:String},
    displayName:{type:String,required:true},
    password:String,
})

module.exports = mongoose.model("User",userSchema);