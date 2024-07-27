import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; //this is used for redirect the page

const Signup = () => {
    // it is used for data inserted in database or api
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate(); // this module is used for redirect the file and route & link

    // use for this function is if login and signup than not show signup and login button
    useEffect(() => {
        const auth = localStorage.getItem("user");
        if (auth) {
            navigate('/'); //redirect from the home page this is redirect module
        }
    })

    // API integrataion code using POST method
    const collectData = async () => {
        console.log(name, email, password);
        // in fetch in pass parameters (url,method,body,headers) then print result 
        let result = await fetch('http://localhost:8080/register',
            {
                method: 'POST',
                body: JSON.stringify({ name, email, password }),
                headers: { 'content-type': 'application/json' }
            });
        result = await result.json();
        console.log(result);
        // it is used for store data in localserver in browser appilcation & store JWT Token
        localStorage.setItem("user", JSON.stringify(result.result));
        localStorage.setItem("token", JSON.stringify(result.auth));

        // when data insert then redirect the page using navigate in home page
        navigate('/');
    }


    // display part
    return (
        <div className="signup-container">
            <h1>SIGN UP</h1>
            <input type="text" value={name}
                onChange={(e) => setName(e.target.value)} //it can be used the insert data in the db
                placeholder="Enter Your Username" ></input>

            <input type="text" value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your EmailId" ></input>

            <input type="password" value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Your Password" ></input>

            <button onClick={collectData} type="submit">Sign Up</button>
        </div>
    )
}


// file Export for require ment of import another file  
export default Signup;