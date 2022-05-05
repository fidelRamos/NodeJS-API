const express=require("express");
const {Response}=require("../common/response");
const createErrors=require("http-errors");

module.exports.IndexApi=(app)=>{
    const router=express.Router();
    router.get("/",(req,res)=>{
        const menu={
            products:`https:${req.headers.host}/api/produts`,
            users:`https:${req.headers.host}/api/users`,
            sales:`https:${req.headers.host}/api/sales`,
        }
        Response.success(res,200,"Api inventario",menu)
    })

    app.use("/",router)
}

module.exports.NotFoundApi=(app)=>{
    const router=express.Router();
    
    router.all("*",(req,res)=>{
        Response.error(res,new createErrors.NotFound());
    })

    app.use("/",router);

}