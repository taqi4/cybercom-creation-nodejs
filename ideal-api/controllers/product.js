module.exports.index =async (req,res)=>{
    console.log("from product/index");
    res.send(await (framework.services.productServices.getAllProducts()));

}
module.exports.add = async(req=req,res)=>{
    try{
        
        console.log(" from product/add" );
        let product = {id :req.body.id,name:req.body.name,description:req.body.description};
        if(await(framework.services.productServices.addProduct(product))){
            res.status(200).send("product added");
        }else{
            throw Error("request body error ")
        }
    }catch(e){
        res.status(400).send("unable to add product");
        console.log(e);
    }

}
module.exports.update = async(req,res)=>{
    try{
        console.log("from product update");
        let {id,...update} = req.body;
        if(await(framework.services.productServices.updateProduct(id,update))){
            res.status(200).send("product updated");
        }else{
            throw Error("request body error ")
        }
    }catch(e){
        res.status(401).send("unable to update")
        console.log(e);
    }
    
}
module.exports.getProduct = async(req,res)=>{
    try{
    console.log("from getProduct");
    res.status(200).send(await(framework.services.productServices.getProductById(req.params.id)));
    
}catch(e){
    res.status(402).send("unable to get");
    console.log("unable to get product",e.message);
}
}
module.exports.deleteProduct = async(req,res)=>{
    try{
    console.log("from deleteProduct");
    if(await(framework.services.productServices.deleteProductById(req.params.id))){
        res.status(200).send("product deleted");
    }else{
        throw Error("not deleted");
    }

    // res.status(200).send(await(framework.services.productServices.deleteProductById(req.params.id)));
    
}catch(e){
    res.status(402).send("unable to delete");
    console.log("unable to get product",e.message);
}
}
