import React from "react";

const Subsidies = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="ml-64 p-8 w-full">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Government Subsidies</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Agriculture Loan Subsidy */}
          <div
            className="bg-white p-8 rounded-lg shadow-lg cursor-pointer transform transition-all duration-300 hover:shadow-2xl hover:scale-105"
            onClick={() => alert("Agriculture Loan Subsidy clicked!")}
          >
            <div className="w-full h-48 bg-cover bg-center rounded-t-lg" style={{ backgroundImage: "url('/images/crop.webp')" }}></div>
            <h2 className="text-xl font-bold mt-4 mb-2 text-green-700">Crops Subsidy</h2>
            <p className="text-gray-700">Farmers can avail crops at a reduced price under this scheme.</p>
          </div>

          {/* Fertilizer Subsidy */}
          <div
            className="bg-white p-8 rounded-lg shadow-lg cursor-pointer transform transition-all duration-300 hover:shadow-2xl hover:scale-105"
            onClick={() => alert("Fertilizer Subsidy clicked!")}
          >
            <div className="w-full h-48 bg-cover bg-center rounded-t-lg" style={{ backgroundImage: "url('/images/fertilizer.jpeg')" }}></div>
            <h2 className="text-xl font-bold mt-4 mb-2 text-green-700">Fertilizer & Pesticides Subsidy</h2>
            <p className="text-gray-700">Government provides financial assistance for fertilizers to boost production.</p>
          </div>

          {/* Irrigation Subsidy */}
          <div
            className="bg-white p-8 rounded-lg shadow-lg cursor-pointer transform transition-all duration-300 hover:shadow-2xl hover:scale-105"
            onClick={() => alert("Irrigation Subsidy clicked!")}
          >
            <div className="w-full h-48 bg-cover bg-center rounded-t-lg" style={{ backgroundImage: "url('/images/irrigation.jpg')" }}></div>
            <h2 className="text-xl font-bold mt-4 mb-2 text-green-700">Irrigation Subsidy</h2>
            <p className="text-gray-700">Supports affordable irrigation facilities, such as canals and tube wells, to ensure adequate water supply for crops.</p>
          </div>

          {/* Equipment Subsidy */}
          <div
            className="bg-white p-8 rounded-lg shadow-lg cursor-pointer transform transition-all duration-300 hover:shadow-2xl hover:scale-105"
            onClick={() => alert("Equipment Subsidy clicked!")}
          >
            <div className="w-full h-48 bg-cover bg-center rounded-t-lg" style={{ backgroundImage: "url('/images/equipments.jpg')" }}></div>
            <h2 className="text-xl font-bold mt-4 mb-2 text-green-700">Equipment Subsidy</h2>
            <p className="text-gray-700">Offers financial assistance for purchasing equipment like tractors, harvesters, and other machinery.</p>
          </div>

          {/* Credit Subsidy */}
          <div
            className="bg-white p-8 rounded-lg shadow-lg cursor-pointer transform transition-all duration-300 hover:shadow-2xl hover:scale-105"
            onClick={() => alert("Credit Subsidy clicked!")}
          >
            <div className="w-full h-48 bg-cover bg-center rounded-t-lg" style={{ backgroundImage: "url('/images/credit.jpeg')" }}></div>
            <h2 className="text-xl font-bold mt-4 mb-2 text-green-700">Credit Subsidy</h2>
            <p className="text-gray-700">Ensures access to loans at lower interest rates to facilitate investment in farming activities.</p>
          </div>

          {/* Price Support Subsidies */}
          <div
            className="bg-white p-8 rounded-lg shadow-lg cursor-pointer transform transition-all duration-300 hover:shadow-2xl hover:scale-105"
            onClick={() => alert("Price Support Subsidies clicked!")}
          >
            <div className="w-full h-48 bg-cover bg-center rounded-t-lg" style={{ backgroundImage: "url('/images/support.jpeg')" }}></div>
            <h2 className="text-xl font-bold mt-4 mb-2 text-green-700">Price Support Subsidies</h2>
            <p className="text-gray-700">Intended to stabilize farmers' income by ensuring fair prices for their produce.</p>
          </div>

          {/* Power Subsidy */}
          <div
            className="bg-white p-8 rounded-lg shadow-lg cursor-pointer transform transition-all duration-300 hover:shadow-2xl hover:scale-105"
            onClick={() => alert("Power Subsidy clicked!")}
          >
            <div className="w-full h-48 bg-cover bg-center rounded-t-lg" style={{ backgroundImage: "url('/images/power.jpeg')" }}></div>
            <h2 className="text-xl font-bold mt-4 mb-2 text-green-700">Power Subsidy</h2>
            <p className="text-gray-700">Provides electricity at subsidized rates for agricultural purposes, primarily for irrigation.</p>
          </div>

          {/* Export Subsidies */}
          <div
            className="bg-white p-8 rounded-lg shadow-lg cursor-pointer transform transition-all duration-300 hover:shadow-2xl hover:scale-105"
            onClick={() => alert("Export Subsidies clicked!")}
          >
            <div className="w-full h-48 bg-cover bg-center rounded-t-lg" style={{ backgroundImage: "url('/images/export.jpeg')" }}></div>
            <h2 className="text-xl font-bold mt-4 mb-2 text-green-700">Export & Import Subsidies</h2>
            <p className="text-gray-700">Designed to promote the export of agricultural products by providing financial incentives.</p>
          </div>

          {/* Organic Farming Subsidy */}
          <div
            className="bg-white p-8 rounded-lg shadow-lg cursor-pointer transform transition-all duration-300 hover:shadow-2xl hover:scale-105"
            onClick={() => alert("Organic Farming Subsidy clicked!")}
          >
            <div className="w-full h-48 bg-cover bg-center rounded-t-lg" style={{ backgroundImage: "url('/images/organic.jpeg')" }}></div>
            <h2 className="text-xl font-bold mt-4 mb-2 text-green-700">Organic Farming Subsidy</h2>
            <p className="text-gray-700">Encourages farmers to adopt organic farming methods by providing financial assistance and resources.</p>
          </div>

          {/* Infrastructure Development Subsidies */}
          <div
            className="bg-white p-8 rounded-lg shadow-lg cursor-pointer transform transition-all duration-300 hover:shadow-2xl hover:scale-105"
            onClick={() => alert("Infrastructure Development Subsidies clicked!")}
          >
            <div className="w-full h-48 bg-cover bg-center rounded-t-lg" style={{ backgroundImage: "url('/images/infra.jpg')" }}></div>
            <h2 className="text-xl font-bold mt-4 mb-2 text-green-700">Infrastructure Development Subsidies</h2>
            <p className="text-gray-700">Support for constructing storage facilities, including cold storage, to reduce post-harvest losses.</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Subsidies;
