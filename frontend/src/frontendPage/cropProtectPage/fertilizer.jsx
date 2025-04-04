import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const FertilizerInfo = () => {
  const [fertilizers, setFertilizers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    const fetchFertilizers = async () => {
      try {
        const response = await axios.get("http://localhost:9010/api/fertilizer/get");
        setFertilizers(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        toast.error("Failed to fetch fertilizers");
      }
    };

    fetchFertilizers();
  }, []);

  const filteredFertilizers = fertilizers.filter((fertilizer) =>
    fertilizer.name.toLowerCase().includes(search.toLowerCase()) ||
    fertilizer.description.toLowerCase().includes(search.toLowerCase())
  );

  const handleSearch = () => {
    if (filteredFertilizers.length === 0) {
      toast.error("No matching fertilizer found.");
    }
  };

  if (loading) {
    return (
      <div className="ml-64 p-8 flex-1 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="ml-64 p-8 flex-1">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="ml-64 p-8 flex-1 min-h-screen bg-gray-50">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
          🌱 Fertilizer Information
        </h2>
        <motion.p
          className="mt-2 text-sm font-bold text-blue-600"
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 10, opacity: 1 }}
          transition={{ repeat: Infinity, repeatType: "reverse", duration: 5 }}
        >
          Click on a card below to see details →
        </motion.p>
      </div>

      {/* Search Bar */}
      <div className="flex justify-between mb-8 items-center">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search by name or description..."
            className="w-full bg-white/90 backdrop-blur-lg text-gray-800 placeholder-gray-500 border border-gray-300 rounded-full py-3 px-5 pl-10 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-md transition-all duration-300"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <svg
            className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <button
          onClick={handleSearch}
          className="ml-4 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-300 flex items-center"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          Search
        </button>
      </div>

      {/* Fertilizer Cards */}
      {filteredFertilizers.length === 0 ? (
        <div className="bg-white p-8 rounded-xl shadow-md text-center">
          <p className="text-gray-600 text-lg">No fertilizers found. Try a different search term.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFertilizers.map((fertilizer, index) => (
            <motion.div
              key={fertilizer._id || index}
              className={`bg-white p-6 rounded-xl shadow-lg cursor-pointer transition-all duration-300 hover:shadow-xl ${
                expandedIndex === index ? 'md:col-span-2 lg:col-span-3' : ''
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex flex-col md:flex-row items-start">
                <div className="w-full md:w-1/3 mb-4 md:mb-0 md:mr-6">
                  <img 
                    src={fertilizer.image || "https://via.placeholder.com/300"} 
                    alt={fertilizer.name} 
                    className="w-full h-48 object-cover rounded-lg shadow-md"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{fertilizer.name}</h2>
                  <p className="text-gray-600 mb-4">{fertilizer.description}</p>
                  
                  {expandedIndex === index && (
                    <div className="space-y-3">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-gray-700 mb-2">Composition</h3>
                        <p className="text-gray-600 whitespace-pre-line">{fertilizer.composition}</p>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-gray-700 mb-2">Usage</h3>
                        <p className="text-gray-600">{fertilizer.usage}</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h3 className="font-semibold text-gray-700 mb-2">Suitable Crops</h3>
                          <p className="text-gray-600">{fertilizer.suitableCrops}</p>
                        </div>

                       <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-gray-700 mb-2">Benefits</h3>
                        <p className="text-gray-600">{fertilizer.benefits}</p>
                      </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h3 className="font-semibold text-gray-700 mb-2">Market Price</h3>
                          <p className="text-green-600 font-medium">{fertilizer.marketPrice}</p>
                        </div>
                      </div>
                      
                     
                      
                      <button 
                        className="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg shadow transition"
                        onClick={(e) => { e.stopPropagation(); setExpandedIndex(null); }}
                      >
                        Show Less
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FertilizerInfo;