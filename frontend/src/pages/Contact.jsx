import React from 'react'
import Title from "../components/Title"
import {assets} from "../assets/assets"
import NewsLetterBox from "../components/NewsLetterBox"
const Contact = () => {
  return (
    <div className='pt-10 border-t border-gray-200' >

      <div className='text-2xl text-center' >
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      <div className='flex flex-col justify-center md:flex-row pt-10 gap-10 mb-28' >
          <img className='w-full md:w-[480px]' src={assets.contact_img} alt="" />
          <div className='flex flex-col justify-center gap-6' >
            <p className='text-xl font-semibold' >Our Store</p>
            <div className='text-gray-500'>
              <p>54709 Willms Station</p>
              <p>Suite 350, Washington, USA</p>
            </div>
            <div className='text-gray-500'>
              <p>Tel: (415) 555-0132</p>
              <p>Email: admin@forever.com</p>
            </div>
            <p className='text-xl font-semibold' >Careers at Forever</p>
            <p className='text-gray-500' >Learn more about our teams and job openings.</p>
            <button className=' w-fit text-sm px-8 py-4 border cursor-pointer hover:bg-black hover:text-white transition-all duration-500 ' >Explore Jobs</button>
          </div>
          
      </div>


        <NewsLetterBox/>



    </div>
  )
}

export default Contact
