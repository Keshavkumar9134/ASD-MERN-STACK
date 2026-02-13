const express = require("express");
const app = express();
const port = 5000;

app.use(express.json());

const products = [
    {id:1,name:"laptop",price:65000},
        {id:2,name:"watch",price:6059},
    {id:3,name:"phone",price:26000},
        {id:4,name:"lap",price:116500},


]

function generateid(){
    const maxid = products.reduce((max,p)=>(p.id>max? p.id:max),0)
    return maxid+1;
}

app.get("/",(req,res)=>{
    res.send("Welcome to Home");
});

app.get("/about",(req,res)=>{
    // res.send("Welcome to about");
    res.json({
        total:products.length,
        products
    });
});

//data insert
app.post("/register",(req,res)=>{
    const {name,price} = req.body;
    const newproduct ={
        id:generateid(),
        name:name.trim(),
        price
    };
    products.push(newproduct);
    res.status(200).json({
        message:"product added",
        product:newproduct
    });
})

app.get('/products/search',(req,res)=>{
    const q = (req.query.q || "").toString().trim().toLocaleLowerCase();
    //include keyword is used to search in an array
    const results = products.filter((p)=>p.name.toLocaleLowerCase().includes(q));
    res.json({
        query:q,
        total:results.length,
        results
    })
})

app.get("/products/:id",(req,res)=>{
    //in my products array ,id is in string, so has to convert into number
    const id = Number(req.params.id);
     //params has information of the every object, but i need only id 
     const product = products.find((p)=>p.id===id);
     res.json(product);
})

app.get("/contact",(req,res)=>{
    res.json({message:"this is contact page"});
});

//start server
app.listen(port,()=>{
    console.log(`server running on port no.: ${port}`);
})