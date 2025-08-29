import React from 'react'

const NewsLetterBox = () => {

    const handleSubmit = (e) => {
        e.preventDefault()
    }

  return (
    <div className='flex flex-col text-center gap-3' >
        <p className='text-2xl font-medium text-gray-800' >Subscribe now & get 20% off</p>
        <p className='text-gray-400' >Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
        <form onSubmit={handleSubmit} className='w-full sm:w-1/2 flex items-center border border-gray-300 my-3 mx-auto' action="">
            <input required className='flex-1 px-3 outline-none' type="text" placeholder='Enter your email' />
            <button className='bg-black text-white text-xs px-10 py-4 cursor-pointer active:bg-gray-800 active:scale-95 transition-all ' >SUBSCRIBE</button>
        </form>
    </div>
  )
}

export default NewsLetterBox
