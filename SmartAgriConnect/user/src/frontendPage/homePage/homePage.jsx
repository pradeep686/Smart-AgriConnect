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
</motion.div>      
    
     


        <div className="px-10 py-10">
      {/* About Us Section */}
      <motion.div 
        className="bg-white shadow-lg rounded-xl mx-4 p-8 flex items-center space-x-8 mb-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        whileHover={{ scale: 1.05 }} // Bulge effect on hover
      >
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
          AgriConnect is a digital platform that connects farmers, empowering them with knowledge and resources. 
          Farmers can learn farm management, share experiences, and seek expert advice. The platform provides guidance on government subsidies, 
          including eligibility and application. It helps farmers utilize government schemes for farm development. 
          AgriConnect also offers an online marketplace to buy and sell agricultural products directly, eliminating intermediaries. 
          Our goal is to create a connected, informed, and self-sufficient farming community in the digital era.
          </p>
        </div>
      </motion.div>

      {/* Vision Section */}
      <motion.div 
        className="bg-white shadow-lg rounded-xl mx-4 p-8 flex items-center space-x-8 mb-10"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        whileHover={{ scale: 1.05 }} // Bulge effect on hover
      >
        {/* Left - Vision Text */}
        <div className="w-3/5 pr-8">
  <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-600 mb-4 border-b-4 pb-2 inline-block">
    Vision
  </h2>
  
  {/* Slogan */}
  <p className="text-xl !text-gray-500 mb-4 italic">
    To create a platform where farmers access knowledge, resources, and markets easily
  </p>

  <p className="text-gray-800 text-sm leading-relaxed">
    Our vision is to create a smart farming community where technology empowers farmers. AgriConnect will provide knowledge, resources, and direct market access to help farmers grow their businesses. We aim to make farming more profitable, sustainable, and efficient. By connecting farmers with government support and modern tools, we hope to improve farming practices. Our goal is to eliminate intermediaries and make farming easier for everyone. Through AgriConnect, farmers will be more informed and connected. We strive to transform agriculture for future generations.
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
      </motion.div>

      {/* Mission Section */}
      <motion.div 
        className="bg-white shadow-lg rounded-xl mx-4 p-8 flex items-center space-x-8 mb-10"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        whileHover={{ scale: 1.05 }} // Bulge effect on hover
      >
        {/* Left - Image */}
        <div className="w-2/4">
          <img
            src="/images/main4.jpg"
            alt="Smart AgriConnect"
            className="rounded-lg shadow-md w-full"
          />
        </div>

        {/* Right - Mission Text */}
        <div className="w-3/5">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 mb-4 border-b-4 pb-2 inline-block">
            Mission
          </h2>
          <p className="text-gray-800 text-sm leading-relaxed">
            <strong>Smart AgriConnect </strong> 
            Smart AgriConnect aims to transform Tamil Nadu’s agricultural sector by providing farmers with subsidies, expert guidance, 
            and a digital knowledge-sharing platform. Our mission is to create an inclusive ecosystem that connects farmers with government schemes,
             financial aid, and modern farming techniques. Through technology, we ensure direct market access, fair pricing, and real-time insights.
              We promote sustainable farming practices, equipping farmers with tools for success. By fostering collaboration and innovation,
               we aim to build a self-sufficient, resilient farming community. AgriConnect helps preserve Tamil Nadu’s agricultural heritage 
               while driving long-term growth.
          </p>
        </div>
      </motion.div>
    </div>

    <div className="bg-white shadow-xl rounded-xl mx-4 p-10 flex flex-col items-center space-y-8 mb-10">
  {/* Contact Us Header */}
  <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-600 mb-6 border-b-4 pb-2 inline-block">
    Contact Us
  </h2>

  {/* Contact Message */}
  <p className="text-center text-lg text-gray-700 leading-relaxed max-w-3xl">
    We are here to help! Whether you have a question about our platform, want to share feedback, or need assistance, 
    feel free to reach out.
  </p>

  {/* Contact Info Section */}
  <div className="flex flex-col items-center space-y-6 w-full">
    {/* Address */}
    <div className="flex items-center space-x-3">
      <span className="text-cyan-600 text-2xl font-semibold">🏠</span>
      <p className="text-lg text-gray-800 font-semibold">Address: Erode, Tamil Nadu</p>
    </div>
    
    {/* Phone */}
    <div className="flex items-center space-x-3">
      <span className="text-cyan-600 text-2xl font-semibold">📞</span>
      <p className="text-lg text-gray-800 font-semibold">Phone: +91 8072550495</p>
    </div>

    {/* Email */}
    <div className="flex items-center space-x-3">
      <span className="text-cyan-600 text-2xl font-semibold">✉️</span>
      <p className="text-lg text-gray-800 font-semibold">Email: agriConnect2025@gmail.com</p>
    </div>
  </div>

  {/* Line */}
  <div className="w-full border-t border-gray-300 my-8"></div>

  {/* Feedback Section */}
  <p className="text-center text-lg text-gray-800">
    Have any suggestions or feedback to improve our platform?{" "}
    <a href="/feedback" className="!text-cyan-600 hover:text-cyan-800 font-semibold">
      Click here   
    </a>
      <h3> to provide your feedback and help us enhance your experience.</h3>
  </p>
</div>

        
      </div>
      </div>
      
    </div>
  );
};

export default HomePage;
