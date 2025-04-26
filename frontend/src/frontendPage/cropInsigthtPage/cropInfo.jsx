import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CropInfo = () => {
    const location = useLocation();
    const [selectedCategory, setSelectedCategory] = useState(location.state?.category || "Tree Crop");
    const [search, setSearch] = useState("");
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [allCrops, setAllCrops] = useState([]);
    const [filteredCrops, setFilteredCrops] = useState([]);

    // Fetch from backend
    useEffect(() => {
        fetch("http://localhost:9010/api/cropInsight/get")
            .then((res) => res.json())
            .then((data) => {
                setAllCrops(data);
            })
            .catch((err) => {
                console.error(err);
                toast.error("Failed to load crop data.");
            });
    }, []);

    // Filter by category
    useEffect(() => {
        const crops = allCrops.filter(crop => crop.category === selectedCategory);
        setFilteredCrops(crops);
    }, [selectedCategory, allCrops]);

    // Filter by search
    useEffect(() => {
        const crops = allCrops.filter(crop =>
            crop.category === selectedCategory &&
            crop.name.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredCrops(crops);
    }, [search, selectedCategory, allCrops]);

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
        <div className="ml-64 p-8 flex-1 overflow-hidden">
        <div className="mb-4">
          <h2 className="text-3xl font-extrabold text-teal-500 flex items-center gap-2">
            🌱 {selectedCategory}
          </h2>
          <motion.p
            className="mt-2 text-sm font-bold text-green-800"
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 10, opacity: 1 }}
            transition={{ repeat: Infinity, repeatType: "reverse", duration: 5 }}
          >
            Smart Farming Starts with the Right Knowledge!
          </motion.p>
        </div>
      
        {/* Search Bar */}
        <div className="flex justify-end mb-4">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search Crop..."
              className="w-80 bg-white/30 backdrop-blur-lg text-gray-800 placeholder-gray-600 border border-gray-300 rounded-full py-3 px-5 focus:outline-none focus:ring-2 focus:ring-gray-500 shadow-lg transition-all duration-300"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="ml-2 !bg-gray-700 text-white px-4 py-2 rounded-lg">
              Search
            </button>
          </div>
        </div>
      
        {/* Crop Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-1">
          {filteredCrops.map((crop, index) => (
            <motion.div
              key={index}
              className={`bg-white p-6 rounded-lg shadow-lg cursor-pointer transition-all duration-300 
              ${expandedIndex === index ? "md:col-span-2 lg:col-span-3" : ""}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-center overflow-hidden rounded-t-xl">
                <img
                  src={crop.image}
                  alt={crop.name}
                  className="w-full h-64 object-cover rounded-xl border border-gray-200 shadow-md"
                />
              </div>
      
              <h3 className="text-lg font-bold mt-4 text-blue-500">{crop.name}</h3>
              <p className="text-gray-600 text-sm mb-3 mt-2">{crop.description}</p>
      
              {expandedIndex === index ? (
                <div className="mt-4 text-gray-600 whitespace-pre-line">
                  <p className="text-gray-700 mb-2">
                    <strong>Scientific Name:</strong> {crop.scintificName}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Soil Type:</strong> {crop.soilType}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Yield Per Acre:</strong> {crop.yieldPricePerAcer}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Uses:</strong> {crop.uses}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Nutritional Value:</strong> {crop.nutritionlValue}
                  </p>
      
                  <button
                    className="mt-3 px-4 py-2 !bg-red-600 text-white font-semibold rounded-lg"
                    onClick={() => setExpandedIndex(null)}
                  >
                    Show Less
                  </button>
                </div>
              ) : (
                <button
                  className="mt-3 px-4 py-2 !bg-orange-400 text-white font-semibold rounded-lg"
                  onClick={() => setExpandedIndex(index)}
                >
                  Learn More
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </div>
          );
};

export default CropInfo;
