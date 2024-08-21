import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../../Component/Navbar/Navbar';
import { useLocation, Navigate } from 'react-router-dom'

const Home = () => {
  // const User = useSelector((store) => store.auth.user?.name) || " ";
  // const isAuth = useSelector((store) => store.auth.isAuth) || false;
  const location = useLocation();
  let unverifieduser = JSON.parse(localStorage.getItem("unverifieduser"))

  if (!unverifieduser) {
    return <Navigate to="/register" state={{ from: location }}></Navigate>
  }

  return (
    <>
      <Navbar Auth={(unverifieduser?.name) ? true : false} />
      <div className="flex items-center justify-center w-screen h-screen bg-orange-500 border-4 border-white animate-border">
        <div className="text-center px-4 sm:px-8 md:px-12 lg:px-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white animate-pulse max-w-full">
            {unverifieduser?.name || ""}<br />Welcome To Infollio Family
          </h1>
        </div>
      </div>
    </>
  );
};

export default Home;
