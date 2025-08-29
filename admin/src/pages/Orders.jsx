import React from "react";
import { useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import { IoIosClose } from "react-icons/io";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }
    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
        console.log(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  
  const statusHandler = async (orderId, event) => {
    try {

      const response = await axios.post(backendUrl + '/api/order/status', {orderId, status:event.target.value}, {headers:{token}})
      if(response.data.success) {
        await fetchAllOrders()
      } 

    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h3>Order Page</h3>
      <div>
        {orders.map((order, index) => (
          <div className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-center border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700  " key={index}>
            <img className="w-12" src={assets.parcel_icon} alt="" />
            <div>
              <div>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return (
                      <p className="py-0.5 flex items-start gap-1 md:max-w-[20vw] " key={index}>
                         {/* <span className="font-medium" >{index+1}.</span >
                        (
                          {" "}
                        {item.name} x {item.quantity}{" "}
                        <span> {item.size}. </span>{" "}
                        ) */}
                        <span className="font-medium" > {index+1}. </span>
                        <span> {item.name} <IoIosClose className="inline" /> {item.quantity} <p className="inline" > {item.size} </p> </span>
                      </p>
                    );
                  } else {
                    return (
                      <p className="py-0.5 flex items-start gap-1 md:max-w-[20vw]" key={index}>
                        {/* <span className="font-medium" >{index+1}.</span>
                        ({" "}
                         {item.name} x {item.quantity}{" "}
                        <span> {item.size}, </span>{" "}) */}
                        <span className="font-medium" > {index+1}. </span>
                        <span> {item.name} <IoIosClose className="inline" /> {item.quantity} <p className="inline  " > {item.size} </p> </span>
                      </p>
                    );
                  }
                })}
              </div>
              <p className="mt-2 mb-2 text-base font-medium" > {order.address.firstName + " " + order.address.lastName} </p>
              <div>
                <p> {order.address.street + ","} </p>
                <p>
                  {" "}
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.country +
                    ", " +
                    order.address.zipcode}{" "}
                </p>
              </div>
              <p> {order.address.phone} </p>
            </div>
            <div>
              <p className="text-sm sm:text-[15]" >Items : {order.items.length} </p>
              <p>Method : {order.paymentMethod}  </p>
              <p>Payment : { order.payment ? "Done" : "Pending" } </p>
              <p>Date : {new Date(order.date).toLocaleDateString()} </p>
            </div>
            <p> {currency}{order.amount} </p>
            <select onChange={(event) => statusHandler(order._id, event )} value={order.status} className="p-2 font-semibold" name="" id="">
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out For Delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
