import nameSlice from './Slice/nameSlice'
import { configureStore } from '@reduxjs/toolkit'


const myStore=configureStore({
    reducer:{
        nameSlice
    }
})
export default myStore