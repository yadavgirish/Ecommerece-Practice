import React, { useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";

const List = ({token}) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const removeProduct = async (productId) => {
    try {
      const response = await axios.post(backendUrl + '/api/product/remove',{productId}, {headers: {token}} )
      if(response.data.success) {
        toast.success(response.data.message)
        await fetchList()
      }
      else {
        toast.error(response.data.message)
      }
    } catch(error) {
      console.log(error.message)
      toast.error(error.message)
    }
  } 

  useState(() => {
    fetchList();
  }, []);

  return (
    <>

      <div className="flex flex-col gap-2" >
      <p>All Products List</p>

      {/* ---------------- List Table Title ----------------------- */}

      <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center px-2 py-1 bg-gray-100 text-sm border border-gray-200 rounded-md" >
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b className="text-center" >Action</b>
      </div>  

      {/* ----------------Product List-------------- */}
      {
        list.map((item,index) => (
          <div className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border border-gray-200 text-sm " key={index} >
            <img className="w-12" src={item.images[0]} alt="" />
            <p>{item.name} </p>
            <p> {item.category} </p>
            <p> {currency}{item.price} </p>
            <p onClick={() => removeProduct(item._id)} className="cursor-pointer flex items-center  text-right md:text-center" ><IoMdClose /></p>

          </div>
        ))
      }

      </div>
    </>
  );
};

export default List;
