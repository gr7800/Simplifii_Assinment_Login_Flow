import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import logo from "../../Utills/image/logo.png";
import { useDispatch } from 'react-redux';
import { LOGOUT } from '../../redux/Auth/auth.type';

const Navbar = ({ Auth }) => {
    const dispatch = useDispatch();
    const handlelogout = ()=>{
        dispatch({type:LOGOUT});
    }
    return (
        <nav className="bg-white text-orange-500 shadow-md fixed top-0 w-full">
            <div className="max-w-screen-xl mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo */}
                <div className="text-2xl font-bold">
                    <Link to="/" className="hover:text-orange-600">
                        {/* Replace with your logo or text */}
                        <img src={logo} alt="logo" className="mx-auto" width={"100px"} height={"50px"} />
                    </Link>
                </div>
                {/* Navigation Links */}
                <div className="flex space-x-6">
                    {Auth ?
                        <p className="hover:text-orange-600 cursor-pointer" onClick={handlelogout}>Logout</p> :
                        <Link to="/login" className="hover:text-orange-600 cursor-pointer">Login</Link>}
                    <Link to="/register" className="hover:text-orange-600 cursor-pointer">Signup</Link>
                </div>

            </div>
        </nav>
    );
};

export default Navbar;
