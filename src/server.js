const express=require("express");
const routes=require("./routes");

const server=express();

server.use(express.urlencoded({extended:true}));
server.set("view engine","ejs");
server.use(express.static("public"));
server.use(routes);

server.listen(3000, ()=> console.log("Rodando"));