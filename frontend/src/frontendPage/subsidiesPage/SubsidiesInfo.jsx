import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const dummySubsidyData = {
  "Crops Subsidy": [
    {
      name: "PM-Kisan Samman Nidhi",
      image: "https://upload.wikimedia.org/wikipedia/commons/d/de/Coconut_palms%2Ctiruvarur%2Ctamilnadu_-_panoramio.jpg",
      shortInfo: "A direct cash transfer scheme for small & marginal farmers.",
      details: "Under PM-Kisan, eligible farmers receive ₹6,000 per year in three installments...",
      eligibility: ["Small and marginal farmers", "Landholding up to 2 hectares"],
      documentsRequired: ["Aadhaar Card", "Bank Account Details", "Land Ownership Proof"]
    },
    {
      name: "National Food Security Mission",
      image: "",
      shortInfo: "Aims to increase crop production through area expansion and productivity enhancement.",
      details: "The scheme provides financial assistance for improved seeds, fertilizers, and training.",
      eligibility: ["Farmers growing wheat, rice, pulses"],
      documentsRequired: ["Farmer ID", "Land Records"]
    },
    {
      name: "Crop Insurance Scheme",
      image: "",
      shortInfo: "Provides financial protection against crop failure.",
      details: "This scheme compensates farmers for losses due to natural calamities.",
      eligibility: ["All farmers enrolled in the scheme"],
      documentsRequired: ["Land Ownership Proof", "Insurance Certificate"]
    }
  ],
  "Fertilizer & Pesticides Subsidy": [
    {
      name: "Nutrient Based Subsidy (NBS) Scheme",
      image: "",
      shortInfo: "Provides subsidies on fertilizers to promote balanced use.",
      details: "The government fixes subsidy rates per kg of nutrients (N, P, K, S), ensuring affordable pricing for farmers.",
      eligibility: ["All registered farmers"],
      documentsRequired: ["Aadhaar Card", "Fertilizer Purchase Invoice"]
    },
    {
      name: "Soil Health Card Scheme",
      image: "",
      shortInfo: "Helps farmers understand soil nutrient status.",
      details: "Provides recommendations for suitable fertilizers and crop rotation.",
      eligibility: ["All farmers with cultivable land"],
      documentsRequired: ["Land Records", "Previous Soil Test Report"]
    },
    {
      name: "Organic Farming Promotion Scheme",
      image: "",
      shortInfo: "Encourages organic farming by providing financial assistance.",
      details: "Supports farmers transitioning to organic farming methods.",
      eligibility: ["Farmers practicing organic farming"],
      documentsRequired: ["Farm Ownership Proof", "Organic Certification Application"]
    }
  ],
  "Irrigation Subsidy": [
    {
      name: "Pradhan Mantri Krishi Sinchayee Yojana (PMKSY)",
      image: "",
      shortInfo: "Enhances water use efficiency for sustainable irrigation.",
      details: "Provides financial aid for micro-irrigation systems like drip and sprinkler irrigation.",
      eligibility: ["All farmers with landholdings"],
      documentsRequired: ["Land Ownership Proof", "Irrigation Project Proposal"]
    },
    {
      name: "National Mission on Sustainable Agriculture (NMSA)",
      image: "",
      shortInfo: "Focuses on water conservation and efficient irrigation.",
      details: "Supports rainwater harvesting structures and micro-irrigation projects.",
      eligibility: ["Farmers adopting sustainable practices"],
      documentsRequired: ["Soil Health Card", "Farm Details"]
    },
    {
      name: "Watershed Development Project",
      image: "",
      shortInfo: "Supports soil and water conservation in rainfed areas.",
      details: "Aims to restore degraded watersheds for enhanced productivity.",
      eligibility: ["Farmers in rainfed regions"],
      documentsRequired: ["Land Ownership Proof", "Project Proposal"]
    }
  ]
};
const SubsidiesInfo = () => {
    const location = useLocation();
    const [selectedCategory, setSelectedCategory] = useState(location.state?.category || "Crops Subsidy");
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredSubsidies, setFilteredSubsidies] = useState(dummySubsidyData[selectedCategory] || []);
    const [expandedIndex, setExpandedIndex] = useState(null);
  
    useEffect(() => {
      setFilteredSubsidies(dummySubsidyData[selectedCategory] || []);
    }, [selectedCategory]);
  
    const handleSearch = () => {
      const results = dummySubsidyData[selectedCategory]?.filter(subsidy => 
        subsidy.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (results.length > 0) {
        setFilteredSubsidies(results);
      } else {
        toast.error("No matching subsidy found.");
      }
    };
  
    return (
      <div className="ml-64 p-8 flex-1 overflow-hidden">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">🚜 {selectedCategory}</h2>
        
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
        
        {/* Subsidy List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-2">
          {filteredSubsidies.map((subsidy, index) => (
            <motion.div
              key={index}
              className={`bg-white p-6 rounded-lg shadow-lg cursor-pointer transition-all duration-300 ${expandedIndex === index ? 'col-span-3' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)" }}
            >
               <div className="flex items-center">
              <img src={subsidy.image} alt={subsidy.name} 
              className="w-90 h-auto object-contain rounded-md mb-4" />
              </div>
              <h3 className="text-lg font-semibold mt-2">{subsidy.name}</h3>
              <p className="text-gray-600 text-sm mb-3">{subsidy.shortInfo}</p>
              {expandedIndex === index ? (
                <div>
                  <p className="text-gray-700 mb-2">{subsidy.details}</p>
                  <p className="text-gray-700 font-semibold">Eligibility:</p>
                  <ul className="list-disc list-inside text-gray-600 mb-2">
                    {subsidy.eligibility.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                  <p className="text-gray-700 font-semibold">Documents Required:</p>
                  <ul className="list-disc list-inside text-gray-600">
                    {subsidy.documentsRequired.map((doc, i) => <li key={i}>{doc}</li>)}
                  </ul>
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
  
  export default SubsidiesInfo;