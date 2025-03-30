import React from "react";
import { motion } from "framer-motion";

const imageVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
};

const HomePage = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
    {/* Main Content (After Navbar) */}
    <div className="absolute inset-0  ml-54  min-h-screen">

    <div className="relative  min-h-screen bg-gray-100">
      {/* Full-width Image Section */}
      <motion.div
  variants={imageVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: false, amount: 0.3 }}
  className="relative w-full h-98 bg-cover bg-center"
  style={{ backgroundImage: "url('/images/main1.webp')" }}
>
  {/* Overlay for better text visibility */}
  <div className="inset-0 bg-black/50"></div>

  {/* Text Content */}
  <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
    <h6 className="text-4xl md:text-5xl font-bold tracking-wide drop-shadow-lg">
      Smart AgriConnect – A Unified Digital Platform for Farmers
    </h6>
  </div>
</motion.div>;        
    
        {/* About Us Section */}
        <div className="bg-white shadow-lg rounded-xl top-100 mx-4 mt-2 p-8 flex items-center space-x-8">
          {/* Left - Background Image */}
          <div className="w-1/4">
            <img
              src="/images/main3.jpeg"
              alt="Smart AgriConnect"
              className="rounded-lg shadow-md w-full"
            />
          </div>

          {/* Right - Text Content */}
          <div className="w-1/2">
        
            <p className="text-gray-800 text-sm leading-relaxed">
            <strong>Smart AgriConnect</strong>  is a digital platform designed to empower farmers in Tamil Nadu by connecting them directly 
              with buyers, ensuring fair trade and better market access. 
              Our mission is to simplify the agricultural supply chain by providing real-time market insights, fair pricing, and essential farming resources.
               By reducing dependence on middlemen, we help farmers maximize their profits and expand their reach. Through innovative technology, 
               educational support, and a commitment to sustainable agriculture, AgriConnect strives to create a stronger,
                more connected farming community and contribute to the long-term growth of the agricultural sector.
            </p>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-xl top-100 mx-4 mt-2 p-8 flex items-center space-x-8">
  {/* vission */}
  <div className="w-3/5 pr-8">
  <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-600 mb-4 border-b-4 pb-2 inline-block">
  Vision
</h2>

    <p className="text-gray-800 text-sm leading-relaxed">
      <strong>Smart AgriConnect</strong> envisions a digitally empowered agricultural ecosystem in Tamil Nadu, seamlessly connecting farmers, buyers, and industry stakeholders. Our goal is to create a transparent, efficient, and sustainable platform that ensures direct market access, fair pricing, and real-time insights while reducing reliance on intermediaries.

Beyond trade, we provide comprehensive farm management tools, an interactive discussion forum, and easy access to government subsidies and financial aid, empowering farmers with knowledge and resources. By integrating technology, sustainable practices, and collaboration, we aim to build a resilient, self-sufficient farming community, driving long-term prosperity and preserving Tamil Nadu’s rich agricultural heritage.
    </p>
  </div>

  {/* Right - Image */}
  <div className="w-1/3">
    <img
      src="/images/main2.jpg"
      alt="Smart AgriConnect"
      className="rounded-lg shadow-md w-full"
    />
  </div>
</div>

<div className="bg-white shadow-lg rounded-xl top-100 mx-4 mt-2 p-8 flex items-center space-x-8">
          {/* Left - Background Image */}
          <div className="w-2/4">
            <img
              src="/images/main4.jpg"
              alt="Smart AgriConnect"
              className="rounded-lg shadow-md w-full"
            />
          </div>

          {/* Right - Text Content */}
          <div className="w-3/5">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 mb-4 border-b-4  pb-2 inline-block">
  Mission
</h2>

            <p className="text-gray-800 text-sm leading-relaxed">
            
              <strong>Smart AgriConnect </strong> 
              

   is dedicated to transforming Tamil Nadu’s agricultural sector by providing farmers with essential subsidies, expert guidance, and a digital forum for knowledge sharing. Our mission is to create an inclusive ecosystem where farmers can easily access government schemes, financial aid, and modern farming techniques to enhance productivity and profitability.

Through technology, we connect farmers with buyers, industry experts, and agricultural professionals, ensuring direct market access, fair pricing,
 and real-time insights. Beyond trade, we promote sustainable farming practices, equipping farmers with the tools and resources needed to thrive.
  By fostering collaboration, innovation, and digital transformation, we strive to build a self-sufficient, resilient farming community,
   preserving Tamil Nadu’s rich agricultural heritage while driving long-term growth.
            </p>
          </div>
        
        </div>
        
      </div>
      </div>
      
    </div>
  );
};

export default HomePage;
