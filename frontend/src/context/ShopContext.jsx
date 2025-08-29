import { createContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import axios from "axios"
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const [search, setSearch] = useState(null)
  const [showSearch, setShowSearch] = useState(false)
  // const [cartItems, setCartItems] = useState({})
  const [cartItems, setCartItems] = useState({})
  const [products, setProducts] = useState([])
  const navigate = useNavigate()
  const [token, setToken] = useState('')

  // Add To Cart
  const addToCart = async (itemId, size) => {

    if(!size) {
      toast.error("Select Product Size")
      return;
    }

    let cartData = structuredClone(cartItems)
    if(cartData[itemId]) {
      if(cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      }else {
        cartData[itemId][size] = 1;
      }
    }
    else {
      cartData[itemId] = {}
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData)

    if(token) {
        try {

          await axios.post(backendUrl + '/api/cart/add', {itemId, size}, {headers: {token}})

        } catch (error) {
          console.log(error.message)
          toast.error(error.message)
        }
    }

  }

  //Get Cart Count
  const getCartCount = () => {
    let totalCount = 0;
    for(const items in cartItems) {
      for(const item in cartItems[items]) {
        try {
          totalCount += cartItems[items][item]
        }catch (err) {

        }
      }
    }
    return totalCount;
  }

  const updateCartQuantity = async (itemId, size,quantity) => {
    let cartData = structuredClone(cartItems)

    if(quantity <= 0) {
      delete cartData[itemId][size] 
      if(Object.keys(cartData[itemId]).length ===0) {
        delete cartData[itemId]
      }
    }else {
      cartData[itemId][size] = quantity
    }

    // cartData[itemId][size] = quantity;
    setCartItems(cartData)

    if(token) {
      try {

        await axios.post(backendUrl + '/api/cart/update', {itemId, size, quantity}, {headers:{token}})

      } catch(error) {
        console.log(error.message)
        toast.error(error.message)
      }
    }

  }

  // const getUserCart = async (token) => {
  //   try {

  //     const response = await axios.get(backendUrl + '/api/cart/get', {headers:{token}})
  //     if(response.data.success) {
  //       setCartItems(response.data.cartData)
  //     }

  //   } catch (error) {
  //     console.log(error.message)
  //     toast.error(error.message)
  //   }
  // }

  //Get User Cart Data 
  const getUserCart = async (token) => {
    try {

      const response = await axios.post(backendUrl + '/api/cart/get', {} ,{headers:{token}})
      if(response.data.success) {
        setCartItems(response.data.cartData || {} )
      }
      else {
        toast.error(response.data.message)
        setCartItems({})
      }
    } catch (error) {
      console.log(error.message)
      toast.error(error.message)
      setCartItems({})
    }
  }

  const getCartAmount = () => {
    let totalAmount = 0;
    for(const id in cartItems) {
      for(const size in cartItems[id]) {
        let productInfo = products.find((Product) => Product._id === id)
        try {
          if(cartItems[id][size] > 0) {
            totalAmount += productInfo.price * cartItems[id][size] 
        }
        } catch (error) {
          
        }
      }
    }
    return totalAmount
  }

  const getProductData = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list')
      if(response.data.success) {
        setProducts(response.data.products)
      }
      else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error.message)
    }
  }
  useEffect(() => {
    getProductData()
  },[])

  useEffect(() => {
    if(!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"))
      getUserCart(localStorage.getItem('token'))
    }
  },[])


  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    addToCart,
    cartItems,
    setCartItems,
    getCartCount,
    updateCartQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    token,
    setToken
  };


  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};
export default ShopContextProvider
