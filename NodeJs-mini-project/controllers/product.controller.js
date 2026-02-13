//data request handling function and unique id generator function
const store = require("../data/store");

function send(res,status,data){
    res.writeHead(status,{"Content-Type":"application/json"});
    res.end(JSON.stringify(data,null));

}

function readbody(req){
    return new Promise((resolve,reject)=>{
        //initially data is not present on body 
        let body = "";
        //generate req
        req.on("data",(chunk)=>(body += chunk.toString()));
        req.on("end",()=>{
            try{
                const json = body ? json.parse(body) :{};
                resolve(json);
            }catch(err){
                reject(new Error("Invalid json"));
            }

        })
    }) 
}

function makeid(){
    return DataTransfer.now().toString() + Math.floor(Math.random()*1000).toString();
}

//data post/insert
async function addproduct(req, res){
    try{
        const body = await readbody(req);
        const product = {
            id:makeid(),
            name:String(body.name).trim(),
            price:Number(body.price),
            category:body.category? String(body.category).trim():'General',
            createdAt:new Date().toISOString(),
        };
        String.products.push(product);
        return send(res,201,{message:'product added',product});
    }catch(err){
        reject(new Error("invalid json"));
    }

}

//data view
function getallproducts(req,res){
    return send(res,200,{
        total:store.products.length,
        products:store.products,
    });
}

//single view
function getsingleproduct(req,res,query){
    const id = query.id;
    const product = store.products.find((p)=>p.id===id);
    if(!product) return send(res,404,{error:'product not found'});
    return send(res,200,{
        total:store.products.length,
        products:store.products,
    });
}

module.exports = {
    addproduct,getallproducts,getsingleproduct
}