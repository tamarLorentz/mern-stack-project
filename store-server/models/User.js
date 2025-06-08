const mongoose=require("mongoose")
const prodSchema = require("./ProdSchema")

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    adress:{
        type:String
    },
    phone:{
        type:String,        
    },
    active:{
        type:Boolean,
        default:true        
    },
    roles:{
    type:String,
    enum:["admin","user"],
    default:"user"
}
},{
    timestamps:true
}

)
module.exports=mongoose.model("User",userSchema)