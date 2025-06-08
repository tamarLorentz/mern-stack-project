// import Axios from 'axios'
// const { useState } = require("react")

// const Register=()=>{
//     const [name,setName]=useState("")
//     const [email,setEmail]=useState("")
//     const [password,setPassword]=useState("")
//     const [username,setUsername]=useState("")
//     const [adress,setAdress]=useState("")
//     const [phone,setPhone]=useState("")

//     const create=async(e)=>{
//         e.preventDefault()
//         try{
//             const {data} = await Axios.post("http://localhost:2100/api/auth/register",{name,username,password,email,adress,phone})
//         }catch(err){
//             alert(err.message)
//         }
//         //console.log(data);
//     }
//     return(
//         <>
//         <form onSubmit={create}>
//         id:<input placeholder="id" value={name} onChange={(e)=>setName(e.target.value)} required={true} />
//         userName:<input placeholder="username" value={username} onChange={(e)=>setUsername(e.target.value)} required={true}/>
//         password:<input placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)} required={true} />
//         email:<input placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)} required={true} />
//         adress:<input placeholder="adress" value={adress} onChange={(e)=>setAdress(e.target.value)}/>
//         phone:<input placeholder="phone" value={phone} onChange={(e)=>setPhone(e.target.value)}/>
//         <button type="submit">Register</button>
//         </form>
//         </>
//     )
// }
// export default Register
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import './styles.css'; // Import CSS file

const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const toast = useRef(null);

    const create = async (e) => {
        e.preventDefault();
        try {
            const { data } = await Axios.post("http://localhost:2100/api/auth/register", { name, username, password, email, address, phone });
            console.log(data);
            await navigate("/login"); // Redirect to login after successful registration
        } catch (err) {
            console.error("Error registering:", err);
            toast.current.show({ severity: 'error', summary: 'Registration Failed', detail: 'Please check the inputs and try again', life: 3000 });
        }
    }

    return (
        <div className="register-container">
            <Toast ref={toast} />
            <Card title="Register" className="register-card">
                <form onSubmit={create} className="p-fluid register-form">
                    <div className="form-column">
                        <div className="p-field">
                            <label htmlFor="name">ID</label>
                            <InputText id="name" value={name} onChange={(e) => setName(e.target.value)} required className="p-inputtext-sm" />
                        </div>
                        <div className="p-field">
                            <label htmlFor="username">Username</label>
                            <InputText id="username" value={username} onChange={(e) => setUsername(e.target.value)} required className="p-inputtext-sm" />
                        </div>
                        <div className="p-field">
                            <label htmlFor="password">Password</label>
                            <Password id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="p-inputtext-sm" toggleMask />
                        </div>
                    </div>
                    <div className="form-column">
                        <div className="p-field">
                            <label htmlFor="email">Email</label>
                            <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="p-inputtext-sm" />
                        </div>
                        <div className="p-field">
                            <label htmlFor="address">Address</label>
                            <InputText id="address" value={address} onChange={(e) => setAddress(e.target.value)} className="p-inputtext-sm" />
                        </div>
                        <div className="p-field">
                            <label htmlFor="phone">Phone</label>
                            <InputText id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="p-inputtext-sm" />
                        </div>
                    </div>
                    <Button label="Register" type="submit" className="p-button-raised p-button-secondary register-button" />
                </form>
            </Card>
        </div>
    );
}

export default Register;

