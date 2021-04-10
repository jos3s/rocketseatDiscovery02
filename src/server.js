const express=require("express");

const server=express();

server.get("/",(_,res)=>{
    return res.sendFile(__dirname+"\\views\\index.html");
});

server.listen(3000, ()=> console.log("Rodando"));