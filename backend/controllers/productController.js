import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

//Add Product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      sizes,
      category,
      subcategory,
      bestseller,
      date,
    } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    const imagesUrl = await Promise.all(
      images.map(async (image) => {
        let result = await cloudinary.uploader.upload(image.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      price: Number(price),
      images: imagesUrl,
      sizes: typeof sizes === "string" ? JSON.parse(sizes) : sizes,
      category,
      subcategory,
      bestseller: bestseller === "true" ? true : false,
      date: Date.now(),
    };
    const product = new productModel(productData);
    await product.save();
    res.json({ success: true, message: "Product Added", product });
    console.log(product);
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//List Products
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//Remove Product
const removeProducts = async (req, res) => {
  try {
    const { productId } = req.body;
    const product =  await productModel.findByIdAndDelete(productId);
    if (!product) {
      return res.json({ success: false, message: "Product Not found" });
    }
    else {
      return res.json({success:true, message:"Product removed"})
    }
  } catch (error) {
    console.log(error.message);
  }
};

//Single Product Info
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    if (!product) {
      return res.json({ success: false, message: "Product Not found" });
    }
    res.json({ success: true, product });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { addProduct, listProducts, removeProducts, singleProduct };
