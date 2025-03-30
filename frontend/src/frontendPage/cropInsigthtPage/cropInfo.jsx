import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const dummyCropData = {
    "Tree Crop": [
        {
          name: "Mango",
          image: "https://upload.wikimedia.org/wikipedia/commons/d/de/Coconut_palms%2Ctiruvarur%2Ctamilnadu_-_panoramio.jpg",
          shortInfo: "A tropical fruit rich in vitamins and minerals.",
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
          image: "/images/coconut.jpg",
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
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredCrops, setFilteredCrops] = useState(dummyCropData[selectedCategory] || []);
    const [expandedIndex, setExpandedIndex] = useState(null);
  
    useEffect(() => {
      setFilteredCrops(dummyCropData[selectedCategory] || []);
    }, [selectedCategory]);
  
    const handleSearch = () => {
      const results = dummyCropData[selectedCategory]?.filter(crop => 
        crop.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (results.length > 0) {
        setFilteredCrops(results);
      } else {
        toast.error("No matching crop found.");
      }
    };
  
    return (
      <div className="ml-64 p-8 flex-1 overflow-hidden">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">🌱 {selectedCategory}</h2>
        
        {/* Search Bar */}
        <div className="flex justify-end mt-4">
          <div className="relative w-80">
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-white/30 backdrop-blur-lg text-gray-800 placeholder-gray-600 border border-gray-300 rounded-full py-3 pl-5 pr-12 focus:outline-none focus:ring-2 focus:ring-gray-500 shadow-lg transition-all duration-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button 
              onClick={handleSearch} 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-gray-700 to-black p-3 rounded-full flex items-center justify-center hover:scale-105 transition-all duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="white"
                className="w-5 h-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M15 10a5 5 0 1 1-10 0 5 5 0 0 1 10 0z" />
              </svg>
            </button>
          </div>
        </div><br /><br />
        
        {/* Crop List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-2">
          {filteredCrops.map((crop, index) => (
            <motion.div
              key={index}
              className={`bg-white p-6 rounded-lg shadow-lg cursor-pointer transition-all duration-300 ${expandedIndex === index ? 'col-span-3' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)" }}
            >
  <div className="flex items-center">
              <img src={crop.image} alt={crop.name} 
              className="w-90 h-auto object-contain rounded-md mb-4" />
              </div>
              <h3 className="text-lg font-semibold mt-2">{crop.name}</h3>
              <p className="text-gray-600 text-sm mb-3">{crop.shortInfo}</p>
              {expandedIndex === index ? (
                <div>
                    
                  <p className="text-gray-700 mb-2"><strong>Scientific Name:</strong> {crop.scientificName}</p><br />
                  <p className="text-gray-700"><strong>Soil Type:</strong> {crop.soilType}</p><br />
                  <p className="text-gray-700"><strong>Yield Per Acre:</strong> {crop.yieldPerAcre}</p><br />
                  <p className="text-gray-700"><strong>Market Value:</strong> {crop.marketValue}</p><br />
                  <p className="text-gray-700"><strong>Uses:</strong> {crop.uses}</p><br />
                  <p className="text-gray-700"><strong>Nutritional Value:</strong> {crop.nutritionalValue}</p><br />
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
  