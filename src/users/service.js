const{ObjectId}=require("mongodb");
const {Database} =require("../database/index");
const COLLECTION="users";

const getAll= async()=>{
    const collection= await Database(COLLECTION);
    return await collection.find({}).toArray();
}   

const getById= async (id)=>{
    const collection= await Database(COLLECTION);
    
    return collection.findOne({ _id: ObjectId(id)})
}

const create= async (product)=>{
    try {
        const collection= await Database(COLLECTION);
        //let result=collection.insertMany([{ a: 1 }, { a: 2 }, { a: 3 }])
        let result= await collection.insertOne(product);
        return result.insertedId
    } catch (error) {
        console.log("No se pudo obtener los datos del POSTMAN")
    }
    
}

const update=async(id,body)=>{
    const collection= await Database(COLLECTION);
    const updateColecc={$set:body}
    return await collection.updateOne({ _id: ObjectId(id)},updateColecc)
}
const dele=async(id)=>{
    const collection= await Database(COLLECTION);
    return await collection.deleteOne({ _id: ObjectId(id)})
}
module.exports.UsersServive={
    getAll,
    getById,
    create,
    update,
    dele,
}