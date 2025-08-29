import React, { useEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import { ToastContainer, toast } from 'react-toastify';
import Lenis from "@studio-freight/lenis"; // ✅ 

export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency = "$"
const App = () => {
    useEffect(() => {
      const lenis = new Lenis({
        duration: 1, 
        easing: (t) => t, 
        smooth: true,   
        lerp: 0.09,    
      });
  
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
  
      requestAnimationFrame(raf);
  
      return () => lenis.destroy();
    }, []);

  const [token, setToken] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : "");

  useEffect(() => {
    localStorage.setItem("token",token)
  }, [token])

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer/>
      {token === '' ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <hr className="border-gray-200" />
          <div className="flex w-full">
            <Sidebar />
            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base ">
              <Routes>
                <Route path="/" element={<Add token={token} />} />
                <Route path="/add" element={<Add token={token} />} />
                <Route path="/list" element={<List token={token} />} />
                <Route path="/orders" element={<Orders token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
