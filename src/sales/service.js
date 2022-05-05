const{ObjectId}=require("mongodb");
const {Database} =require("../database/index");
const COLLECTION="sales";
const{ProductServive}=require("../products/service")
const{UsersServive}=require("../users/service")

const getAll= async()=>{
    const collection= await Database(COLLECTION);
    return await collection.find({}).toArray();
}   

const registroProduc=async(idUser,idProd,body)=>{
    let product=  await ProductServive.getById(idProd);
    let user= await UsersServive.getById(idUser);
    let unidades= product.Unidades_dispnibles-Object.values(body)[0];
    const updateProdu={"Unidades_dispnibles":unidades}
    await ProductServive.update(idProd,updateProdu)
    delete product.Unidades_dispnibles    
    const collection= await Database(COLLECTION);

    const getById= async ()=>{
        const collection= await Database(COLLECTION);
        return collection.findOne({ _id: ObjectId(idUser)})
    }
    const sale={
        user:user.name,
        registro:[{...product,
            unidades}]
    }
    if (unidades<0) {
        console.log("No hay producto en stock")
    }else{
        let result= await collection.insertOne(sale);
        return result
    }
}

module.exports.SalesService={
    getAll,
    registroProduc,
}