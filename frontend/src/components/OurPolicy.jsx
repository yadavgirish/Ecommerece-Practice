import React from 'react'
import { assets } from '../assets/assets'


const OurPolicy = () => {
  return (
    <div>
      <div className='flex flex-col sm:flex-row items-center justify-around gap-12 sm:gap-2 py-20 ' >
        <div className='flex flex-col items-center justify-center text-center' >
            <img className='w-12 m-auto mb-5' src={assets.exchange_icon} alt="" />
            <p className='font-semibold text-xs md:text-base ' >Easy Exchange Policy</p>
            <p className='text-gray-400 text-xs md:text-base '>We offer hassle free exchange policy</p>
        </div>
        <div className='flex flex-col items-center justify-center text-center' >
            <img className='w-12 m-auto mb-5' src={assets.quality_icon} alt="" />
            <p className='font-semibold text-xs md:text-base '>7 Days Return Policy</p>
            <p className='text-gray-400 text-xs md:text-base '>We provide 7 days free return policy</p>
        </div>
        <div className='flex flex-col items-center justify-center text-center' >
            <img className='w-12 m-auto mb-5' src={assets.support_img} alt="" />
            <p className='font-semibold text-xs md:text-base '>Best customer support</p>
            <p className='text-gray-400 text-xs md:text-base '>we provide 24/7 customer support</p>
        </div>
      </div>
    </div>
  )
}

export default OurPolicy
