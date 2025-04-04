import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function AddCropInsights() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    category: '',
    name: '',
    description: '',
    scintificName: '',
    soilType: '',
    yieldPricePerAcer: '',
    uses: '',
    nutritionlValue: '',
    image: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formDataToSend = new FormData();
      
      // Append all fields
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null && formData[key] !== undefined) {
          formDataToSend.append(key, formData[key]);
        }
      });

      const response = await axios.post('http://localhost:9010/api/cropInsight/add', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.message) {
        alert('Crop insight added successfully!');
        setFormData({
          category: '',
          name: '',
          description: '',
          scintificName: '',
          soilType: '',
          yieldPricePerAcer: '',
          uses: '',
          nutritionlValue: '',
          image: null
        });
        setPreviewImage(null);
        // navigate('/crop-insights'); // Redirect after successful submission
      }
    } catch (err) {
      setError(err.response?.data?.error || err.message);
      console.error('Error adding crop insight:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-8xl">
      <Link to="/view-crop-insights">
  <button className="relative px-6 py-3 font-semibold text-white transition duration-300 ease-in-out bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-xl active:scale-95">
    Manage Crop Insights
  </button>
</Link>

      <h1 className="text-3xl font-bold text-center mb-8 text-green-700">Add New Crop Insight</h1>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
          <p className="font-medium">Error:</p>
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        {/* Image Upload */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Crop Image*</label>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <input
                type="file"
                name="image"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-green-50 file:text-green-700
                  hover:file:bg-green-100"
                accept="image/*"
                required
              />
              <p className="mt-1 text-xs text-gray-500">Upload an image of the crop</p>
            </div>
            {previewImage && (
              <div className="w-24 h-24 border rounded-md overflow-hidden">
                <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </div>

        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Category*
  </label>
  <select
    name="category"
    value={formData.category}
    onChange={handleInputChange}
    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white shadow-sm text-gray-700"
    required
  >
    <option value="" disabled>Select a Crop Category</option>
    <option value="Tree Crop">Tree Crop</option>
    <option value="Cereal Crops">Cereal Crops</option>
    <option value="Pulses (Legume Crops)">Pulses (Legume Crops)</option>
    <option value="Vegetable Crops">Vegetable Crops</option>
    <option value="Fruit Crops">Fruit Crops</option>
    <option value="Flowering Crops">Flowering Crops</option>
    <option value="Dry Fruit Crops">Dry Fruit Crops</option>
    <option value="Medicinal & Aromatic Plants">Medicinal & Aromatic Plants</option>
    <option value="Spices & Condiments">Spices & Condiments</option>
    <option value="Fodder Crops">Fodder Crops</option>
    <option value="Sugar Crops">Sugar Crops</option>
    <option value="Beverage Crops">Beverage Crops</option>
  </select>
</div>


          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Crop Name*</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description*</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            rows="4"
            required
          />
        </div>

        {/* Scientific Name */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Scientific Name*</label>
          <textarea
            type="text"
            name="scintificName"
            value={formData.scintificName}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Soil Type */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Soil Type*</label>
          <textarea
            type="text"
            name="soilType"
            value={formData.soilType}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Yield Price Per Acre */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Yield Price Per Acre*</label>
          <textarea
            type="text"
            name="yieldPricePerAcer"
            value={formData.yieldPricePerAcer}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Uses */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Uses*</label>
          <textarea
            name="uses"
            value={formData.uses}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            rows="4"
            required
          />
        </div>

        {/* Nutritional Value */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Nutritional Value*</label>
          <textarea
            name="nutritionlValue"
            value={formData.nutritionlValue}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            rows="4"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center h-13">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Adding...' : 'Add Crop Insight'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddCropInsights;