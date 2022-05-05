const createError=require("http-errors");
const debug=require("debug")("app:module-preducts-controller");
const{ProductServive}=require("./service");
const{Response}=require("../common/response");

module.exports.ProductsController={
    getProducts: async(req,res)=>{
        try {
            let products=await ProductServive.getAll();
            Response.success(res,200,"Lista de productos",products);
            //res.json(products);
        } catch (error) {
            debug(error);
            //res.status(500).json({message:"Internal server error"})
            Response.error(res);
        }
    },
    getProduct:async(req,res)=>{
        try {
            const {params:{id} }=req;
            let productById=await ProductServive.getById(id);
            //res.json(productById);
            if (!productById) {
                Response.error(res,new createError.NotFound());
            }else{
                Response.success(res,200,`Producto ${id}`,productById);
            }

        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    createProducts:async(req,res)=>{
        try {
            const product=req.body
            if (!product|| Object.keys(product).length===0) {
                Response.error(res,new createError.BadRequest());
            }else{
                const insertedId= await ProductServive.create(product);
                Response.success(res,201,`Producto agregado`,insertedId);
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    updateProduct:async(req,res)=>{
        try {
            const {params:{id} }=req;
            const product=req.body
            let productById=await ProductServive.update(id,product);
            //res.json(productById);
            if (!productById) {
                Response.error(res,new createError.NotFound());
            }else{
                Response.success(res,200,`Producto ${id} actualizado`,productById);
            }

        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    deleteProduct:async(req,res)=>{
        try {
            const {params:{id} }=req;
            let removeProduct=await ProductServive.dele(id);
            //res.json(productById);
            Response.success(res,200,`Producto ${id} removido`,removeProduct);
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    generateReport:async(req,res)=>{
        try {
            ProductServive.generateReport("Inventario",res)
        } catch (error) {
            debug(error);
            Response.error(res);    
        }
    },
}