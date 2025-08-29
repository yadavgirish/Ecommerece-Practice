import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';


const Login = () => {

    const [currentState, setCurrentState] = useState('Login')

    const {token, setToken, backendUrl, navigate} = useContext(ShopContext)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit =  async (e) => {
        e.preventDefault()
        if(currentState === "Sign Up") {
            try {
                const response = await axios.post(backendUrl + '/api/user/register', {name, email, password})
                if(response.data.success) {
                    setToken(response.data.token)
                    toast.success(response.data.message)
                    localStorage.setItem("token", response.data.token)
                }
                else {
                    toast.error(response.data.message)
                }
            } catch(error) {
                    console.log(error.message)
            }
        } 
        else {
            try {

                const response = await axios.post(backendUrl + '/api/user/login', {email, password})
                if(response.data.success) {
                    setToken(response.data.token)
                    toast.success(response.data.message)
                    localStorage.setItem("token", response.data.token)
                }
                else {
                    toast.error(response.data.message)
                }
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }
    }

    useEffect(() => {
        if(token) {
            navigate('/')
        }
    },[token])

  return (
    <form onSubmit={handleSubmit} className='flex flex-col items-center w-[90%] sm:w-96 m-auto mt-14 gap-4 text-gray-800 ' >
        <div className='inline-flex items-center gap-2 mb-2 mt-10' >
            <p className=' font-prata text-3xl' > {currentState} </p>
            <hr className='border-none h-[1.6px] w-8 bg-gray-800 ' />
        </div>
            {
                currentState === "Sign Up" ? <input onChange={(e) => setName(e.target.value)} value={name} className='px-3 py-2 border border-gray-800 w-full ' type="text" placeholder='Name' /> : null
            }
            <input onChange={(e) => setEmail(e.target.value)} value={email} className='px-3 py-2 border border-gray-800 w-full ' type="email" placeholder='Email' />
            <input onChange={(e) => setPassword(e.target.value)} value={password} className='px-3 py-2 border border-gray-800 w-full ' type="password" placeholder='Password' />

            <div className='flex items-center text-sm mt-[-8px] justify-between w-full ' >
                <p>Forgot your password?</p>
                {
                    currentState === "Login" 
                    ? <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer' >Create account</p>
                    : <p onClick={() => setCurrentState('Login')} className='cursor-pointer' >Login Here</p>
                }
            </div>

            <button className='text-white bg-black px-8 py-2 mt-4 cursor-pointer active:bg-gray-700' >Sign In</button>
    </form>
  )
}

export default Login;