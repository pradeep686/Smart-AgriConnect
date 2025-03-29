import React, { useState } from "react";
import { motion } from "framer-motion";

const fertilizers = [
    {
        name: "Urea",
        type: "This fertilizer is made using chemical processes rather than being naturally sourced. It is produced in factories and contains a high concentration of nutrients.",
        composition: `✔ 46% Nitrogen 🌱 – Helps plants grow strong and green.
    ❌ 0% Phosphorus  – Not included, so not suitable for root development.
    ❌ 0% Potassium  – Does not improve fruiting or flowering.`,
        usage: ` Ideal for crops that need high nitrogen, such as wheat, maize, and rice.
     Applied via broadcasting – This means spreading it evenly over the soil instead of placing it near the roots.`,
        benefits: `🌱 Boosts vegetative growth – Helps plants grow more leaves and stems, making them strong.
    🍃 Enhances leaf color – The nitrogen makes leaves deep green and healthy, allowing them to absorb more sunlight for better growth.`,
        image: "https://image.chukouplus.com/themes/simplebootx/Upload/W_715/upload/5f9bc90f364d0.jpg?x-oss-process=image/format,webp,image/resize,m_pad,h_400,w_400,color_FFFFFF",
      },
      {
        name: "DAP",
        type: "This fertilizer is chemically processed and contains high amounts of phosphorus and nitrogen, making it ideal for plant growth.",
        composition: `✔ 18% Nitrogen 🌱 – Supports early plant growth and leaf development.
    ✔ 46% Phosphorus 🌾 – Strengthens root development and improves nutrient absorption.
    ❌ 0% Potassium  – Not included, so it does not enhance flowering or fruiting.`,
        usage: `Best suited for pulses and oilseeds that require phosphorus-rich soil.
     Applied at sowing – It should be placed near the plant roots for better absorption.`,
        benefits: `🌱 Encourages root development – Helps young plants establish stronger roots.
    🌸 Improves flowering – Supports better blooming, leading to increased yield.`,
        image: "https://m.media-amazon.com/images/I/71cvpHTeVAL._SL1500_.jpg",
      },
      {
        name: "Vermicompost",
        type: "This is an organic fertilizer made from decomposed organic matter and enriched with essential nutrients by earthworms.",
        composition: `✔ Rich in organic matter 
        🍂 – Improves soil texture and fertility.
    ✔ Contains micronutrients 
    ⚗️ – Provides essential minerals like calcium, magnesium, and iron.`,
        usage: ` Suitable for all crops – Can be used for vegetables, fruits, and field crops.
     Mixed with soil – It should be blended into the top layer for best results.`,
        benefits: `🌱 Improves soil fertility – Enhances nutrient content and soil structure.
    🦠 Enhances microbial activity – Promotes beneficial microbes that aid plant health.`,
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
<br/><br/>
      <div className="grid grid-cols-1 w-md:grid-cols-2 gap-4">
        {filteredFertilizers.map((fertilizer, index) => (
          <motion.div
            key={index}
            className="bg-white p-6 rounded-lg shadow-lg cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02, boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)" }}
          ><br/><br/>
            <img src={fertilizer.image} alt={fertilizer.name}  className="w-80 h-80 object-cover mx-auto rounded" />
            <h2 className="text-xl font-semibold mt-2">{fertilizer.name}</h2>
            <p style={{ whiteSpace: "pre-line" }}  className="text-gray-700">✅ <strong>Type:</strong> {fertilizer.type}</p>
            <p style={{ whiteSpace: "pre-line" }}  className="text-gray-700">✅ <strong>Nutrient Composition:</strong> {fertilizer.composition}</p>
            <p style={{ whiteSpace: "pre-line" }}  className="text-gray-700">✅ <strong>Usage:</strong> {fertilizer.usage}</p>
            <p style={{ whiteSpace: "pre-line" }}  className="text-gray-700">✅ <strong>Benefits:</strong> {fertilizer.benefits}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FertilizerInfo;
