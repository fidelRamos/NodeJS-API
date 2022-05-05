const createError=require("http-errors");
const debug=require("debug")("app:module-sales-controller");
const{SalesService}=require("./service");
const{Response}=require("../common/response");

module.exports.SalesController={
    getRegistro: async(req,res)=>{
        try {
            const {params:{id} }=req;
            const {params:{ih} }=req;
            const cantidad=req.body
            let registros=await SalesService.registroProduc(id,ih,cantidad)
            if (!registros) {
                Response.error(res,new createError.NotFound());
            }else{

                Response.success(res,200,"Registro de ventas",registros)
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    getSales: async(req,res)=>{
        try {
            let products=await SalesService.getAll();
            Response.success(res,200,"Lista de ventas",products);
            //res.json(products);
        } catch (error) {
            debug(error);
            //res.status(500).json({message:"Internal server error"})
            Response.error(res);
        }
    },
}