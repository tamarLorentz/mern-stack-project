// import Axios from 'axios'
// import { useNavigate } from 'react-router-dom'
// import {useState} from "react"
// //
// import { useDispatch} from"react-redux"
// import  {setName} from"../Slice/nameSlice"

// const Login=()=>{
//     const Navigate=useNavigate()
//     const dispatch=useDispatch()
//     const [names,setNames]=useState("")
//     const [password,setPassword]=useState("")
//     const log = async (e)=>{
//         e.preventDefault()
//         const {data}=await Axios.post("http://localhost:2100/api/auth/login",{name:names,password})
//         console.log(data);
//         localStorage.setItem("userToken",data.accessToken)
//         dispatch(setName(names))
//         await Navigate("/list")
//     }
//     return(
//         <>
//         <form on onSubmit={log}>
//         name:<input placeholder="name" value={names} onChange={(e)=>setNames(e.target.value)} required={true}/>
//         password:<input placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)} required={true}/>
//         <button type="submit">Login</button>
//         </form>
//         </>
//     )
// }
// export default Login

import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setName } from '../Slice/nameSlice';
// PrimeReact Components
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/md-light-indigo/theme.css';
import 'primeicons/primeicons.css';
import './login.css';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [names, setNames] = useState("");
    const [password, setPassword] = useState("");
    const toast = useRef(null);

    const log = async (e) => {
        e.preventDefault();
        try {
            const { data } = await Axios.post("http://localhost:2100/api/auth/login", { name: names, password });
            console.log(data);
            localStorage.setItem("userToken", data.accessToken);
            dispatch(setName(names));
            navigate("/");
        } catch (error) {
            console.error("Error logging in:", error);
            toast.current.show({ severity: 'error', summary: 'Login Failed', detail: 'Invalid credentials', life: 3000 });
        }
    }

    return (
        <div className="main-content">
            <Toast ref={toast} />
            <div className="login-container">
                <Card className="login-card">
                    <h2 className="login-title">Welcome Back!</h2>
                    <form onSubmit={log} className="p-fluid">
                        <div className="p-field">
                            <span className="p-float-label">
                                <InputText id="name" value={names} onChange={(e) => setNames(e.target.value)} required className="p-inputtext-sm" />
                                <label htmlFor="name">Username</label>
                            </span>
                        </div>
                        <div className="p-field">
                            <span className="p-float-label">
                                <Password id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="p-inputtext-sm" toggleMask />
                                <label htmlFor="password">Password</label>
                            </span>
                        </div>
                        <Button label="Login" type="submit" className="p-button-raised p-button-secondary login-button" />
                    </form>
                </Card>
            </div>
        </div>
    );
}

export default Login;

