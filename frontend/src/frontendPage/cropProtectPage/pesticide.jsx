import React, { useState } from "react";
import { motion } from "framer-motion";

const pesticides = [
 {
    name: "Neem Oil",
    type: "This is an organic pesticide derived from the neem tree. It is a natural solution for controlling pests without harming plants, soil, or beneficial insects.",
    composition: `✔ Azadirachtin 🌿 – A natural compound that disrupts insect growth, feeding, and reproduction, preventing pests from multiplying.
✔ Essential Fatty Acids 🌱 – Improve plant immunity, making them more resistant to stress, drought, and infections.`,
    usage: ` Best for: Vegetables, fruits, ornamental plants, and herbs.
 Application: Mixed with water and sprayed evenly on plant leaves, stems, and soil to keep pests away.`,
    benefits: `🌿 **Repels pests naturally** – Effective against aphids, mites, whiteflies, caterpillars, and other harmful insects without using chemicals.
🛡️ Boosts plant immunity – Strengthens plant defense systems, reducing the risk of fungal infections and diseases.
💧 Eco-friendly and safe – Does not harm beneficial insects like bees or butterflies, making it ideal for organic farming.`,
    image: "https://th.bing.com/th/id/OIP.40Xb_DIFtPXxB6XcG3ICzQHaJB?w=500&h=609&rs=1&pid=ImgDetMain",
  },
  {
    name: "Malathion",
    type: "Malathion is a synthetic pesticide commonly used to eliminate harmful insects in agriculture, home gardens, and public health programs. It is widely used for mosquito control.",
    composition: `✔ Organophosphate Compound ⚗️ – A powerful chemical that affects the nervous system of insects, paralyzing and killing them.
✔ Broad-Spectrum Action 🦟 – Effective against a variety of pests, including mosquitoes, flies, aphids, mealybugs, and thrips.`,
    usage: ` Best for: Farms, home gardens, and pest control in stored grains.
 Application: Mixed with water and sprayed onto plants, soil, and pest-infested areas using a sprayer.`,
    benefits: `🚫 Eliminates harmful insects** – Works quickly to control insect populations that damage crops and spread diseases.
Improves crop yield – Prevents pest-related damage, ensuring better harvests.
⚠️ Caution required – Must be used carefully, as overuse can harm beneficial insects and the environment.`,
    image: "https://southernag.com/wp-content/uploads/2020/07/mal50-mu-1024x1024.jpg",
  },
  {
    name: "Bordeaux Mixture",
    type: "Bordeaux Mixture is a traditional fungicide and pesticide made from copper sulfate and lime. It is used to prevent fungal and bacterial diseases in crops, especially in vineyards and orchards.",
    composition: `✔ Copper Sulfate 🔵** – Destroys fungal spores and harmful bacteria, preventing the spread of infections.
✔ Hydrated Lime 🏺 – Creates a protective coating on plant surfaces, reducing the risk of disease penetration.`,
    usage: ` Best for: Fruit trees, vines, vegetables, and potatoes.
 Application: Sprayed onto plants before disease outbreaks as a preventive treatment.`,
    benefits: `🍇 Prevents fungal infections – Effective against blight, downy mildew, and black spot.
🛡️ Provides long-lasting protection – Forms a protective layer on plant leaves, reducing the chances of infection.
💦 Rain-resistant formula – Does not wash off easily, providing extended protection in wet conditions.`,
    image: "https://th.bing.com/th/id/R.be836946fb3dddafc305272f5bfe0f25?rik=XNBoCsQT3oWiBQ&riu=http%3a%2f%2fwww.landscapedepot.ie%2fwp-content%2fuploads%2f2018%2f05%2fvitax-bordeaux-mixture-175g-400x400.jpg&ehk=UMe888Dq1DFkmnwJwpkiR37itPJZnZuZFxdNZAlGKCk%3d&risl=&pid=ImgRaw&r=0",
  },
];

const PesticideInfo = () => {
  const [search, setSearch] = useState("");

  const filteredPesticides = pesticides.filter((pesticide) =>
    pesticide.name.toLowerCase().includes(search.toLowerCase())
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
        🛡️ Pesticide Information
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
        {filteredPesticides.map((pesticide, index) => (
          <motion.div
            key={index}
            className="bg-white p-6 rounded-lg shadow-lg cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02, boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)" }}
          >
            <br />
            <br />
            <img
              src={pesticide.image}
              alt={pesticide.name}
              className="w-80 h-80 object-cover mx-auto rounded"
            />
            <h2 className="text-xl font-semibold mt-2">{pesticide.name}</h2>
            <p style={{ whiteSpace: "pre-line" }} className="text-gray-700">
              ✅ <strong>Type:</strong> {pesticide.type}
            </p>
            <p style={{ whiteSpace: "pre-line" }} className="text-gray-700">
              ✅ <strong>Composition:</strong> {pesticide.composition}
            </p>
            <p style={{ whiteSpace: "pre-line" }} className="text-gray-700">
              ✅ <strong>Usage:</strong> {pesticide.usage}
            </p>
            <p style={{ whiteSpace: "pre-line" }} className="text-gray-700">
              ✅ <strong>Benefits:</strong> {pesticide.benefits}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PesticideInfo;
