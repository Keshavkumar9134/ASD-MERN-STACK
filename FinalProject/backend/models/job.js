//....to build job collection, define schema for job....

const mongoose = require("mongoose");

//schema define structure, types

const jobSchema = new mongoose.Schema({
    title:{type:String,required:true},
    company:{type:String,required:true},
    location:{type:String,required:true},
    salary:{type:Number,default:0},
    description:{type:String,required:true},

    jobimage:{type:String,default:""},
    
},
{timestamps:true}
);

//"job" model is created at MONGODB where we call the schema-"jobSchema",
//then export it
module.exports = mongoose.model("job",jobSchema);