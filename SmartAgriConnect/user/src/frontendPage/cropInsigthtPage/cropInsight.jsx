import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const CropInsight = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate("/crop-info", { state: { category } });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="ml-64 p-8 w-full">
        
        {/* Grid Container */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
          }}
        >
          
          {/* List of Crop Categories */}
          {cropData.map((crop, index) => (
            <CropCard 
              key={index} 
              title={crop.title} 
              description={crop.description} 
              image={crop.image} 
              onClick={() => handleCategoryClick(crop.title)}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

/* Reusable Crop Card Component with Motion */
const CropCard = ({ title, description, image, onClick }) => {
  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-lg cursor-pointer transform transition-all duration-300 flex flex-col"
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }} // Fade-in from below
      animate={{ opacity: 1, y: 0 }} // Move up smoothly
      transition={{ duration: 0.5, ease: "easeOut" }} // Smooth transition
      whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)" }} // Hover effect
    >
      <motion.div
        className="w-full h-48 bg-cover bg-center rounded-t-lg"
        style={{ backgroundImage: `url(${image})` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }} // Image fade-in effect
      ></motion.div>
      
      <motion.h2
        className="text-xl font-bold mt-4 mb-2 text-green-700"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }} // Slide-in effect for title
      >
        {title}
      </motion.h2>

      <motion.p
        className="text-gray-700 flex-grow"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }} // Slide-in effect for description
      >
        {description}
      </motion.p>
    </motion.div>
  );
};

/* Data for Crops */
const cropData = [
  { title: "Tree Crop", description: "Grow high-value tree crops for long-term benefits!", image: "/images/tree.jpg" },
  { title: "Cereal Crops", description: "Discover essential cereal crops that form the backbone of agriculture.", image: "/images/cereal.jpeg" },
  { title: "Pulses (Legume Crops)", description: "Rich in protein and nutrients, pulses are vital for a healthy diet.", image: "/images/pulses.jpeg" },
  { title: "Vegetable Crops", description: "Fresh and nutritious vegetables for every season.", image: "/images/vegetable.jpeg" },
  { title: "Fruit Crops", description: "Sweet and nutritious fruits to boost your farm’s value.", image: "/images/fruit.jpeg" },
  { title: "Flowering Crops", description: "Brighten up your farm with profitable flowering crops.", image: "/images/flower.jpeg" },
  { title: "Dry Fruit Crops", description: "Explore high-value dry fruit crops for sustainable farming.", image: "/images/dryfruit.jpeg" },
  { title: "Medicinal & Aromatic Plants", description: "Grow plants with medicinal and aromatic benefits.", image: "/images/medicinal.jpeg" },
  { title: "Spices & Condiments", description: "Boost your farm’s value with high-demand spice crops.", image: "/images/spices.webp" },
  { title: "Fodder Crops", description: "Essential crops for livestock and sustainable farming.", image: "/images/fodder.jpg" },
  { title: "Sugar Crops", description: "Cultivate sugar-rich crops for profitable farming.", image: "/images/sugar.webp" },
  { title: "Beverage Crops", description: "Grow coffee, tea, and other beverage crops for market demand.", image: "/images/beverage.jpg" }
];

export default CropInsight;
