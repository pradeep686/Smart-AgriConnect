import React from "react";

const Subsidies = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Main Content Section */}
      <div className="ml-64 p-8 w-full"> {/* Ensure this is pushed to the right */}
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Government Subsidies</h1>

        {/* Grid Layout for Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Sample Subsidy Card 1 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-2 text-blue-700">Agriculture Loan Subsidy</h2>
            <p className="text-gray-700">Farmers can avail loans at reduced interest rates under this scheme.</p>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">Learn More</button>
          </div>

          {/* Sample Subsidy Card 2 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-2 text-green-700">Fertilizer Subsidy</h2>
            <p className="text-gray-700">Government provides financial assistance for fertilizers to boost production.</p>
            <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg">Learn More</button>
          </div>

          {/* Sample Subsidy Card 3 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-2 text-red-700">Crop Insurance Scheme</h2>
            <p className="text-gray-700">Protects farmers against crop failure due to natural calamities.</p>
            <button className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg">Learn More</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subsidies;
