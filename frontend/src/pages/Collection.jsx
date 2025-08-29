import React, { use, useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "../components/ProductItem";
import Title from "../components/Title";
import { assets } from "../assets/assets";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [filterVisible, setFilterVisible] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([])
  const [subcategory, setSubCategory] = useState([])
  const [sortType, setSortType] = useState("")

  const toggleCategory = (e) => {
    if(category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value))
    }
    else {
      setCategory( prev => [...prev, e.target.value] )
    }
  }

  const toggleSubCategory = (e) => {
    if(subcategory.includes(e.target.value)) {
      setSubCategory( prev => prev.filter(item => item !== e.target.value))
    }
    else {
      setSubCategory(prev => [...prev, e.target.value])
    }
  }

  const applyFitler = () => {
    let productsCopy = products.slice()
  
    if(search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if(category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category))
    } 
    if(subcategory.length > 0) {
      productsCopy = productsCopy.filter(item => subcategory.includes(item.subcategory))
    }
    setFilterProducts(productsCopy)
  }


  const applySort = () => {
    let fpCopy = filterProducts.slice()
    switch(sortType) {
      case "low-high" :
        setFilterProducts(fpCopy.sort((a,b) => (a.price - b.price)))
        break;
      case "high-low" :
        setFilterProducts(fpCopy.sort((a,b) => (b.price - a.price)))
        break;
      default: 
      applyFitler()
    }
  }


  useEffect(() => {
    applyFitler()
  },[category, subcategory, search, products])

  useEffect(() => {
    setFilterProducts(products);
  }, []);

  useEffect(() => {
    applySort()
  },[sortType])

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t border-gray-200 ">
      {/* -----------Left Side------------------------ */}

      <div className="min-w-60">
        {/* Title */}

        <p
          onClick={() => setFilterVisible(!filterVisible)}
          className="my-2 text-xl flex gap-2 items-center cursor-pointer text-gray-800"
        >
          FILTERS
          <img className={`h-3 sm:hidden ${filterVisible ? "rotate-90" : "rotate-0"} `} src={assets.dropdown_icon} alt="" />
        </p>

        {/* Category Filter */}

        <div
          className={`border sm:block border-gray-300 pl-5 mt-6 py-3 flex flex-col ${
            filterVisible ? "block" : "hidden"
          } `}
        >
          <p className="text-sm text-gray-900 font-medium ">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light mt-3">
            <p className="flex items-center gap-2">
              <input onChange={toggleCategory} type="checkbox" value={"Men"} />
              Men
            </p>
            <p className="flex items-center gap-2">
              <input onChange={toggleCategory} type="checkbox" value={"Women"} />
              Women
            </p>
            <p className="flex items-center gap-2">
              <input onChange={toggleCategory} type="checkbox" value={"Kids"} />
              kids
            </p>
          </div>
        </div>

        {/* Type Filter */}

        <div
          className={`border sm:block border-gray-300 pl-5 mt-5 py-3 flex flex-col ${
            filterVisible ? "block" : "hidden"
          } `}
        >
          <p className="text-sm text-gray-900 font-medium ">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light mt-3">
            <p className="flex items-center gap-2">
              <input onChange={toggleSubCategory} type="checkbox" value={"Topwear"} />
              Topwear
            </p>
            <p className="flex items-center gap-2">
              <input onChange={toggleSubCategory} type="checkbox" value={"Bottomwear"} />
              Bottomwear
            </p>
            <p className="flex items-center gap-2">
              <input onChange={toggleSubCategory} type="checkbox" value={"Winterwear"} />
              Winterwear
            </p>
          </div>
        </div>
      </div>

      {/* -------------------Right Side---------------------------- */}

      <div >
       <div className="flex items-center justify-between mb-4" >
           <div className="text-base  md:text-2xl">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />{" "}
        </div>

        <select  onChange={(e) => setSortType(e.target.value)} className="border-2 font-medium border-gray-300 px-2 py-1.5 sm:py-2.5 text-sm" name="" id="">
          <option value="Relavent">Sort by: Relavent</option>
          <option value="low-high">Sort by: Low to High</option>
          <option value="high-low">Sort by: High to Low</option>
        </select>

       </div>
        <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
          {filterProducts.map((item, index) => {
            return (
              <ProductItem
                key={index}
                id={item._id}
                name={item.name}
                image={item.images[0]}
                price={item.price}
              />
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default Collection;
