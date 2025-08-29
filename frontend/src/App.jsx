import React from "react";
import { Route, Routes } from "react-router-dom";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis"; // ✅ correct


import Home from "./pages/Home";
import About from "./pages/About";
import Collection from "./pages/Collection";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Product from "./pages/Product";
import SearchBar from "./components/SearcBar";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/PlaceOrder";
import { ToastContainer, toast } from 'react-toastify';
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import ErrorPage from "./pages/ErrorPage";
import Verify from "./pages/Verify";
import ScrollToTop from "./components/ScrollToTop"

gsap.registerPlugin(ScrollTrigger);

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


  return (
    <div  className="overflow-x-hidden ">
          <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] " >
        <ToastContainer />
        <ScrollToTop />
        <Navbar/>
        <SearchBar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:productId" element={<Product/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/place-order" element={<PlaceOrder/>} />
          <Route path="/orders" element={<Orders/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="*" element={<ErrorPage/>} />
          <Route path="/verify" element={<Verify/>} />
        </Routes>
        <Footer/>
      </div>
    </div>

  );
};

export default App;
