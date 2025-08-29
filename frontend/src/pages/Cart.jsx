import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, cartItems, currency, updateCartQuantity, navigate } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {

    if(products.length > 0 && cartItems ) {
          let tempData = [];

    for (const id in cartItems || {} ) {
      if (!cartItems[id]) continue;
      for (const size in cartItems[id]) {
        if (cartItems[id][size] > 0) {
          tempData.push({
            _id: id,
            size: size,
            quantity: cartItems[id][size],
          });
        }
      }
      
    }
    setCartData(tempData);
    }

  }, [cartItems,products]);

  return (
    <div className="border-t pt-14 border-gray-200">
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      <div>
        {cartData.map((item, index) => {
          const productData = products.find(
            (product) => product._id === item._id
          );

          return (
            <div key={index} className="py-4 border-t border-b border-gray-200 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4 ">
              <div className="flex gap-6">
                <img
                  className="w-16 sm:w-20"
                  src={productData.images[0]}
                  alt=""
                />
                <div className="flex flex-col gap-2 ">
                  <p className="text-xs sm:text-lg font-medium">
                    {" "}
                    {productData.name}{" "}
                  </p>
                  <div className="flex items-center gap-3 text-sm sm:text-base ">
                    <p>
                      {" "}
                      {currency}
                      {productData.price}{" "}
                    </p>
                    <p className="px-3 py-1 bg-gray-50 border  border-gray-200 ">
                      {" "}
                      {item.size}{" "}
                    </p>
                  </div>
                </div>
              </div>

              <input
                className="border border-gray-200 max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                type="number"
                min={1}
                defaultValue={item.quantity}
                onChange={(e) =>
                  e.target.value === "" || e.target.value === "0"
                    ? null
                    : updateCartQuantity(
                        item._id,
                        item.size,
                        Number(e.target.value)
                      )
                }
              />

              <img
                onClick={() => updateCartQuantity(item._id, item.size, 0)}
                className="w-4 sm:w-5 mr-4 cursor-pointer"
                src={assets.bin_icon}
                alt=""
              />
            </div>
          );
        })}
      </div>

      {/* Cart Total */}

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full flex justify-end mt-8 ">
            <button
              onClick={() => navigate("/place-order")}
              className="text-white text-sm bg-black px-8 py-3 active:bg-gray-700 cursor-pointer "
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
