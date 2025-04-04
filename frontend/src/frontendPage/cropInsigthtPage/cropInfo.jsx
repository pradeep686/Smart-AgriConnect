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

    return (
        <div className="ml-64 p-8 flex-1 overflow-hidden">
            <div className="mb-4">
                <h2 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
                    🌱 {selectedCategory}
                </h2>
                <motion.p
                    className="mt-2 text-sm font-bold text-teal-500"
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 10, opacity: 1 }}
                    transition={{ repeat: Infinity, repeatType: "reverse", duration: 5 }}
                >
                    Smart Farming Starts with the Right Knowledge!
                </motion.p>
            </div>

            <div className="flex justify-end mb-4">
                <input
                    type="text"
                    placeholder="Search Crop..."
                    className="w-80 bg-white/30 backdrop-blur-lg text-gray-800 placeholder-gray-600 border border-gray-300 rounded-full py-3 px-5 focus:outline-none focus:ring-2 focus:ring-gray-500 shadow-lg transition-all duration-300"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-1">
                {filteredCrops.map((crop, index) => (
                    <motion.div
                        key={index}
                        className={`bg-white p-6 rounded-lg shadow-lg cursor-pointer transition-all duration-300 ${expandedIndex === index ? "col-span-3" : ""
                            }`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                    >
                        <div className="flex items-center justify-center overflow-hidden rounded-t-xl">
                            <img
                                src={crop.image}
                                alt={crop.name}
                                className="w-100 h-74 object-cover rounded-xl border border-gray-200 shadow-md"
                            />
                        </div>

                        <h3 className="text-lg font-semibold mt-2">{crop.name}</h3>
                        <p className="text-gray-600 text-sm mb-3">{crop.description}</p>
                        {expandedIndex === index ? (
                            <div>
                                <p className="text-gray-700 mb-2"><strong>Scientific Name:</strong> {crop.scintificName}</p>
                                <p className="text-gray-700"><strong>Soil Type:</strong> {crop.soilType}</p>
                                <p className="text-gray-700"><strong>Yield Per Acre:</strong> {crop.yieldPricePerAcer}</p>
                                <p className="text-gray-700"><strong>Uses:</strong> {crop.uses}</p>
                                <p className="text-gray-700"><strong>Nutritional Value:</strong> {crop.nutritionlValue}</p>
                                <button
                                    className="mt-2 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg"
                                    onClick={() => setExpandedIndex(null)}
                                >
                                    Show Less
                                </button>
                            </div>
                        ) : (
                            <button
                                className="mt-2 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg"
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
