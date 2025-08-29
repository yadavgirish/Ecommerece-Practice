import React, { useState } from 'react';
import axios from "axios"
import { backendUrl } from '../App';
import { resolvePath } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = ({setToken}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        try {

            e.preventDefault()
            const response = await axios.post(backendUrl + '/api/user/admin', {email,password})
            if(response.data.success) {
                setToken(response.data.token)
            } 
            else {
                toast.error(response.data.message)
            }

        } catch(error) {
            console.log(error.message)
        }
    }

  return (
    <div className='w-full h-screen  flex items-center justify-center' >

        <div className='shadow-md px-8 py-6 flex flex-col gap-4 bg-white ' >
            <h1 className='text-2xl font-bold text-black' >Admin Panel</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-3' action="">

            <div className='flex flex-col gap-2 min-w-72 ' >
                <label className='text-sm font-medium' htmlFor="email">Email Address</label>
                <input onChange={(e) => setEmail(e.target.value)} value={email} required className='border border-gray-300 rounded-md px-3 py-2 outline-none ' id='email' type="email" placeholder='your@email.com' />
            </div>

            <div className='flex flex-col gap-2 min-w-72 ' >
                <label className='text-sm font-medium' htmlFor="password">Password</label>
                <input onChange={(e) => setPassword(e.target.value)} value={password} required className='border border-gray-300 rounded-md px-3 py-2 outline-none' id='password' type="password" placeholder='Enter your password' />
            </div>

            <button className='bg-black py-2 px-5 rounded-md text-white font-medium mt-2 cursor-pointer active:bg-gray-600 ' >Login</button>

            </form>
        </div>

    </div>
  )
}

export default Login;