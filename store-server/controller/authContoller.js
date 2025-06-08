const User=require("../models/User")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

const login=async(req,res)=>{
    const {name,password}=req.body
    if(!name||!password){
        return res.status(400).json({message:"All field are required"})
    }
    const findUser=await User.findOne({name})
    if(!findUser||!findUser.active){
        return res.status(401).json({message:"Unathourized"})
    }
    const match=await bcrypt.compare(password,findUser.password)
    if(!match){
        return res.status(401).json({message:"Unathourized"})
    }
    const userInfo={
        _id:findUser._id,
        name:findUser.name,
        username:findUser.username,
        email:findUser.email
          
    } 
    const accessToken=jwt.sign(userInfo,process.env.ACCESS_TOKEN_SECRET)
    res.json({accessToken})
}

const register=async(req,res)=>{
    const {name,username,password,email,adress,phone}=req.body
    if(!name||!username||!password||!email){//||!adress||!phone){
        // console.log(name,username,password,email);
        return res.status(400).json({message:"All field are required"})
    }
    const userDuplicate=await User.findOne({name})
    if(userDuplicate){
        return res.status(409).json({message:"Duplicate user"})
    }
    const hashPassword=await bcrypt.hash(password,10)
   
    const user=await User.create({name,username,password:hashPassword,email,adress,phone})
  
    if(!user){
        return res.status(400).json({message:"Bad request"})
    }
    res.json(`${user.name} are created`)
}
module.exports={login,register}