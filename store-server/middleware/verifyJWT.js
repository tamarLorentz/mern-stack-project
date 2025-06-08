const jwt=require("jsonwebtoken")

const verifyJWT=(req,res,next)=>{
    const header=req.headers.Authorization||req.headers.authorization
    if(!header?.startsWith("Bearer ")){
        return res.status(401).json({message:"Unauthorized"})
    }
    const token=header.split(' ')[1]
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err,decoded)=>{
            if(err)
                return res.status(401).json({message:"Forbidden"}) 
            req.user=decoded
            next() 
        }
    )
}
module.exports=verifyJWT