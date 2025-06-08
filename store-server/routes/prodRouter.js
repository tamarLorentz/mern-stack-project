const express=require("express")
const router=express.Router()
const prodController=require("../controller/prodController")
const cartController=require("../controller/cartController")
const verifyJWT=require("../middleware/verifyJWT") 

router.get("/",prodController.getAllProduct)
router.use(verifyJWT)
router.post("/",prodController.createProduct)
router.delete("/",prodController.deleteProduct)
router.put("/",prodController.updateProduct)
router.get("/byId",prodController.getProductByID)
//cart
router.put("/cart",cartController.addProduct)
router.get("/cart",cartController.getCart)
router.put("/cart/delete",cartController.deleteProduct)


module.exports=router