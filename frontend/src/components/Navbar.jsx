import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, Link, Navigate } from "react-router";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const {setShowSearch,navigate, token, setCartItems, setToken, getCartCount} = useContext(ShopContext)

    const logout = () => {
      localStorage.removeItem("token")
      setToken("")
      setCartItems({})
      navigate('/login')
    }

  return (
    <div className="flex items-centere justify-between py-5">
      <img src={assets.logo} className="w-36 h-10 " alt="" />
      <ul className="hidden sm:flex items-center gap-5 text-sm font-medium ">
        <NavLink className="flex flex-col items-center gap-1" to="/">
          <p>HOME</p>
          <hr className="border-none h-[1.5px] bg-[#414141] w-2/4 invisible " />
        </NavLink>
        <NavLink className="flex flex-col items-center gap-1" to="/collection">
          <p>COLLECTION</p>
          <hr className="border-none h-[1.5px] bg-[#414141] w-2/4 invisible " />
        </NavLink>
        <NavLink className="flex flex-col items-center gap-1" to="/about">
          <p>ABOUT</p>
          <hr className="border-none h-[1.5px] bg-[#414141] w-2/4 invisible " />
        </NavLink>
        <NavLink className="flex flex-col items-center gap-1" to="/contact">
          <p>CONTACT</p>
          <hr className="border-none h-[1.5px] bg-[#414141] w-2/4 invisible " />
        </NavLink>
        <NavLink
        target="_blank"
          className="flex flex-col gap-1 text-xs border border-gray-200 px-5 py-2 rounded-full mb-2 "
          to="http://localhost:5173"
        >
          <p>Admin Panel</p>
        </NavLink>
      </ul>
      <div className="flex items-center gap-6 ">
        <Link to="/collection" > <img onClick={() => setShowSearch(true)} className="w-5 cursor-pointer" src={assets.search_icon} alt="" /> </Link>

        <div className="group relative">
          <img
            onClick={() => token ? null : navigate('/login')}
            className="w-5 cursor-pointer group relative"
            src={assets.profile_icon}
            alt=""
          />
          {
            token && 
            <div className="group-hover:block hidden absolute  right-0 pt-4 ">
            <div className="flex flex-col gap-2 bg-slate-100 w-36 py-3 px-5 bg-slate-10 text-gray-500 rounded-md ">
              <p className="cursor-pointer hover:text-black ">Source Code</p>
              <p onClick={() => navigate('/orders')} className="cursor-pointer hover:text-black ">Orders</p>
              <p onClick={() => logout()} className="cursor-pointer hover:text-black ">Logout</p>
            </div>
          </div>
          }
        </div>

        <Link to="/cart" className="relative">
          <img className="w-5 cursor-pointer" src={assets.cart_icon} alt="" />
          <p className="absolute right-[-5px] bottom-[-5px] bg-black text-white w-4 aspect-square flex items-center justify-center rounded-full text-[8px]  ">
            {getCartCount()}
          </p>
        </Link>

        {/* Mobile Menu */}

        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 sm:hidden cursor-pointer"
          alt=""
        />

        <div
          className={`absolute overflow-x-hidden bg-white right-0 top-0 bottom-0 transition-all duration-300 ${
            visible ? "w-full" : "w-0"
          }`}
        >
          <div className="flex flex-col py-1 cursor-pointer font-medium p-[1px] ">
            <div onClick={() => setVisible(false)} className="flex items-center gap-4 p-3 border-b-1 border-gray-200">
              <img
                src={assets.dropdown_icon}
                className="h-4 rotate-180"
                alt=""
              />
              <p>Back</p>
            </div>
            <NavLink onClick={() => setVisible(false)} className={ ({isActive}) => `flex flex-col  gap-1 pl-6 border-b-2 border-gray-200 py-2  ${isActive ? "bg-black text-white" : "bg-white"} `} to="/">
              <p>HOME</p>
            </NavLink>
            <NavLink onClick={() => setVisible(false)}
         className={ ({isActive}) => `flex flex-col  gap-1 pl-6 border-b-2 border-gray-200 py-2  ${isActive ? "bg-black text-white" : "bg-white"} `}
              to="/collection"
            >
              <p>COLLECTION</p>
            </NavLink>
            <NavLink onClick={() => setVisible(false)} className={ ({isActive}) => `flex flex-col  gap-1 pl-6 border-b-2 border-gray-200 py-2  ${isActive ? "bg-black text-white" : "bg-white"} `} to="/about">
              <p>ABOUT</p>
            </NavLink>
            <NavLink onClick={() => setVisible(false)} className={ ({isActive}) => `flex flex-col  gap-1 pl-6 border-b-2 border-gray-200 py-2  ${isActive ? "bg-black text-white" : "bg-white"} `} to="/contact">
              <p>CONTACT</p>
            </NavLink>
 
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
