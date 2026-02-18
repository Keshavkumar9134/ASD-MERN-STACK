const router = require("express").Router();
const path = require("path");
const multer = require("multer");

const jbtrl = require("../controllers/jobcontroller");

//store
const storage = multer.diskStorage({
    destination:(req,file,cb)=>cb(null,path.join(__dirname,"..","uploads","jobs")),
    filename:(req,file,cb)=>{
        const ext = path.extname(file.originalname).toLocaleLowerCase();
        cb(null,`job_${Data.now()}${ext}`);

    }
});
const filefilter = (req,file,cb)=>{
    const allowed = ["image/jpeg","image/png","image/jpg","image/webp"]; 
    if(allowed.includes(file.mimetype)) cb(null,true);
    else cb(new Error("only image file needed"),false);
};

const upload = multer({
    storage,
    filefilter,
    limits:{fileSize:2*1024*1024}
})

router.post("/",upload.single("jobimage"),jbtrl.createjob);
router.get("/",jbtrl.getalljobs);
router.get("/:id",jbtrl.getbyjob);
router.delete("/:id",jbtrl.deletejob);

module.exports  =router;