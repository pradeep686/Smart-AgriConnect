import React from "react";

const HomePage = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
    {/* Main Content (After Navbar) */}
    <div className="absolute inset-0  ml-54  min-h-screen">

    <div className="relative  min-h-screen bg-gray-100">
      {/* Full-width Image Section */}
      <div 
        className="relative w-326 h-98  bg-cover bg-center" 
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
      </div>
    
        {/* About Us Section */}
        <div className="bg-white shadow-lg rounded-xl top-100 mx-4 mt-2 p-8 flex items-center space-x-8">
          {/* Left - Background Image */}
          <div className="w-1/4">
            <img
              src="/images/main2.jpg"
              alt="Smart AgriConnect"
              className="rounded-lg shadow-md w-full"
            />
          </div>

          {/* Right - Text Content */}
          <div className="w-1/2">
            <h2 className="text-3xl font-bold text-green-700 mb-4 border-b-4 border-green-600 pb-2 inline-block">
              About Us
            </h2>
            <p className="text-gray-800 text-sm leading-relaxed">
              <strong>Smart AgriConnect</strong> is a unified digital platform designed to empower
              farmers with real-time access to government subsidies, crop cultivation insights,
              and structured farm management practices. It features an online agricultural trading
              marketplace for seamless buying, selling, and negotiation of farm products, along
              with a centralized discussion hub for knowledge sharing and expert guidance.
            </p>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default HomePage;
