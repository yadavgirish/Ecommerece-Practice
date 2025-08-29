import React, { useContext, useState } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const PlaceOrder = () => {
    const {navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products} = useContext(ShopContext)
    const [method, setMethod] = useState('cod')
     const [razorUnavailable, setRazorUnavailable] = useState(false)
    const [formData, setFormData] = useState({
        firstName:'',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: ''
    })

    const onChangeHandler = (e) => {
        const name = e.target.name
        const value = e.target.value
        setFormData(prev => ({...prev,[name]:value}))
    }
    const handleRazorClick = () => {
        setRazorUnavailable(true)          // show message
        setTimeout(() => setRazorUnavailable(false), 2000) // disappear after 2 sec
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        setRazorUnavailable(true);
    setTimeout(() => setRazorUnavailable(false), 2000);
        try {

            let orderItems = []

            for(const items in cartItems || {} ) {
                for(const item in cartItems[items] || {}) {
                    if(cartItems[items][item] > 0) {
                        const itemInfo = structuredClone(products.find((product) => product._id === items) ) 
                        if(itemInfo) {
                            itemInfo.size = item
                            itemInfo.quantity = cartItems[items][item]
                            orderItems.push(itemInfo)
                        }
                    }
                }
            }

            let orderData = {
                address: formData,
                items: orderItems,
                amount: getCartAmount() + delivery_fee
            }

            switch(method) {
                //API Calls for COD
                case 'cod' :
                    const response = await axios.post(backendUrl + '/api/order/place',orderData, {headers:{token}})
                    if(response.data.success) {
                        setCartItems({})
                        toast.success(response.data.message)
                        navigate('/orders')
                    } else {
                        toast.error(response.data.message)
                    }
                    break;
                case 'stripe' :

                    const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData, {headers:{token}})
                    if(responseStripe.data.success) {
                        const {session_url} = responseStripe.data
                        window.location.replace(session_url)
                        setCartItems({})
                        toast.success(response.data.message)
                    } else {
                        toast.error(response.data.message)
                    }
                case 'razorpay' :
                    handleRazorClick()
                    break;
                
                  default: 
                    break;
            }

            console.log(orderItems)

        } catch (error) {
            console.log(error.message)
            toast.error(error.message)
        }
        
    }


  return ( 
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-80 border-t border-gray-200 ' >

    <div className='flex flex-col gap-4 w-full sm:w-[480px]' >
        <div className='text-xl sm:text-2xl my-3' >
            <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>

        <div className='flex gap-3' >
            <input onChange={onChangeHandler} name='firstName' value={formData.firstName} required className='border w-full border-gray-300 px-3.5 py-1.5 rounded ' type="text" placeholder='First name' />
            <input onChange={onChangeHandler} name='lastName' value={formData.lastName} required className='border w-full border-gray-300 px-3.5 py-1.5 rounded ' type="text" placeholder='Last name' />
        </div>
        <input onChange={onChangeHandler} name='email' value={formData.email} required className='border w-full border-gray-300 px-3.5 py-1.5 rounded ' type="email" placeholder='Email address' />
        <input onChange={onChangeHandler} name='street' value={formData.street} required className='border w-full border-gray-300 px-3.5 py-1.5 rounded ' type="text" placeholder='Street' />
        <div className='flex gap-3' >
            <input onChange={onChangeHandler} name='city' value={formData.city} required className='border w-full border-gray-300 px-3.5 py-1.5 rounded ' type="text" placeholder='City' />
            <input onChange={onChangeHandler} name='state' value={formData.state} required className='border w-full border-gray-300 px-3.5 py-1.5 rounded ' type="text" placeholder='State' />
        </div>
        <div className='flex gap-3' >
            <input onChange={onChangeHandler} name='zipcode' value={formData.zipcode} required className='border w-full border-gray-300 px-3.5 py-1.5 rounded ' type="number" placeholder='Zipcode' />
            <input onChange={onChangeHandler} name='country' value={formData.country} required className='border w-full border-gray-300 px-3.5 py-1.5 rounded ' type="text" placeholder='Country' />
        </div>
        <input onChange={onChangeHandler} name='phone' value={formData.phone} required className='border w-full border-gray-300 px-3.5 py-1.5 rounded ' type="number" placeholder='Phone' />
    </div>



    <div className='mt-8' >
        <div className='mt-8 min-w-80' >
            <CartTotal/>
        </div>
        <div className='mt-12' >
            {/* Title */}
        <Title text1={"PAYMENT"} text2={"METHOD"} />

            {/* Payement MEthods */}

        <div className='flex gap-3 lg:flex-row flex-col' >

            <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 p-2 px-3 cursor-pointer border border-gray-200 ' >
                <p className={`min-w-3.5 h-3.5 border border-gray-200 rounded-full ${method === 'stripe' ? "bg-green-400" : ""} `} ></p>
                <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
            </div>
            {/* <div onClick={() => setMethod('razorpay')} className='flex items-center gap-3 p-2 px-3 cursor-pointer border border-gray-200 ' >
                <p className={`min-w-3.5 h-3.5 border border-gray-200 rounded-full ${method === 'razorpay' ? "bg-green-400" : ""} `} ></p>
                <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />
            </div> */}

<div className='relative'>
  <div 
    onClick={handleRazorClick} 
    className={`flex items-center gap-3 p-2 px-3 cursor-pointer border border-gray-200 ${razorUnavailable ? 'opacity-50 cursor-not-allowed' : ''}`}
  >
    <p className={`min-w-3.5 h-3.5 border border-gray-200 rounded-full ${method === 'razorpay' ? "bg-green-400" : ""}`}></p>
    <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />
  </div>
  {razorUnavailable && (
    <span className='absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full bg-red-500 text-white px-2 py-1 text-xs rounded'>
      Unavailable
    </span>
  )}
</div>



            <div onClick={() => setMethod('cod')} className='flex items-center gap-3 p-2 px-3 cursor-pointer border border-gray-200 ' >
                <p className={`min-w-3.5 h-3.5 border border-gray-200 rounded-full ${method === 'cod' ? "bg-green-400" : ""} `} ></p>
                <p className='font-medium text-sm text-gray-500 mx-4' >CASH ON DELIVERY</p>
            </div>
        </div>

        <div className='w-full flex justify-end my-8 ' >
            <button type='submit' className='text-white bg-black px-16 py-3 text-sm  active:bg-gray-700 cursor-pointer' >PLACE ORDER</button>
        </div>


        </div>
    </div>

    </form>
  )
}

export default PlaceOrder;