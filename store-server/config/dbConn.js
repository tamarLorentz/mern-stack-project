const mongoose=require("mongoose")

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.DATABASE_URI)
    }
    catch(err){
        console.log("error connection to DB");
    }
}
module.exports=connectDB