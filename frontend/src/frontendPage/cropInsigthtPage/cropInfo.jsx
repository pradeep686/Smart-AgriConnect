import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const dummyCropData = {
  "Tree Crop": [
    {
      name: "Mango",
      image: "https://static.vecteezy.com/system/resources/previews/013/071/907/large_2x/mango-tree-with-fruits-photo.jpg",
      shortInfo: "A tropical fruit rich in vitamins and minerals, Mango trees are grown in tropical and subtropical climates.",
      scientificName: "Mangifera indica",
      details: "Mango trees are grown in tropical and subtropical climates.",
      soilType: "Well-drained loamy soil",
      yieldPerAcre: "8-10 tons",
      marketValue: "$1.5 per kg",
      uses: "Eaten fresh, juice, dried, processed in desserts",
      nutritionalValue: "High in Vitamin C and A"
    },
    {
      name: "Coconut",
      image: "https://th.bing.com/th/id/OIP.y8U3prn9-4hzrV6wl4f3QwHaE8?rs=1&pid=ImgDetMain",
      shortInfo: "A versatile crop used for food, oil, and fiber.",
      scientificName: "Cocos nucifera",
      details: "Coconuts grow well in coastal areas with sandy soil.",
      soilType: "Sandy, well-drained soil",
      yieldPerAcre: "7000-8000 nuts",
      marketValue: "$0.8 per nut",
      uses: "Coconut oil, milk, fiber, copra",
      nutritionalValue: "Rich in healthy fats and electrolytes"
    }
  ],
  "Cereal Crops": [
    {
      name: "Wheat",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Wheat_close-up.JPG/800px-Wheat_close-up.JPG",
      shortInfo: "A staple cereal crop grown worldwide.",
      scientificName: "Triticum aestivum",
      details: "Wheat is a primary source of food in many countries.",
      soilType: "Clay loam soil",
      yieldPerAcre: "40-50 quintals",
      marketValue: "$0.25 per kg",
      uses: "Flour, bread, pasta, cereals",
      nutritionalValue: "Rich in carbohydrates and fiber"
    }
  ]
};



const CropInfo = () => {
    const location = useLocation();
    const [selectedCategory, setSelectedCategory] = useState(location.state?.category || "Tree Crop");
    const [search, setSearch] = useState("");
    const [filteredCrops, setFilteredCrops] = useState(dummyCropData[selectedCategory] || []);
    const [expandedIndex, setExpandedIndex] = useState(null);

    useEffect(() => {
        setFilteredCrops(dummyCropData[selectedCategory] || []);
    }, [selectedCategory]);

    useEffect(() => {
        if (search.trim() === "") {
            setFilteredCrops(dummyCropData[selectedCategory] || []);
        } else {
            const results = dummyCropData[selectedCategory]?.filter(crop =>
                crop.name.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredCrops(results);
        }
    }, [search, selectedCategory]);

    return (
        <div className="ml-64 p-8 flex-1 overflow-hidden">


<div className="mb-4">
      <h2 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
      🌱 {selectedCategory}
      </h2>
      <motion.p
        className="mt-2 text-sm font-bold text-pink-600"
        initial={{ x: -10, opacity: 0 }}
        animate={{ x: 10, opacity: 1 }}
        transition={{ repeat: Infinity, repeatType: "reverse", duration: 5 }}
      >
      Smart Farming Starts with the Right Knowledge!
      </motion.p>
    </div>


            {/* Search Bar */}
            <div className="flex justify-end mb-4">
                <input
                    type="text"
                    placeholder="Search Crop..."
                    className="w-80 bg-white/30 backdrop-blur-lg text-gray-800 placeholder-gray-600 border border-gray-300 rounded-full py-3 px-5 focus:outline-none focus:ring-2 focus:ring-gray-500 shadow-lg transition-all duration-300"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button onClick={() => {}} className="ml-2 !bg-gray-700 text-white px-4 py-2 rounded-lg">
                    Search
                </button>
            </div>

            {/* Crop List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-1">
                {filteredCrops.map((crop, index) => (
                    <motion.div
                        key={index}
                        className={`bg-white p-6 rounded-lg shadow-lg cursor-pointer transition-all duration-300 ${
                            expandedIndex === index ? "col-span-3" : ""
                        }`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)" }}
                    >
  <div className="flex items-center justify-center overflow-hidden rounded-t-xl">
                        <img
                            src={crop.image}
                            alt={crop.name}
                            className="w-100 h-74 object-cover rounded-xl border border-gray-200 shadow-md"
                        />
                    </div>

                        <h3 className="text-lg font-semibold mt-2">{crop.name}</h3>
                        <p className="text-gray-600 text-sm mb-3">{crop.shortInfo}</p>
                        {expandedIndex === index ? (
                            <div>
                                <p className="text-gray-700 mb-2"><strong>Scientific Name:</strong> {crop.scientificName}</p>
                                <p className="text-gray-700"><strong>Soil Type:</strong> {crop.soilType}</p>
                                <p className="text-gray-700"><strong>Yield Per Acre:</strong> {crop.yieldPerAcre}</p>
                                <p className="text-gray-700"><strong>Market Value:</strong> {crop.marketValue}</p>
                                <p className="text-gray-700"><strong>Uses:</strong> {crop.uses}</p>
                                <p className="text-gray-700"><strong>Nutritional Value:</strong> {crop.nutritionalValue}</p>
                                <button
                                    className="mt-2 px-4 py-2 !bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition"
                                    onClick={() => setExpandedIndex(null)}
                                >
                                    Show Less
                                </button>
                            </div>
                        ) : (
                            <button
                                className="mt-2 px-4 py-2 !bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition"
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