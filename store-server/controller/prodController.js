const Product=require("../models/Product")

const getAllProduct = async (req,res) =>{
    const product=await Product.find()
    res.json(product)
}
const getProductByID = async (req,res) =>{
    const {_id}=req.body
    const product=await Product.findById(_id)
    res.json(product)
}
const createProduct=async(req,res)=>{
    // if(!name||!price||!picture)
    //     return res.status(400).json({message:"All field are required"})
    const {name,price,color,picture,amount}=req.body
    const product = await Product.create({name,price,color,picture,amount})
    res.json(product)
}
const deleteProduct=async(req,res)=>{
    // if(!_id)
    //     return res.status(400).json({message:"All field are required"})
    const {_id}=req.body
    const product=await Product.findById(_id)
    const result = await product.deleteOne()
    res.json(`deleted`)
}
const updateProduct=async(req,res)=>{
    // if(!name||!price||!picture)
    //     return res.status(400).json({message:"All field are required"})
    const {_id,name,price,color,picture,amount}=req.body
    const product=await Product.findById(_id)
    product.name=name
    product.price=price
    product.color=color
    product.picture=picture
    product.amount=amount
    const result=await product.save()
    res.json(`${result.name} update`)
}
module.exports={getAllProduct,createProduct,getProductByID,deleteProduct,updateProduct}