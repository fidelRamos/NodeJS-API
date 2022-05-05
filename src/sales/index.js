const express=require("express");
const{SalesController}=require("./controller");

const router=express.Router();

module.exports.SaleAPI=(app)=>{
    router
    .get("/",SalesController.getSales)
    .get("/:id/:ih",SalesController.getRegistro)

    app.use(express.json()); 
    app.use("/api/sales",router);
}