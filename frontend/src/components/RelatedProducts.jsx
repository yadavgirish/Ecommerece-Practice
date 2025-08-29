import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from "../components/ProductItem"

const RelatedProducts = ({category, subCategory}) => {

  const {products} = useContext(ShopContext)
  const [relatedProducts, setRelatedProducts] = useState([])

  

  useEffect(() => {
    let productsCopy = products.slice()
    if(category) {
      productsCopy = productsCopy.filter(item => item.category === category)
    }
    if(subCategory) {
      productsCopy = productsCopy.filter(item => item.subCategory === subCategory)
    }
    setRelatedProducts(productsCopy.slice(0,5))

  },[products])


  return (
    <div className='my-24' >
      <div className='text-center' >
          <div className='text-3xl' > <Title text1={"RELATED"} text2={"PRODUCTS"}  /> </div>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-2' >

      {
        relatedProducts.map((item,index) => {
          return  <ProductItem key={index} id={item._id} name={item.name} image={item.images[0]} price={item.price} />
        })
      }

      </div>
    </div>
  )
}

export default RelatedProducts;