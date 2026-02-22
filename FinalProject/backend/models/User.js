
const mongoose = require("mongoose");

//schema define structure, types

const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
        email:{type:String,required:true,unique:true},
    password:{type:String,required:true},

    
},
);

module.exports = mongoose.model("job-auth",userSchema);