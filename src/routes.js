const express=require("express");
const routes=express.Router();

routes.get("/",(_,res)=>{
    return res.sendFile(__dirname+"\\views\\index.html");
});

module.exports=routes;