import {createSlice} from '@reduxjs/toolkit'

const value={
    name:""
}

const nameSlice=createSlice({
name:"name",
initialState: value,
reducers:{
   setName:(state,actions)=>{
    state.name=actions.payload
   } 
}
})
export const {setName} =nameSlice.actions
export default nameSlice.reducer
