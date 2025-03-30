import React, { useState } from "react";
import { motion } from "framer-motion";

const pesticides = [
  {
    name: "🌿 Neem Oil",
    type: "Neem Oil is an organic pesticide derived from neem tree seeds. It is widely used for natural pest control, inhibiting insect growth and preventing infestations without harming plants, soil, or beneficial insects.",
    composition: `✔ Azadirachtin – Disrupts insect growth, feeding, and reproduction, preventing pests from multiplying.
✔ Essential Fatty Acids – Improves plant immunity, making them more resistant to stress, drought, and infections.
✔ Antifungal & Antibacterial Properties – Helps protect plants from fungal infections such as powdery mildew and rust.`,
    usage: `✔ Best for: Vegetables, fruits, ornamental plants, cereals, pulses, and herbs.
✔ Application: Mix with water and spray evenly on plant leaves, stems, and soil. Repeat every 7-10 days for effective pest control.`,
    suitableCrops: "Tomato, Potato, Cabbage, Mango, Citrus, Tea, Coffee, Wheat, Rice",
    benefits: `🌿 Repels pests naturally – Effective against aphids, mites, whiteflies, caterpillars, and other harmful insects without chemicals.
🛡️ Boosts plant immunity – Strengthens plant defense systems, reducing the risk of fungal infections and diseases.
💧 Eco-friendly and safe – Does not harm beneficial insects like bees or butterflies, making it ideal for organic farming.
✔ Reduces soil toxicity – Unlike synthetic pesticides, neem oil improves soil health and microbial activity.`,
    marketPrice: "💰 Market Price: ₹300 - ₹600 per liter",
    image: "https://th.bing.com/th/id/OIP.40Xb_DIFtPXxB6XcG3ICzQHaJB?w=500&h=609&rs=1&pid=ImgDetMain",
  },
  {
    name: "🦟 Malathion",
    type: "Malathion is a synthetic pesticide and insecticide used to control agricultural pests, mosquitoes, and household insects. It acts as a nerve agent, disrupting insect functions and eliminating infestations rapidly.",
    composition: `✔ Organophosphate Compound – Affects the nervous system of insects, causing paralysis and death.
✔ Broad-Spectrum Action – Effective against mosquitoes, flies, aphids, mealybugs, and thrips.
✔ Low Toxicity to Humans – When used correctly, Malathion poses minimal risk to human health but must be handled carefully.`,
    usage: `✔ Best for: Farms, home gardens, warehouses, and pest control in stored grains.
✔ Application: Mixed with water and sprayed onto plants, soil, and pest-infested areas using a sprayer. Reapply every 14 days if needed.`,
    suitableCrops: "Cotton, Sugarcane, Rice, Maize, Wheat, Mustard, Groundnut, Vegetables, Fruits",
    benefits: `🚫 Eliminates harmful insects – Controls pest populations that damage crops and spread diseases.
✔ Improves crop yield – Prevents pest-related damage, ensuring a higher-quality harvest.
⚠️ Caution required – Overuse can harm beneficial insects and contaminate water sources. Proper dosage and timing are crucial.
✔ Cost-effective solution – Provides powerful pest control at an affordable price for large-scale farming.`,
    marketPrice: "💰 Market Price: ₹800 - ₹1,200 per liter",
    image: "https://southernag.com/wp-content/uploads/2020/07/mal50-mu-1024x1024.jpg",
  },
  {
    name: "🍇 Bordeaux Mixture",
    type: "Bordeaux Mixture is a traditional fungicide and pesticide made from copper sulfate and lime. It is highly effective in preventing fungal and bacterial diseases in vineyards, orchards, and vegetable crops.",
    composition: `✔ Copper Sulfate – Destroys fungal spores and harmful bacteria, preventing the spread of infections.
✔ Hydrated Lime – Creates a protective coating on plant surfaces, reducing the risk of disease penetration.
✔ Long-Lasting Effect – Unlike other fungicides, Bordeaux Mixture remains effective even after rain exposure.`,
    usage: `✔ Best for: Fruit trees, vines, vegetables, and potatoes.
✔ Application: Sprayed onto plants before disease outbreaks as a preventive treatment. It should be applied during the dormant season to avoid plant damage.`,
    suitableCrops: "Grapes, Apples, Pears, Potatoes, Tomatoes, Brinjal, Cabbage, Coffee, Tea",
    benefits: `🍇 Prevents fungal infections – Effective against blight, downy mildew, black spot, and other plant diseases.
🛡️ Provides long-lasting protection – Forms a protective layer on plant leaves, reducing the chances of infection.
💦 Rain-resistant formula – Does not wash off easily, providing extended protection even in wet conditions.
✔ Environmentally friendly – Used in organic farming as an alternative to chemical-based fungicides.`,
    marketPrice: "💰 Market Price: ₹400 - ₹700 per 500g pack",
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
      <h2 className="text-2xl font-bold text-gray-800">🛡️ Pesticide Information</h2>

      {/* Search Bar */}
      <div className="fixed top-18 left-3/4 transform -translate-x-1/2 w-[90%] max-w-md z-50">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search Pesticide..."
            className="w-full bg-white/30 backdrop-blur-lg text-gray-800 placeholder-gray-600 border border-gray-300 rounded-full py-3 pl-5 pr-12 focus:outline-none focus:ring-2 focus:ring-gray-500 shadow-lg transition-all duration-300"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <br /><br />

      {/* Pesticide Cards */}
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
            <img src={pesticide.image} alt={pesticide.name} className="w-80 h-80 object-cover mx-auto rounded" />
            <h2 className="text-xl font-semibold mt-2">{pesticide.name}</h2>
            <p className="text-gray-700">✅ <strong>Type:</strong> {pesticide.type}</p>
            <p className="text-gray-700">✅ <strong>Composition:</strong> {pesticide.composition}</p>
            <p className="text-gray-700">✅ <strong>Usage:</strong> {pesticide.usage}</p>
            <p className="text-gray-700">✅ <strong>Suitable Crops:</strong> {pesticide.suitableCrops}</p>
            <p className="text-gray-700">✅ <strong>Benefits:</strong> {pesticide.benefits}</p>
            <p className="text-gray-700">✅ <strong>{pesticide.marketPrice}</strong></p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PesticideInfo;
