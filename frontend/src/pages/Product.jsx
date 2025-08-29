import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { assets, products } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {

  const {products, currency, addToCart} = useContext(ShopContext)
  const params = useParams()
  const productId = params.productId
  const [productData, setProductData] = useState(null)
  const [image, setImage] = useState("")
  const [size, setSize] = useState("")

useEffect(() => {
  if (productData) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}, [productData]);


  const fetchProduct = () => {
    products.map((item) => {
      if(item._id === productId) {
        setProductData(item)
        setImage(item.images[0])
        return null;
      }
    })
  }
  useEffect(() => {
    fetchProduct()
  },[products, productId])

  return productData ?  (
    <div className='border-t-2 border-gray-200 pt-10 transition-opacity ease-in duration-500 opacity-100 ' >

      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row' >
        
        {/* -----------Images ----------------- */}

        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row' >
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full ' >
            {
              productData.images.map((item,index) => {
                return <img onClick={() => setImage(item)} src={item} key={index} className={`w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer ${item === image ? "border border-gray-300" : ""} `}  alt="" />
              })
            }
          </div>
          <div className='w-full sm:w-[80%]' >
            <img src={image} className='w-full h-auto' alt="" />
          </div>
        </div>

        {/* --------------Data ------------ */}

        <div className='flex-1' >
          <h1 className='font-medium text-2xl mt-2 text-black ' > {productData.name} </h1>
            <div className='flex mt-2 items-center gap-1' >
              <img className='w-3' src={assets.star_icon} alt="" />
              <img className='w-3' src={assets.star_icon} alt="" />
              <img className='w-3' src={assets.star_icon} alt="" />
              <img className='w-3' src={assets.star_icon} alt="" />
              <img className='w-3' src={assets.star_dull_icon} alt="" />
              <p className='font-medium pl-2' >(122)</p>
            </div>
            <p className='font-semibold text-3xl text-black mt-5' > {currency}{productData.price} </p>
            <p className='text-gray-500 mt-5 w-full sm:w-4/5' > {productData.description} </p>
            <div className='flex flex-col mt-8 gap-3 ' >
              <p className='text-black' >Select Size</p>
              <div className='flex gap-2' >
                {
                  productData.sizes.map((item,index) => {
                    return <button onClick={() => setSize(item)} key={index} className={`bg-gray-100 border border-gray-200 px-4 py-2 font-medium cursor-pointer active:scale-90 transition ease-in outline-none ${item === size ? "border-orange-500": ""} `}> {item} </button>
                  })
                }
              </div>
            </div>
            <button onClick={() => addToCart(productData._id, size)} className='bg-black text-white  px-8 py-3 mt-9 text-sm active:bg-gray-700 cursor-pointer' >ADD TO CART</button>
            <hr className='border border-gray-100 w-full sm:w-4/5 mt-8 ' />
            <div className='mt-5 flex flex-col gap-1' >
              <p className='text-sm text-gray-500' >100% Original product.</p>
              <p className='text-sm text-gray-500' >Cash on delivery is available on this product.</p>
              <p className='text-sm text-gray-500' >Easy return and exchange policy within 7 days.</p>
            </div>
        </div>
      </div>

      {/* Description and Reviews */}
        
        <div className='mt-20' >
          <div className='flex' >
                <p className='font-bold text-black border border-gray-200 px-5 py-3 text-sm' >Description</p>
                <p className='font-medium border border-gray-200 px-5 py-3 text-sm' >Reviews (122)</p>
          </div>
          <div className='flex flex-col gap-4 border border-gray-200 p-6 text-sm text-gray-500' >
              <p>An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.</p>
              <p>E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.</p>
          </div>

        </div>

      {/* Related Prodcuts */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />

        


    </div>
  ) : <div className='opacity-0' ></div>
}

export default Product;