const express=require("express");
const{UsersController}=require("./controller");

const router=express.Router();

module.exports.UserAPI=(app)=>{
    router
    .get("/",UsersController.getUsers)
    .put("/:id",UsersController.updateUser)
    .get("/:id",UsersController.getUser)
    .post("/",UsersController.createUser)
    .delete("/:id",UsersController.deleteUser)
    app.use(express.json()); 
    app.use("/api/users",router);
}