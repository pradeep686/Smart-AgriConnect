import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

const SubsidiesInfo = () => {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState(
    location.state?.category || "Crops Subsidy"
  );
  const [filteredSubsidies, setFilteredSubsidies] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubsidies = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:9010/api/subsidie/get");
        if (response.data && Array.isArray(response.data)) {
          const categoryData = response.data.filter(
            (subsidy) => subsidy.category === selectedCategory
          );
          setFilteredSubsidies(categoryData);
        }
      } catch (error) {
        console.error("Error fetching subsidies:", error);
        setError("Failed to load subsidies. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchSubsidies();
  }, [selectedCategory]);

  if (loading) {
    return (
      <div className="ml-64 p-8 flex-1 overflow-hidden">
        <p>Loading subsidies...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="ml-64 p-8 flex-1 overflow-hidden">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="ml-64 p-8 flex-1 overflow-hidden">
      <div className="mb-4">
        <h2 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
          {selectedCategory}
        </h2>
        <motion.p
          className="mt-2 text-sm !font-bold text-violet-600"
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 10, opacity: 1 }}
          transition={{ repeat: Infinity, repeatType: "reverse", duration: 5 }}
        >
          Smart Farming Starts Here – Avail Your Agricultural Subsidy!
        </motion.p>
      </div>

      <div className="flex justify-end mb-4">
  <div className="flex items-center">
    <input
      type="text"
      placeholder="Search Subsidies..."
      className="w-80 bg-white/30 backdrop-blur-lg text-gray-800 placeholder-gray-600 border border-gray-300 rounded-full py-3 px-5 focus:outline-none focus:ring-2 focus:ring-gray-500 shadow-lg transition-all duration-300"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
    <button
      className="ml-2 !bg-gray-700 text-white px-4 py-2 rounded-lg"
    >
      Search
    </button>
  </div>
</div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-2">
        {filteredSubsidies
          .filter((subsidy) =>
            subsidy.subsidyName.toLowerCase().includes(search.toLowerCase())
          )
          .map((subsidy, index) => (
            <motion.div
              key={index}
              className={`bg-white p-6 rounded-lg shadow-lg cursor-pointer transition-all duration-300 ${
                expandedIndex === index ? "col-span-3" : ""
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <img
                src={subsidy.image}
                alt={subsidy.subsidyName}
                className={`w-full ${expandedIndex === index ? "h-40" : "h-32"} object-contain rounded-md mb-4`}
              />
              <h3 className="text-lg font-semibold">{subsidy.subsidyName}</h3>
              <p className="text-gray-600 text-sm mb-3">{subsidy.shortInfo}</p>
              {expandedIndex === index ? (
                <div>
                  <p className="text-gray-700 mb-2">{subsidy.briefInfo}</p>
                  <p className="font-semibold">Objective:</p>
                  <p className="text-gray-600 mb-2">{subsidy.objective}</p>

                  <p className="font-semibold mt-2">Eligibility:</p>
                  <p className="text-gray-600 whitespace-pre-line">
                    {typeof subsidy.eligibility === 'string' ? subsidy.eligibility : ''}
                  </p>

                  <p className="font-semibold mt-2">Benefits:</p>
                  <p className="text-gray-600 whitespace-pre-line">
                    {typeof subsidy.benefits === 'string' ? subsidy.benefits : ''}
                  </p>

                  <p className="font-semibold mt-2">Documents Required:</p>
                  <p className="text-gray-600 whitespace-pre-line">
                    {typeof subsidy.documentsRequired === 'string' ? subsidy.documentsRequired : ''}
                  </p>

                  {subsidy.officialWebsite && (
                    <div className="mt-2">
                      <p className="font-semibold">Official Website: </p>
                      <a 
                        href={subsidy.officialWebsite} 
                        className="!text-blue-500 break-all" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        {subsidy.officialWebsite}
                      </a>
                    </div>
                  )}

                  <button 
                    onClick={() => setExpandedIndex(null)} 
                    className="mt-4 px-4 py-2 !bg-red-600 text-white rounded-lg"
                  >
                    Show Less
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setExpandedIndex(index)} 
                  className="mt-2 px-4 py-2 !bg-green-600 text-white rounded-lg"
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

export default SubsidiesInfo;