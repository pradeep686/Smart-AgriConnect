import React, { useState } from "react";
import { motion } from "framer-motion";

const fertilizers = [
  {
    name: "🌱 Urea",
    type: "Urea is a widely used nitrogen fertilizer that is synthetically produced. It provides a high nitrogen content, making it ideal for promoting vegetative growth in crops. It dissolves quickly in water and releases nitrogen into the soil.",
    composition: `Nitrogen (N): 46%
Phosphorus (P): 0%
Potassium (K): 0%
Other Elements: None`,
    usage: `Urea is best suited for nitrogen-demanding crops such as wheat, maize, rice, and sugarcane. It is applied by broadcasting evenly across the field before irrigation or rainfall to prevent nitrogen loss.`,
    suitableCrops: "Wheat, Maize, Rice, Sugarcane, Cotton, Potato",
    benefits: `🌱 Boosts vegetative growth, ensuring stronger stems and healthier leaves.
✔ Improves the green color of leaves, enhancing photosynthesis.
✔ Quick absorption by plants, leading to faster growth.
✔ Cost-effective and provides high nitrogen content for crop nourishment.`,
    marketPrice: "💰 Market Price: ₹900 - ₹1,200 per 50kg bag",
    image: "https://image.chukouplus.com/themes/simplebootx/Upload/W_715/upload/5f9bc90f364d0.jpg?x-oss-process=image/format,webp,image/resize,m_pad,h_400,w_400,color_FFFFFF",
  },
  {
    name: "🌾 DAP (Diammonium Phosphate)",
    type: "DAP is a phosphorus-rich fertilizer with moderate nitrogen content. It enhances root development and improves the early growth stages of crops. It is commonly used for sowing as it provides both nitrogen and phosphorus in one application.",
    composition: `Nitrogen (N): 18%
Phosphorus (P): 46%
Potassium (K): 0%
Other Elements: Trace micronutrients`,
    usage: `DAP is mainly used for crops requiring high phosphorus during their early growth phase, such as pulses, oilseeds, and vegetables. It should be placed near the seed at planting to maximize root absorption.`,
    suitableCrops: "Pulses, Oilseeds, Wheat, Maize, Vegetables, Fruits",
    benefits: `🌾 Enhances root development, leading to better water and nutrient absorption.
✔ Improves seedling strength and early plant growth.
✔ Promotes better flowering and grain formation.
✔ Provides a balanced nutrient supply during initial growth phases.`,
    marketPrice: "💰 Market Price: ₹1,500 - ₹1,800 per 50kg bag",
    image: "https://m.media-amazon.com/images/I/71cvpHTeVAL._SL1500_.jpg",
  },
  {
    name: "🍂 Vermicompost",
    type: "Vermicompost is an organic fertilizer made from decomposed organic matter enriched with beneficial microbes through earthworm activity. It enhances soil health and fertility while improving plant growth naturally.",
    composition: `Organic Matter: 50-60%
Nitrogen (N): 1.5-2%
Phosphorus (P): 1.5-2%
Potassium (K): 1-1.5%
Other Elements: Calcium, Magnesium, Iron, Beneficial Microorganisms`,
    usage: `Vermicompost is suitable for all crops, including vegetables, fruits, flowers, and cereals. It should be mixed with soil or applied as a top dressing to improve soil structure and nutrient content.`,
    suitableCrops: "Vegetables, Fruits, Flowers, Cereals, Pulses, Tea Plantations",
    benefits: `🍂 Enhances soil fertility by improving its physical, chemical, and biological properties.
✔ Increases water retention, reducing irrigation needs.
✔ Enriches the soil with beneficial microbes that aid plant growth.
✔ Provides slow-release nutrients, ensuring long-term soil health.
✔ Reduces dependency on chemical fertilizers and improves organic crop production.`,
    marketPrice: "💰 Market Price: ₹300 - ₹500 per 25kg bag",
    image: "https://m.media-amazon.com/images/I/61NDpj1AUWL._SX522_.jpg",
  },
];

const FertilizerInfo = () => {
  const [search, setSearch] = useState("");

  const filteredFertilizers = fertilizers.filter((fertilizer) =>
    fertilizer.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="ml-64 p-8 flex-1">
      <h2
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          color: "#333",
          padding: "10px",
          display: "inline-block",
        }}
      >
        🌱 Fertilizer Information
      </h2>

      {/* Search Bar */}
      <div className="fixed top-18 left-3/4 transform -translate-x-1/2 w-[90%] max-w-md z-50">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search Fertilizer..."
            className="w-full bg-white/30 backdrop-blur-lg text-gray-800 placeholder-gray-600 border border-gray-300 rounded-full py-3 pl-5 pr-12 focus:outline-none focus:ring-2 focus:ring-gray-500 shadow-lg transition-all duration-300"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-gray-700 to-black p-2 rounded-full flex items-center justify-center hover:scale-105 transition-all duration-300"
          >
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
      </div>
      <br /><br />

      {/* Fertilizer Cards */}
      <div className="grid grid-cols-1 w-md:grid-cols-2 gap-4">
        {filteredFertilizers.map((fertilizer, index) => (
          <motion.div
            key={index}
            className="bg-white p-6 rounded-lg shadow-lg cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02, boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)" }}
          >
            <br /><br />
            <img src={fertilizer.image} alt={fertilizer.name} className="w-80 h-80 object-cover mx-auto rounded" />
            <h2 className="text-xl font-semibold mt-2">{fertilizer.name}</h2>
            <p className="text-gray-700">✅ <strong>Type:</strong> {fertilizer.type}</p>
            <p className="text-gray-700">✅ <strong>Nutrient Composition:</strong> {fertilizer.composition}</p>
            <p className="text-gray-700">✅ <strong>Usage:</strong> {fertilizer.usage}</p>
            <p className="text-gray-700">✅ <strong>Suitable Crops:</strong> {fertilizer.suitableCrops}</p>
            <p className="text-gray-700">✅ <strong>Benefits:</strong> {fertilizer.benefits}</p>
            <p className="text-gray-700">✅ <strong>{fertilizer.marketPrice}</strong></p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FertilizerInfo;
