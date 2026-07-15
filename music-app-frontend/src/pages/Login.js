import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

import { MdLogin } from "react-icons/md"; // modern login

export default function Login() {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({
        email:"",
        password:""
    })
    const [error, setError] = useState({
        email:"",
        password:""
    })
    
    const handleSubmit = async (e)=> {
        e.preventDefault()
        //validation
        let valid = true;
        const NewError = {
            email:"",
            password:"",
        }
        
        if (userInfo.email.trim() === "") {
            NewError.email = "Email is required";
            valid = false;
            
        }else if(!userInfo.email.includes("@")) {
            NewError.email = "Email is not valid ";
            valid = false;
        }
        if (userInfo.password.trim() === "")  {
            NewError.password = "Password is required";
            valid = false;
        }
        else if (userInfo.password.length < 6 ) {
            NewError.password = "Password is not valid must be at least 6 characters"
            valid = false
        }
        setError(NewError);
        if (!valid) return
        //API CALL
        try{
            const res = await api.post('/auth/login',{
                email: userInfo.email,
                password: userInfo.password
            });
            localStorage.setItem("token", res.data.token);
            setUserInfo({email:"",password:""})
            navigate("/dashboard");

        }catch(err) {
            setError({
                ...NewError,
            email: err.response?.data?.error || "Login failed"
            })
        }
        
    }
    
    return(
        <div className="auth-container">
           <form className="auth-box" onSubmit={ handleSubmit}>
                <h2 className="login-title"> 
                    <MdLogin style={{ marginRight: "8px" }} />

                Login
                </h2>
                <input 
                className=""
                type="email"
                placeholder="Email"
                value={userInfo.email}
                onChange={(e)=> setUserInfo({...userInfo, email:e.target.value})}
                />
                {error.email && <p style={{ color: "red" }}>{error.email}</p>}

                <input
                className=""
                type="password"
                placeholder="Password"
                value={userInfo.password}
                onChange={(e)=>setUserInfo({...userInfo,password:e.target.value})}
                />
                {error.password && <p style={{ color: "red" }}>{error.password}</p>}

                <button type="submit">LOGIN</button>
           </form>
        </div>
    )
}