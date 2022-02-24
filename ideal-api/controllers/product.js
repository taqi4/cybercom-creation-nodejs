module.exports.index =async (req,res)=>{
    console.log("from product/index");
    res.send((await process.productServices.getAllProducts()));

}
module.exports.add = async(req=req,res)=>{
    try{
        
        console.log(" from product/add" );
        let product = {id :req.body.id,name:req.body.name,description:req.body.description};
        if(await(process.productServices.addProduct(product))){
            res.status(200).send("product added");
        }else{
            throw Error("request body error ")
        }
    }catch(e){
        res.status(400);
        res.send("unable to add product",e.message);
        console.log(e);
    }

}
module.exports.update = async(req,res)=>{
    try{
        console.log("from product update");
        let {id,...update} = req.body;
        if(await(process.productServices.updateProduct(id,update))){
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
    res.status(200).send(await(process.productServices.getProductById(req.params.id)));
    
}catch(e){
    res.status(402).send("unable to get");
    console.log("unable to get product",e.message);
}
}