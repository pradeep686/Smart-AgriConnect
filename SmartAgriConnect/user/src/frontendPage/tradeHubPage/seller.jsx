import React, { useState, useEffect } from "react";

import { motion } from "framer-motion";

const SellerProductForm = () => {
  const [productData, setProductData] = useState({
    productName: "",
    shortDescription: "",
    images: [],
    location: "",

    price: "",
    quantity: "",
    unit: "",
    harvestDate: "",
    expiryDate: "",
    category: "",
    variety: "",

    packagingType: "",
    deliveryOptions: "",
    minOrderQty: "",
    paymentOptions: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  // Handle image upload separately
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setProductData({ ...productData, images: files });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Collected Product Data:", productData);

    // TODO: Send 'productData' to your server / database
  };

      const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 700);
    
      return () => clearTimeout(timer);
    }, []);
    
    if (isLoading) {
      return (
        <div className="ml-64 pt-79 flex-1 flex justify-center items-center">
       <div className="relative w-12 h-12">
      <div className="absolute inset-0 rounded-full border-4 border-t-green-500 border-b-green-500 border-l-transparent border-r-transparent animate-spin"></div>
      <div className="absolute inset-1 rounded-full border-4 border-t-transparent border-b-transparent border-l-green-300 border-r-green-300 animate-[spin_2s_linear_infinite]"></div>
    </div>
    </div>    
      );
    }

  return (
    <div className="ml-64 p-8 flex-1 bg-gray-100 min-h-screen">
      <div className="mb-8">
                <h2 className="text-3xl font-extrabold text-red-500 flex items-center gap-2">
                🛒 Add Your Agri Products
                </h2>
                <motion.p
                  className="mt-2 text-1xl font-bold text-pink-600"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 10, opacity: 1 }}
                  transition={{ repeat: Infinity, repeatType: "reverse", duration: 5 }}
                >
                  — Sell Directly Without Middlemen!
                </motion.p>
              </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-xl">
        
        {/* Core Fields */}
        <div>
          <h3 className="text-2xl font-semibold text-blue-500 mb-4">Core Fields</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="productName"
              placeholder="Product Name"
              value={productData.productName}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full"
              required
            />
            <textarea
              type="text"
              name="shortDescription"
              placeholder="Short Description"
              value={productData.shortDescription}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full"
              required
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={productData.location}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full"
              required
            />
            <input
              type="file"
              name="images"
              multiple
              onChange={handleImageChange}
              className="border p-3 rounded-lg w-full"
            />
          </div>
        </div>

        {/* Product Details */}
        <div>
          <h3 className="text-2xl font-semibold text-blue-500 mb-4">Product Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="price"
              placeholder="Price (per kg, per item, etc.)"
              value={productData.price}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full"
            />
            <input
              type="text"
              name="quantity"
              placeholder="Quantity Available"
              value={productData.quantity}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full"
            />
            <input
              type="text"
              name="unit"
              placeholder="Unit of Measurement (kg, tons, liters, etc.)"
              value={productData.unit}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full"
            />
            <input
              type="text"
              name="harvestDate"
              placeholder="Harvest Date"
              value={productData.harvestDate}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full"
            />
            <input
              type="text"
              name="expiryDate"
              placeholder="Expiry Date"
              value={productData.expiryDate}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full"
            />
            <input
              type="text"
              name="category"
              placeholder="Category/Type (fruits, grains, etc.)"
              value={productData.category}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full"
            />
            <input
              type="text"
              name="variety"
              placeholder="Variety (e.g., Basmati rice, Alphonso mango)"
              value={productData.variety}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full"
            />
          </div>
        </div>

        {/* Logistics & Info */}
        <div>
          <h3 className="text-2xl font-semibold text-blue-500 mb-4">Logistics & Info (Optional)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="packagingType"
              placeholder="Packaging Type (loose, boxed, vacuum-packed)"
              value={productData.packagingType}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full"
            />
            <input
              type="text"
              name="deliveryOptions"
              placeholder="Delivery Options (pickup, home delivery, etc.)"
              value={productData.deliveryOptions}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full"
            />
            <input
              type="text"
              name="minOrderQty"
              placeholder="Minimum Order Quantity"
              value={productData.minOrderQty}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full"
            />
            <input
              type="text"
              name="paymentOptions"
              placeholder="Payment Options/Terms"
              value={productData.paymentOptions}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-6  ml-110 !bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300"
        >
          Submit Product
        </button>
      </form>
    </div>
  );
};

export default SellerProductForm;
