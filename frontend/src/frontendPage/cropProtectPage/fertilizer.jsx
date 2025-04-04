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
    <div className="ml-64 p-8 flex-1">
      <div className="mb-4">
        <h2 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
          🌱 Fertilizer Information
        </h2>
        <motion.p
          className="mt-2 text-sm font-bold text-blue-600"
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 10, opacity: 1 }}
          transition={{ repeat: Infinity, repeatType: "reverse", duration: 1 }}
        >
          Click on a below card to see details →
        </motion.p>
      </div>

      <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="Search Fertilizer..."
          className="w-80 bg-white/30 backdrop-blur-lg text-gray-800 placeholder-gray-600 border border-gray-300 rounded-full py-3 px-5 focus:outline-none focus:ring-2 focus:ring-gray-500 shadow-lg transition-all duration-300"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button 
          onClick={handleSearch} 
          className="ml-2 !bg-gray-700 text-white px-4 py-2 rounded-lg"
        >
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredFertilizers.length > 0 ? (
          filteredFertilizers.map((fertilizer, index) => (
            <motion.div
              key={fertilizer._id || index}
              className={`bg-white p-6 rounded-lg shadow-lg cursor-pointer transition-all duration-300 ${
                expandedIndex === index ? "col-span-2" : ""
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
            >
              <div className="flex items-center">
                <img
                  src={fertilizer.image || "https://via.placeholder.com/100"}
                  alt={fertilizer.name}
                  className="w-24 h-24 object-cover rounded-md mr-4"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/100";
                  }}
                />
                <div>
                  <h2 className="text-xl font-semibold">
                    {fertilizer.name}
                  </h2>
                </div>
              </div>
              {expandedIndex === index && (
                <div className="mt-4">
                  <p className="text-gray-700">
                    <strong>Description:</strong> {fertilizer.description || "description information not available"}
                  </p><br />
                  <p className="text-gray-700">
                    <strong>Usage:</strong> {fertilizer.usage || "Usage information not available"}
                  </p><br />
                  <p className="text-gray-700">
                    <strong>Nutritent Composition:</strong> {fertilizer.nutritentComposition || "Crop information not available"}
                  </p><br />
                  <p className="text-gray-700">
                    <strong>Suitable Crops:</strong> {fertilizer.suitableCrops || "Crop information not available"}
                  </p><br />
                  <p className="text-gray-700">
                    <strong>Benefits:</strong> {fertilizer.Benefiyts || "Benefits not specified"}
                  </p><br />
                  <p className="text-gray-700">
                    <strong>Market Price:</strong> {fertilizer.marketPrice || "Price not available"}
                  </p><br />
                  <button
                    className="mt-2 px-4 py-2 !bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedIndex(null);
                    }}
                  >
                    Show Less
                  </button>
                </div>
              )}
            </motion.div>
          ))
        ) : (
          <div className="col-span-2 text-center py-8 text-gray-500">
            {search ? "No fertilizers match your search" : "No fertilizers data available"}
          </div>
        )}
      </div>
    </div>
  );
};

export default FertilizerInfo;