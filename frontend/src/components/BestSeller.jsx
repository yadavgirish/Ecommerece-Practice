import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {

    const {products} = useContext(ShopContext)
    const [bestSeller, setBestSeller] = useState([])

    useEffect(() => {
        let bestProducts = products.filter(item => item.bestseller === true)
        setBestSeller(bestProducts.slice(0,5))
    },[products])

  return (
    <div className='my-10' >

        {/* Title */}

        <div className='flex flex-col items-center py-8 text-center '>
            <div className='text-3xl' ><Title text1={"BEST"} text2={"SELLERS"} /></div>
            <p className='text-xs w-3/4 sm:text-base sm:w-full' >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the.</p>
        </div>

        {/* Products */}

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 space-y-4' >

            {
                bestSeller.map((item,index) => {
                    return <ProductItem key={index} id={item._id} name={item.name} image={item.images[0]} price={item.price} />
                })
            }

        </div>

    </div>
  )
}

export default BestSeller;