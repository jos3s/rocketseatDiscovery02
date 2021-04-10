const express=require("express");
const routes=express.Router();

const basePath=__dirname+"/views";

routes.get("/",(_,res) => res.sendFile(basePath+"/index.html") );
routes.get("/job",(_,res) => res.sendFile(basePath+"/job.html") );
routes.get("/job/edit",(_,res) => res.sendFile(basePath+"/job-edit.html") );
routes.get("/profile",(_,res) => res.sendFile(basePath+"/profile.html") );

module.exports=routes;