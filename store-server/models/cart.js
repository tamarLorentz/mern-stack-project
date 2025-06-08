const mongoose=require("mongoose")
const prodSchema = require("./ProdSchema")

const cartSchema=new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required:true
    },
    shoppingCart:{
        type: [prodSchema], 
        //required:true
    }
},{
    timestamps:true
}
)
module.exports=mongoose.model("Cart",cartSchema)