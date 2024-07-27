import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {
    // this is security purpose and check the user is login and logout
    const auth = localStorage.getItem("user");

    // this is logout code and change the file location in logout link and onclick event in pass this logout function
    const navigate = useNavigate();
    const Logout = () => {
        localStorage.clear();
        navigate('/login');
    }

    // display part of the navbar menu 
    return (
        < div >
            <img alt = "logo" src='logo1.png' className='logo'></img>

        {/* this is condition is work for  without login or signnup not show navbar*/}  
            {auth ?
                <ul className='nav-ul'>
                    <li><Link to="/">Products</Link></li>
                    <li><Link to="/add-product">Add Products</Link></li>
                    {/* <li><Link to="/update">Update Products</Link></li> */}
                    {/** ({JSON.parse(auth).name}) to show Name of User which user is login*/}
                    <li> <Link to="/profile"> Profile ({JSON.parse(auth).name})</Link></li>
                    <li><Link onClick={Logout} to="/login"> Logout </Link></li>
                </ul>
                :
                <ul className='nav-ul nav-right'>
                    <li><Link to="/signup">Sign Up</Link> </li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            }
        </div >
    )
}
// export navbar in app.js
export default Nav;