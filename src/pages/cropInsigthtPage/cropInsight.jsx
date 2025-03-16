import React from "react";

const CropInsight = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-8 bg-gray-100">
      <h2 className="text-3xl font-bold mb-6">Crop Insight Data</h2>

      {/* Grid Layout for Boxes */}
      <div className="grid grid-cols-7 gap-9 w-full max-w-6xl">
        <div className="w-full bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-bold">Crop Data 1</h3>
          <p className="text-gray-600">Details about the crop...</p>
        </div>
      

        <div className="w-full bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-bold">Crop Data 2</h3>
          <p className="text-gray-600">Details about another crop...</p>
        </div>

        <div className="w-full bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-bold">Crop Data 3</h3>
          <p className="text-gray-600">More crop-related insights...</p>
        </div>
      </div>
    </div>
  );
};

export default CropInsight;
