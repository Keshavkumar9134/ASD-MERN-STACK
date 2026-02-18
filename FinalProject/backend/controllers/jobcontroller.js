const job = require("../models/job");
const fs = require("fs");
const path = require("path");

//function for old image delete
function deletefileexists(filepathfromroot){
    try{
        if(!filepathfromroot) return;
        const fullpath = path.join(__dirname,"..",filepathfromroot);
        if(fs.existsSync(fullpath)) fs.unlinkSync(fullpath);//to upload the new file , first have to unlink the old image deleted file
    }catch(e){
        console.error(e);
    }
}

//createjob: have to send all fields of job as request  to server.js 
exports.createjob = async(req,res)=>{
    const {title,company,location,salary,description} = req.body;  //destructing from body to send request to server
    const jobimage = req.file? `/uploads/jobs/${req.file.filename}`:""; //send request for file
    const  job = await job.create({//insert all destructuring fields into new 'job', so inserted using 'job.create'
        title,
        company,
        location,
        salary :salary ? Number(salary) : 0,
        description,
        jobimage
    });

    res.status(201).json({success:true,message:"job created...",job});
};

//get all the jobs
exports.getalljobs = async(req,res)=>{
    const jobs = await job.find();
    res.status(201).json({success:true, mess:"job created",total:jobs.length,job});
}

//get single job
exports.getbyjob = async(req,res)=>{
    const job = await job.findById(req.params.id);//to fetch inside the body,"paarams" is used
    res.status(201).json(job);
}

//delete
exports.deletejob = async(req,res)=>{
    const job = await job.findById(req.params.id);
    deletefileexists(job.jobimage);
    await job.findByIdAndDelete(req.params.id);
    res.status(201).json({message:"job deleted"});
}
