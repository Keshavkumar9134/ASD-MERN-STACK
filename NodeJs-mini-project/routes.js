const url = require('url');
const ptrl = require('./controllers/product.controller');
const path = require('path');

function handleroutes(req,res){
    const parsed = url.parse(req.url,true);
    const pathname = parsed.pathname;
    const query = parsed.query;

    if(pathname==='/' && req.method==="GET"){
       res.writeHead(200,{"Content-Type":"text/plain"});
        return res.end('crudddd operation');
    }
    if(pathname==='/products' && req.method==="GET"){
        if(query.id) return ptrl.getsingleproduct(req,res,query);
        return ptrl.getallproducts;
    }
    if(pathname==='/' && req.method==="POST"){
        return ptrl.addproduct(req,res);
    }

    res.writeHead(404,{"Content-Type":"application/json"})
}

module.exports = {handleroutes};