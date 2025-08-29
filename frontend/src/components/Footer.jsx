import React from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router';

const Footer = () => {
  return (
   <div>
     <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-48 text-sm text-gray-600' >
        <div className='flex flex-col gap-5'>
            <img src={assets.logo} className='w-32' alt="" />
            <p className='w-full sm:w-2/3' >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
        </div>
        <ul className='flex flex-col gap-1'>
            <li className='text-xl text-black font-medium mb-4'>COMPANY</li>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
        </ul>
        <ul className='flex flex-col gap-1'>
            <li className='text-xl text-black font-medium mb-4'>GET IN TOUCH</li>
            <li>+1-000-000-0000</li>
            <Link target='_blank' to={`https://mail.google.com/mail/?view=cm&fs=1&to=ygirish890@example.com&su=Hello&body=Hi,%20I%20want%20to%20contact%20you.`} >ygirish890@gmail.com</Link>
            <Link target='_blank' to={`https://www.instagram.com/29_girish_2004`} >Instagram</Link>
        </ul>

    </div>
    <p className='text-gray-900 text-sm text-center py-5 border-t border-gray-200 '>Copyright 2025@ girishyadav.dev - ALl Right Reserved</p>
   </div>
  )
}

export default Footer;