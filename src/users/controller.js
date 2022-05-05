const createError=require("http-errors");
const debug=require("debug")("app:module-users-controller");
const{UsersServive}=require("./service");
const{Response}=require("../common/response");

module.exports.UsersController={
    getUsers: async(req,res)=>{
        try {
            let users=await UsersServive.getAll();
            Response.success(res,200,"Lista de usuarios",users);
        } catch (error) {
            debug(error);
            //res.status(500).json({message:"Internal server error"})
            Response.error(res);
        }
    },
    getUser:async(req,res)=>{
        try {
            const {params:{id} }=req;
            let userById=await UsersServive.getById(id);
            //res.json(productById);
            if (!userById) {
                Response.error(res,new createError.NotFound());
            }else{
                Response.success(res,200,`Usuario ${id}`,userById);
            }

        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    createUser:async(req,res)=>{
        try {
            const user=req.body
            if (!user|| Object.keys(user).length===0) {
                Response.error(res,new createError.BadRequest());
            }else{
                const insertedId= await UsersServive.create(user);
                Response.success(res,201,`Usuario agregado`,insertedId);
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    updateUser:async(req,res)=>{
        try {
            const {params:{id} }=req;
            const user=req.body
            let userById=await UsersServive.update(id,user);
            //res.json(productById);
            if (!userById) {
                Response.error(res,new createError.NotFound());
            }else{
                Response.success(res,200,`Usuario ${id} actualizado`,userById);
            }

        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    deleteUser:async(req,res)=>{
        try {
            const {params:{id} }=req;
            let removeUser=await UsersServive.dele(id);
            //res.json(productById);
            Response.success(res,200,`Usuario ${id} removido`,removeUser);
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
}