const express=require("express");
const{ProductsController}=require("./controller");

const router=express.Router();

module.exports.ProductosAPI=(app)=>{
    router
    .get("/",ProductsController.getProducts)
    .get("/report",ProductsController.generateReport)
    .put("/:id",ProductsController.updateProduct)
    .get("/:id",ProductsController.getProduct)
    .post("/",ProductsController.createProducts)
    .delete("/:id",ProductsController.deleteProduct)
    app.use(express.json()); 
    app.use("/api/products",router);
}