import { useDispatch, useSelector } from"react-redux"
const { setName } = require("./nameSlice")

const Try=()=>{
const dispatch=useDispatch()
const name=useSelector(n=>n.nameSlice.name)
dispatch(setName(""))

return <>
<h1>{name}</h1>
</>
}
export default Try
