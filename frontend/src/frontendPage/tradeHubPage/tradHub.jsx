import React from "react";
import { motion } from "framer-motion";

const TradeHub = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
    <div className="ml-64 p-8 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* Fertilizer Section */}
        <motion.div
          className="bg-white p-8 rounded-lg shadow-lg cursor-pointer transform transition-all duration-300"
          // onClick={() => navigate("/fertilizer-info")} 
          initial={{ opacity: 0, scale: 0.8 }}  
          animate={{ opacity: 1, scale: 1 }}  
          transition={{ duration: 0.1 }}       
          whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)" }}
        >
          <div className="w-full h-65 bg-cover bg-center rounded-t-lg" 
               style={{ backgroundImage: "url('/images/buyer.png')" }}>
          </div>
          <h2 className="text-xl font-bold mt-4 mb-2 text-green-700">🛒 AgriBuy (Buyer Page)</h2>
          <p className="text-gray-700">
          Looking to purchase quality farm products? Explore trusted sellers and find everything you need—from seeds to machinery—at the best prices!
          </p>
        </motion.div>

        {/* Pesticides Section */}
        <motion.div
          className="bg-white p-8 rounded-lg shadow-lg cursor-pointer transform transition-all duration-300"
          // onClick={() => navigate("/pesticide-info")}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.1 }}
          whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)" }}
        >
          <div className="w-full h-65 bg-cover bg-center rounded-t-lg" 
               style={{ backgroundImage: "url('/images/seller.avif')" }}>
          </div>
          <h2 className="text-xl font-bold mt-4 mb-2 text-green-700">AgriSell (Seller Page)</h2>
          <p className="text-gray-700">
          Have farm products or tools to sell? List your items, reach interested buyers, and grow your agri-business with ease!
           </p>
        </motion.div>

      </div>
    </div>
  </div>
  );
};

export default TradeHub;
