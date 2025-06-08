const express=require("express")
const router=express.Router()
const userController=require("../controller/userController")
const verifyJWT=require("../middleware/verifyJWT") 

router.post("/",userController.createUser)
router.use(verifyJWT)

router.get("/",userController.getAllUser)
router.get("/:name",userController.getUserByID)
router.delete("/",userController.deleteUser)
router.put("/",userController.updateUser)


module.exports=router