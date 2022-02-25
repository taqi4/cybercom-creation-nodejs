var products = [{
    id:1,
    name:"mobile",
    description:"smartphone"
}];
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
    return products;
}
module.exports.getProductById = async (id)=>{
    try{
        let productExist = products.find(e => e.id==id);
        if(!productExist){
            throw Error(`no product of id :${id}`);
        }
        return productExist;
    }catch(e){
        console.log(e);
    }
}
module.exports.updateProduct = async (id,update)=>{
    try{
        var i = 0;
        let productExist = products.find((e,index) => {
            i = index;
            return e.id==id;
        });

        if(!productExist){
            throw Error(`no product of id :${id}`);
        }
        products[i]={...productExist,...update};
        return true;
    }catch(e){
        return false;
        console.log(e.message);
    }
}