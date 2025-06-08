const mongoose=require("mongoose")
const prodSchema=new mongoose.Schema({
    product:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product',
        require:true
    },
},{
    timestamps:true
}
)
module.exports=prodSchema