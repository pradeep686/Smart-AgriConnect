import React from "react";

const HomePage = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Main Content (After Navbar) */}
      <div className="ml-64 flex-1">
        {/* About Us Section (Full-width rectangle) */}
        <div className="bg-gradient-to-r from-700 to-900 text-white py-16 px-12 shadow-lg rounded-xl mx-5 mt-5">
          <h2 className="text-4xl font-bold text-green-600 mb-4 text-left tracking-wide  border-b-4 border-green-600 pb-2 inline-block">
            About Us
          </h2>
          <h2 className="max-w-5xl mx-auto text-black leading-relaxed text-center">
            Smart AgriConnect is a unified digital platform designed to empower farmers with real-time access
            to government subsidies, crop cultivation insights, and structured farm management practices. It
            features an online agricultural trading marketplace for seamless buying, selling, and negotiation
            of farm products, along with a centralized discussion hub for knowledge sharing and expert guidance.
          </h2>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
