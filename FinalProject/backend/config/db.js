//to connect mongodb database

const mongoose = require("mongoose");

//generally 'async' is used to send request
//and  'await' is used to receive 
async function connectdb(){
    try{ 
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MONGODB CONNECTED..");
    }catch(err){
        console.error(err);
    }
}
module.exports = connectdb;