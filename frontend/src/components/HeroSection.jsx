import React from "react";
import { assets } from "../assets/assets";

const HeroSection = () => {
  return (
    <div className="flex flex-col sm:flex-row border border-gray-400 font-medium ">
      <div className="w-full sm:w-1/2 flex flex-col items-center justify-center ">
        <div className="flex flex-col py-10" >
          <div className="flex items-center gap-2">
            <p className="bg-gray-700 h-[1.5px] w-8 md:w-11"></p>
            <p className="text-sm md:text-base" >OUR BESTSELLERS</p>
          </div>

          <p className="text-3xl lg:text-5xl sm:py-3 font-prata ">Latest Arrivals</p>

          <div className="flex items-center gap-2 ">
            <p className="font-semibold text-sm md:text-base" >SHOP NOW</p>
            <p className="bg-gray-700 h-[1.5px] w-8 sm:w-11 "></p>
          </div>
        </div>
      </div>
      <img className=" w-full sm:w-1/2" src={assets.hero_img} alt="" />
    </div>
  );
};

export default HeroSection;
