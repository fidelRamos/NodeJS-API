const express=require("express");
const debug=require("debug")("app:main");
const {Config}=require("./src/config/index")
const {ProductosAPI}=require("./src/products/index");
const { SaleAPI } = require("./src/sales");
const {UserAPI}=require("./src/users/index")
const app=express();
const{IndexApi, NotFoundApi}=require("./src/index/index");

//modulos
IndexApi(app)
ProductosAPI(app);
UserAPI(app);
SaleAPI(app);
NotFoundApi(app);

app.use(express.json()); 
app.listen(Config.port,()=>{
    debug(`Servidor escuchando en el puerto ${Config.port}`);
})