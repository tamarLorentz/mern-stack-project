require("dotenv").config()
const express=require("express")
const mongoose=require("mongoose")
const app=express()
const cors=require("cors")
const corsOptions=require("./config/corsOptions")
const PORT=process.env.PORT||2500
const connectDB=require("./config/dbConn")

connectDB()
app.use(express.json())
app.use(cors(corsOptions))
app.use(express.static("public"))

app.use("/api/user",require("./routes/userRoutes"))
app.use("/api/auth",require("./routes/authRouter"))
app.use("/api/product",require("./routes/prodRouter"))


mongoose.connection.once("open",()=>{
    console.log("connected to mongodb")
    app.listen(PORT,()=>{
        console.log(`server runing on port ${PORT}`);
})
})
mongoose.connection.on("eror",err=>{
    console.log(err);
})