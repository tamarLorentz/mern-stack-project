const Cart=require("../models/cart")
const Product=require("../models/Product")

const addProduct=async(req,res)=>{
    const{idProd}=req.body
    if(!idProd){
        return res.status(400).json({message:"All fields are required"})
    }
    const _id=req.user
    const cart=await Cart.findOne({user:_id}).exec()
    if(!cart){
        const newCart=await Cart.create({user:_id,shoppingCart:[{product:idProd}]})
        res.json(newCart)
    }
    else{
        cart.shoppingCart=[...cart.shoppingCart,{product:idProd}]
        const result=await cart.save()
        res.json(result.shoppingCart)
    }

    }
const deleteProduct=async(req,res)=>{
    const {idProd}=req.body
    const {_id}=req.user
    const cart=await Cart.findOne({user:_id}).exec()
    let f=0
    cart.shoppingCart=cart.shoppingCart.filter((p)=>{
        f=p.product.toString()===idProd?f+1:f
        return p.product.toString()!==idProd||f!=1
    })
    const updateCart=await cart.save()
    res.json(cart)
}
const getCart=async(req,res)=>{
    const {_id}=req.user
    const cart=await Cart.findOne({user:_id})
    .populate("shoppingCart.product",{name:1,price:1,picture:1,color:1})
    res.json(cart)
}
module.exports={addProduct,deleteProduct,getCart}