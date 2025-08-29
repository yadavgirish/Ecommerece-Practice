import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import { useLocation } from "react-router";

const SearchBar = () => {

    const {search, setSearch, showSearch, setShowSearch} = useContext(ShopContext)
    const [visible, setVisible] = useState(false)
    const location = useLocation()

    useEffect(() => {
        if(location.pathname.includes("/collection")) {
            setVisible(true)
        } else {
            setVisible(false)
        }
    },[location])


  return showSearch && visible ?  (
    <div className=" text-center border-t border-b border-gray-200 bg-gray-50 ">
      <div className="inline-flex items-center justify-center border border-gray-400 py-2 my-5 mx-3 rounded-full px-5 w-3/4 sm:w-1/2">
        <input
          className="flex-1 outline-none bg-inherit text-sm"
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <img src={assets.search_icon} className="w-4" alt="" />
      </div>
      <img
        onClick={() => setShowSearch(false)}
        src={assets.cross_icon}
        className="w-3 inline cursor-pointer"
        alt=""
      />
    </div>
  ) : null ;
};

export default SearchBar;
