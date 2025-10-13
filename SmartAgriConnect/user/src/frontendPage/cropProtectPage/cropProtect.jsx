import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const CropProtect = () => {
  const navigate = useNavigate(); // ✅ Define navigate before using it

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="ml-64 p-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Fertilizer Section */}
          <motion.div
            className="bg-white p-8 rounded-lg shadow-lg cursor-pointer transform transition-all duration-300"
            onClick={() => navigate("/fertilizer-info")} 
            initial={{ opacity: 0, scale: 0.8 }}  
            animate={{ opacity: 1, scale: 1 }}  
            transition={{ duration: 0.1 }}       
            whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)" }}
          >
            <div className="w-full h-48 bg-cover bg-center rounded-t-lg" 
                 style={{ backgroundImage: "url('/images/fertilizer2.jpg')" }}>
            </div>
            <h2 className="text-xl font-bold mt-4 mb-2 text-green-700">Explore Fertilizer</h2>
            <p className="text-gray-700">
              Boost your crop yield with the right fertilizers! Click below to explore the best options for your farm.
            </p>
          </motion.div>

        
          <motion.div
            className="bg-white p-8 rounded-lg shadow-lg cursor-pointer transform transition-all duration-300"
            onClick={() => navigate("/pesticide-info")}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.1 }}
            whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)" }}
          >
            <div className="w-full h-48 bg-cover bg-center rounded-t-lg" 
                 style={{ backgroundImage: "url('/images/pesticide.avif')" }}>
            </div>
            <h2 className="text-xl font-bold mt-4 mb-2 text-green-700">Explore Pesticides</h2>
            <p className="text-gray-700">
              Protect your crops from pests and diseases! Click below to find the right pesticides for your farm.
            </p>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default CropProtect;
