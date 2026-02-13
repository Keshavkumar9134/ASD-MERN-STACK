const http = require('http');
const path = require('path');

const {handleroutes} = require('./routes');
const PORT = 5400;
const server  = http.createServer((req,res)=>{
    res.setHeader('Access-Control-Allow-Headers','Content-Type');

    if(req.method==='OPTIONS'){
        res.writeHead(204);
        return res.end();
    }
    return handleroutes(req,res);
});

server.listen(PORT,()=>{
    console.log('server running on port 5400');
})