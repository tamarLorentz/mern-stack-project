const mongoose=require("mongoose")

const productSchema=new mongoose.Schema({
    name:{
        type:String,
         unique:true,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    color:{
        type:String,
    },
    picture:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        default:1
    }
},{
    timestamps:true
}

)
module.exports=mongoose.model("Product",productSchema)