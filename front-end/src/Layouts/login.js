import React,{useEffect,useState} from "react";
import {useNavigate} from 'react-router-dom';

const Login=()=>{
    const [email,setEmail]=React.useState('');
    const [password,setPassword]=React.useState('');
    const navigate = useNavigate();
    
    // if you are login then not open login page and signup page mandatory to logout and then access login & signup
    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            navigate('/');
        }
    });

    // Login API 
    const LoginData = async()=>{
        let LoginResult = await fetch('http://localhost:8080/login',
            {
                method :'POST',
                body : JSON.stringify({email,password}),
                headers : {'content-type' : 'application/json'}
            })
            LoginResult= await LoginResult.json();
            if(LoginResult.auth){
                localStorage.setItem("user",JSON.stringify(LoginResult.user));
                localStorage.setItem("token",JSON.stringify(LoginResult.auth));
                navigate('/');
            }
            else{
                alert("You Enter Wrong EmailId Or Password...");
            }
             
    }
    
    return(
        <div className="signup-container"> {/**css is declare in same as signup page */}
        
            <h1>LOGIN </h1>

            <input type="text"  value ={email} 
            onChange={(e)=>setEmail(e.target.value)} //it can be used the insert data in the db
            placeholder="Enter Your EmailId" ></input>

            <input type="password"  value={password} 
            onChange={(e)=>setPassword(e.target.value)}
            placeholder="Enter Your Password" ></input>

            <button  onClick={LoginData}  type="submit" >Login</button>
        </div>
    )
}
export default Login;