const User=require("../models/User")

const getAllUser = async (req,res) =>{
    const users=await User.find()
    res.json(users)
}
const getUserByID = async (req,res) =>{
    const {name}=req.params
    const user=await User.findById(name)
    res.json(user)
}
const createUser=async(req,res)=>{
    const {name,username,email,adress,phone}=req.body
    const user = await User.create({name,username,email,adress,phone})
    res.json(user)
}
const deleteUser=async(req,res)=>{
    const {_id}=req.body
    const user=await User.findById(_id)
    const result = await user.deleteOne()
    res.json(`${result.name} deleted`)
}
const updateUser=async(req,res)=>{
    const {_id,name,username,email,adress,phone}=req.body
    const user=await User.findById(_id)
    user.name=name
    user.username=username
    user.email=email
    user.adress=adress
    user.phone=phone
    const result=await user.save()
    res.json(`${result.name} update`)
}

module.exports={getAllUser,getUserByID,createUser,deleteUser,updateUser}