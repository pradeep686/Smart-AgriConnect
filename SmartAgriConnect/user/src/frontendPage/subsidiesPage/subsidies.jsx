import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Subsidies = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate("/subsidies-info", { state: { category } });
  };

  const subsidiesList = [
    { title: "Crops Subsidy", desc: "Farmers can avail crops at a reduced price under this scheme.", img: "/images/crop.webp" },
    { title: "Fertilizer & Pesticides Subsidy", desc: "Government provides financial assistance for fertilizers to boost production.", img: "/images/fertilizer.jpeg" },
    { title: "Irrigation Subsidy", desc: "Supports affordable irrigation facilities such as canals and tube wells.", img: "/images/irrigation.jpg" },
    { title: "Equipment Subsidy", desc: "Financial aid for purchasing equipment like tractors and harvesters.", img: "/images/equipments.jpg" },
    { title: "Credit Subsidy", desc: "Ensures access to loans at lower interest rates.", img: "/images/credit.jpeg" },
    { title: "Price Support Subsidies", desc: "Ensures stable income by guaranteeing fair prices for crops.", img: "/images/support.jpeg" },
    { title: "Power Subsidy", desc: "Provides electricity at subsidized rates for irrigation.", img: "/images/power.jpeg" },
    { title: "Export & Import Subsidies", desc: "Financial incentives to boost agricultural exports.", img: "/images/export.jpeg" },
    { title: "Organic Farming Subsidy", desc: "Encourages organic farming with financial support.", img: "/images/organic.jpeg" },
    { title: "Infrastructure Development Subsidies", desc: "Supports building storage and cold storage facilities.", img: "/images/infra.jpg" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="ml-64 p-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {subsidiesList.map((subsidy, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-lg shadow-lg cursor-pointer"
              onClick={() => handleCategoryClick(subsidy.title)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)" }}
            >
              <div
                className="w-full h-48 bg-cover bg-center rounded-t-lg"
                style={{ backgroundImage: `url('${subsidy.img}')` }}
              ></div>
              <h2 className="text-xl font-bold mt-4 mb-2 text-green-700">{subsidy.title}</h2>
              <p className="text-gray-700">{subsidy.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Subsidies;
