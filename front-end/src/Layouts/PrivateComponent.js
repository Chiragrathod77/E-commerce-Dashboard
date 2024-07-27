import React from "react";
import {Navigate, Outlet } from 'react-router-dom';

const PrivateComponent = ()=>{
    // if localstorage in stored data when not show signup button
    const auth = localStorage.getItem("user");
    return  auth ? <Outlet/> : <Navigate to='/signup'/>;
}
//export file in app.js
export default PrivateComponent;