const { request, response } = require("express");
const express=require("express");
const ourApp=express();
ourApp.get("/",(request,response)=>{
    response.json({message: "request Served!!!"});
});
ourApp.listen(4000,()=>console.log("Server is running"));