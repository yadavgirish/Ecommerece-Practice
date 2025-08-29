import React, { useState } from "react";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";
import { backendUrl } from "../App";

const Add = ({token}) => {

  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("Men")
  const [subcategory, setSubcategory] = useState("Topwear")
  const [price, setPrice] = useState("")
  const [bestseller, setBestseller] = useState(false)
  const [sizes, setSizes] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()

      formData.append("name",name)
      formData.append("description",description)
      formData.append("category",category)
      formData.append("subcategory",subcategory)
      formData.append("price",price)
      formData.append("bestseller",bestseller)
      formData.append("sizes",JSON.stringify(sizes))

      image1 && formData.append("image1",image1)
      image2 && formData.append("image2",image2)
      image3 && formData.append("image3",image3)
      image4 && formData.append("image4",image4)

      const response = await axios.post(backendUrl + '/api/product/add', formData, {headers: {token}})
      if(response.data.success) {
        toast.success(response.data.message)
        setName("")
        setDescription("")
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setPrice("")
      }
      else {
        toast.error(response.data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }



  return (
    <form onSubmit={handleSubmit} className="flex w-full min-h-screen flex-col gap-3" action="">
      {/* Upload Image */}
      <div className="">
        <p className="mb-2">Upload Image</p>

        <div className="flex gap-2">

          <label htmlFor="image1">
            <img className="w-20" src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
            <input onChange={(e) => setImage1(e.target.files[0])} id="image1" hidden type="file" />
          </label>
          <label htmlFor="image2">
            <img className="w-20" src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
            <input onChange={(e) => setImage2(e.target.files[0])} id="image2" hidden type="file" />
          </label>
          <label htmlFor="image3">
            <img className="w-20" src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
            <input onChange={(e) => setImage3(e.target.files[0])} id="image3" hidden type="file" />
          </label>
          <label htmlFor="image4">
            <img className="w-20" src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
            <input onChange={(e) => setImage4(e.target.files[0])} id="image4" hidden type="file" />
          </label>
        </div>

      </div>
      {/* Product Name */}
      <div className="flex flex-col gap-2" >
        <p>Product name</p>
        <input onChange={(e) => setName(e.target.value)} value={name} className="px-3 max-w-[500px] py-2 border border-gray-300 rounded-md bg-white" id="productName" type="text" placeholder="Type here" />
      </div>
      {/* Product Description */}
      <div className="flex flex-col gap-2" >
        <p>Product description</p>
        <textarea onChange={(e) => setDescription(e.target.value)} value={description} className="px-3 max-w-[500px] py-2 border border-gray-300 rounded-md bg-white" id="productDescription" type="text" placeholder="Write content here" />
      </div>
      {/* Product Category Sub Category Product Price */}
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8 mt-1.5" >

        <div className="flex flex-col gap-2" >
          <p>Product category</p>
          <select onChange={(e) => setCategory(e.target.value)} value={category} className="px-3 w-full sm:w-[124px] py-2 border border-gray-300 rounded-md bg-white" name="" id="productCategory">
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div className="flex flex-col gap-2" >
          <p>Sub category</p>
          <select onChange={(e) => setSubcategory(e.target.value)} value={subcategory} className="px-3 w-full sm:w-[135px] py-2 border border-gray-300 rounded-md bg-white" name="" id="productCategory">
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div className="flex flex-col gap-2" >
          <p>Product Price</p>
          <input onChange={(e) => setPrice(e.target.value)} value={price} placeholder="25" className="px-3 py-2 bg-white border border-gray-300 rounded-md w-full sm:w-[120px]" type="number" />
        </div>

      </div>
      {/* Product Sizes */}
      <div className="" >
        <p className="mb-2" >Product Sizes</p>
        <div className="flex gap-3" >
          <div onClick={() => setSizes(prev => prev.includes("S") ? prev.filter(item => item !== "S") : [...prev,"S"])} className={` ${sizes.includes("S") ? "bg-pink-100" : "bg-slate-200"} cursor-pointer px-3 py-1`} >
            <p>S</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("M") ? prev.filter(item => item !== "M") : [...prev,"M"])} className={` ${sizes.includes("M") ? "bg-pink-100" : "bg-slate-200"} cursor-pointer px-3 py-1`} >
            <p>M</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("L") ? prev.filter(item => item !== "L") : [...prev,"L"])} className={` ${sizes.includes("L") ? "bg-pink-100" : "bg-slate-200"} cursor-pointer px-3 py-1`} >
            <p>L</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("XL") ? prev.filter(item => item !== "XL") : [...prev,"XL"])} className={` ${sizes.includes("XL") ? "bg-pink-100" : "bg-slate-200"} cursor-pointer px-3 py-1`} >
            <p>XL</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("XXL") ? prev.filter(item => item !== "XXL") : [...prev,"XXL"])} className={` ${sizes.includes("XXL") ? "bg-pink-100" : "bg-slate-200"} cursor-pointer px-3 py-1`} >
            <p>XXL</p>
          </div>
        </div>
      </div>
      {/* Add To BestSeller */}
      <div className="flex gap-2 mt-2" >
        <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} className="cursor-pointer" type="checkbox" />
        <p className="cursor-pointer">Add to bestseller</p>
      </div>
      {/* Add Button */}
      <button className="bg-black w-28 text-white cursor-pointer active:scale-90 transition ease-in py-3 mt-4" >ADD</button>


    </form>
  );
};

export default Add;
