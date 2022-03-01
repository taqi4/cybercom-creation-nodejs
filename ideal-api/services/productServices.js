
const Product = require("../models/product");
module.exports.addProduct =async ({id,name,description} = product)=>{
        try{
            // let productExist = products.find((e)=>e.id==id);
            // if(!id || productExist){
            //     throw Error("product should have  id and it should be unique");
            // }
            Product.create({id,name,description})
            .then(result => console.log(result))
            .catch(e=> {throw Error(e.message)});
            return true;
        }catch(e){
            console.log(e.message);
            return false;
        }
}
module.exports.getAllProducts = async ()=>{
    return await(Product.findAll());
}
module.exports.getProductById = async (id)=>{
    try{
        let productExist = await Product.findAll({where:{id:id}})
        return productExist;
    }catch(e){
        console.log(e);
    }
}
module.exports.deleteProductById = async (id)=>{
    try{
        let productExist = await Product.destroy({where:{id:id}})
        return productExist;
    }catch(e){
        console.log(e);
    }
}
module.exports.updateProduct = async (id,update)=>{
    try{
        const result = await Product.update(update,{where:{id}});
        return true;
    }catch(e){
        return false;
        console.log(e.message);
    }
}