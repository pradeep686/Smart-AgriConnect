import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const fertilizers = [
  {
    name: "🌱 Urea",
    shortDescription: "A high-nitrogen fertilizer that promotes vegetative growth.",
    type: "Urea is a widely used nitrogen fertilizer that is synthetically produced...",
    composition: `Nitrogen (N): 46%\nPhosphorus (P): 0%\nPotassium (K): 0%\nOther Elements: None`,
    usage: "Urea is best suited for nitrogen-demanding crops such as wheat, maize, rice, and sugarcane...",
    suitableCrops: "Wheat, Maize, Rice, Sugarcane, Cotton, Potato",
    benefits: "🌱 Boosts vegetative growth, ensuring stronger stems and healthier leaves...",
    marketPrice: "💰 Market Price: ₹900 - ₹1,200 per 50kg bag",
    image: "https://image.chukouplus.com/themes/simplebootx/Upload/W_715/upload/5f9bc90f364d0.jpg?x-oss-process=image/format,webp,image/resize,m_pad,h_400,w_400,color_FFFFFF",
  },
  {
    name: "🌾 DAP (Diammonium Phosphate)",
    shortDescription: "A phosphorus-rich fertilizer enhancing root development.",
    type: "DAP is a phosphorus-rich fertilizer with moderate nitrogen content...",
    composition: `Nitrogen (N): 18%\nPhosphorus (P): 46%\nPotassium (K): 0%\nOther Elements: Trace micronutrients`,
    usage: "DAP is mainly used for crops requiring high phosphorus during their early growth phase...",
    suitableCrops: "Pulses, Oilseeds, Wheat, Maize, Vegetables, Fruits",
    benefits: "🌾 Enhances root development, leading to better water and nutrient absorption...",
    marketPrice: "💰 Market Price: ₹1,500 - ₹1,800 per 50kg bag",
    image: "https://m.media-amazon.com/images/I/71cvpHTeVAL._SL1500_.jpg",
  },
  {
    name: "🍂 Vermicompost",
    shortDescription: "An organic fertilizer improving soil fertility naturally.",
    type: "Vermicompost is an organic fertilizer made from decomposed organic matter...",
    composition: `Organic Matter: 50-60%\nNitrogen (N): 1.5-2%\nPhosphorus (P): 1.5-2%\nPotassium (K): 1-1.5%\nOther Elements: Calcium, Magnesium, Iron, Beneficial Microorganisms`,
    usage: "Vermicompost is suitable for all crops, including vegetables, fruits, flowers, and cereals...",
    suitableCrops: "Vegetables, Fruits, Flowers, Cereals, Pulses, Tea Plantations",
    benefits: "🍂 Enhances soil fertility by improving its physical, chemical, and biological properties...",
    marketPrice: "💰 Market Price: ₹300 - ₹500 per 25kg bag",
    image: "https://m.media-amazon.com/images/I/61NDpj1AUWL._SX522_.jpg",
  },
];

const FertilizerInfo = () => {
  const [search, setSearch] = useState("");
  const [expandedIndex, setExpandedIndex] = useState(null);

  const filteredFertilizers = fertilizers.filter((fertilizer) =>
    fertilizer.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSearch = () => {
    if (filteredFertilizers.length === 0) {
      toast.error("No matching fertilizer found.");
    }
  };

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
    transition={{ repeat: Infinity, repeatType: "reverse", duration: 5 }}
  >
   Click on a below card to see details →
  </motion.p>
</div>
      {/* Search Bar */}
      <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="Search Fertilizer..."
          className="w-80 bg-balck/30 backdrop-blur-lg !text-gray-800 placeholder-gray-600 border border-gray-300 rounded-full py-3 px-5 focus:outline-none focus:ring-2 focus:ring-gray-500 shadow-lg transition-all duration-300"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch} className="ml-2 !bg-gray-700 text-white px-4 py-2 rounded-lg">Search</button>
      </div>

      {/* Fertilizer Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredFertilizers.map((fertilizer, index) => (
          <motion.div
            key={index}
            className={`bg-white p-6 rounded-lg shadow-lg cursor-pointer transition-all duration-300 ${expandedIndex === index ? 'col-span-2' : ''}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
          >
            <div className="flex items-center">
              <img src={fertilizer.image} alt={fertilizer.name} className="w-24 h-24 object-cover rounded-md mr-4" />
              <div>
                <h2 className="text-xl font-semibold">{fertilizer.name}</h2>
                <p className="text-gray-600">{fertilizer.shortDescription}</p>
              </div>
            </div>
            {expandedIndex === index && (
              <div className="mt-4">
                <p className="text-gray-700"><strong>Type:</strong> {fertilizer.type}</p>
                <p className="text-gray-700"><strong>Nutrient Composition:</strong> {fertilizer.composition}</p>
                <p className="text-gray-700"><strong>Usage:</strong> {fertilizer.usage}</p>
                <p className="text-gray-700"><strong>Suitable Crops:</strong> {fertilizer.suitableCrops}</p>
                <p className="text-gray-700"><strong>Benefits:</strong> {fertilizer.benefits}</p>
                <p className="text-gray-700"><strong>{fertilizer.marketPrice}</strong></p>
                <button className="mt-2 px-4 py-2 !bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition" onClick={(e) => { e.stopPropagation(); setExpandedIndex(null); }}>
                  Show Less
                </button>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FertilizerInfo;
