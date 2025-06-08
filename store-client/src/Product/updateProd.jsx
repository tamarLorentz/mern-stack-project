import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

const UpdateProd=()=>{
    const Navigate=useNavigate()
    const location=useLocation()
    const p=location.state
    const [name,setName]=useState(p.name)
    const [price,setPrice]=useState(p.price)
    const [color,setColor]=useState(p.color)
    const [picture,setPicture]=useState(p.picture)
    const updateProd=async()=>{
         const {data}=await axios.put("http://localhost:2100/api/product",{name,price,color,picture,_id:p._id},
            {headers:{Authorization:"Bearer "+localStorage.getItem("userToken")}})
         console.log(data);
         await Navigate('/manage')
     }
    return(
    <>
    name:<input value={name} onChange={(e)=>setName(e.target.value)}/>
    price:<input value={price} onChange={(e)=>setPrice(e.target.value)}/>
    color:<input value={color} onChange={(e)=>setColor(e.target.value)}/>
    picture:<input value={picture} onChange={(e)=>setPicture(e.target.value)}/> 
    <button onClick={updateProd}>Update</button>
    </>
    )
}
export default UpdateProd