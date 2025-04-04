import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";

const PesticideInfo = () => {
  const [search, setSearch] = useState("");
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [pesticides, setPesticides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPesticides = async () => {
      try {
        const response = await axios.get("http://localhost:9010/api/pesticide/get");
        setPesticides(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching pesticides:", error);
        setError("Failed to fetch pesticides data");
        toast.error("Failed to fetch pesticides data");
        setPesticides([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPesticides();
  }, []);

  const filteredPesticides = pesticides.filter((pesticide) => {
    const name = pesticide?.name?.toLowerCase() || "";
    const composition = pesticide?.composition?.toLowerCase() || "";
    const searchTerm = search.toLowerCase();
    return name.includes(searchTerm) || composition.includes(searchTerm);
  });

  const handleSearch = () => {
    if (search && filteredPesticides.length === 0) {
      toast.error("No matching pesticide found.");
    }
  };

  const getDisplayName = (pesticide) => {
    return pesticide.name || pesticide.composition?.split('\n')[0]?.replace('✔', '').trim() || "Pesticide";
  };

  if (loading) {
    return (
      <div className="ml-64 p-8 flex-1 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="ml-64 p-8 flex-1 flex flex-col items-center justify-center">
        <div className="text-red-500 text-lg mb-4">{error}</div>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="ml-64 p-8 flex-1">
      <div className="mb-4">
        <h2 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
          🛡️ Pesticide Information
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
          placeholder="Search Pesticide..."
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
      </div><br />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPesticides.length > 0 ? (
          filteredPesticides.map((pesticide, index) => (
            <motion.div
              key={pesticide._id || index}
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
                  src={pesticide.images || "https://via.placeholder.com/100"}
                  alt={getDisplayName(pesticide)}
                  className="w-24 h-24 object-cover rounded-md mr-4"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/100";
                  }}
                />
                <div>
                  <h2 className="text-xl font-semibold">
                    {getDisplayName(pesticide)}
                  </h2>

                 
                </div>
              </div>
              {expandedIndex === index && (
                <div className="mt-4">
                  <p className="text-gray-700">
                    <strong>Usage:</strong> {pesticide.usage || "Usage information not available"}
                  </p><br />
                  <p className="text-gray-700">
                    <strong>Suitable Crops:</strong> {pesticide.suitableCrops || "Crop information not available"}
                  </p><br />
                  <p className="text-gray-700">
                    <strong>Benefits:</strong> {pesticide.benefits || "Benefits not specified"}
                  </p><br />
                  <p className="text-gray-700">
                    <strong>Market Price:</strong> {pesticide.marketPrice || "Price not available"}
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
            {search ? "No pesticides match your search" : "No pesticides data available"}
          </div>
        )}
      </div>
    </div>
  );
};

export default PesticideInfo;