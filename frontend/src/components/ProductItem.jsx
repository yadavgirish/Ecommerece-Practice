import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router';

const ProductItem = ({id,image,name,price}) => {
    
    const {currency} = useContext(ShopContext)


  return (
    <Link to={`/product/${id}`} className='flex flex-col gap-1 cursor-pointer ' >
        <div className='w-full h-67 overflow-hidden flex items-center justify-center bg-gray-50' ><img className='hover:scale-110 transition ease-in-out' src={image} alt="" /></div>
        <p className='text-sm mt-2' > {name} </p>
        <p className='text-sm font-medium' > {currency}{price} </p>
        
    </Link>
  )
}

export default ProductItem;