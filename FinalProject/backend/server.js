const express = require("express");
const cors = require("cors");
const path = require("path");//for access static files(uploads) in server.js

require("dotenv").config();//to secure/config the dotenv
const connectdb = require("./config/db");
const jobroutes = require("./routes/jobroutes");


const app = express();//to call express.js

app.use(cors());
app.use(express.json()); //data will be json format, so use express.json

//server upload images: we have to
//to join the static directory("uploads") with server using ''path'' module
app.use('/uploads',express.static(path.join(__dirname,"uploads")));

connectdb();
app.use("/api/jobs",jobroutes);

app.get('/',(req,res)=>{
    res.send("api is working..");
});

const PORT = process.env.PORT || 5500; //for accress the .env , we usse the ' "process" module '

app.listen(PORT,()=>{ //TO RUN server on THE PORT
    console.log(`server is running on port no: ${PORT}`);
})