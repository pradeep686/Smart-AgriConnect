import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function AddFertilizer() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: '',
    nutritentComposition: '',
    usage: '',
    suitableCrops: '',
    Benefiyts: '',
    marketPrice: '',
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
      
      // Append all fields based on your pesticide schema
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('type', formData.type);
      formDataToSend.append('nutritentComposition', formData.nutritentComposition);
      formDataToSend.append('usage', formData.usage);
      formDataToSend.append('suitableCrops', formData.suitableCrops);
      formDataToSend.append('Benefiyts', formData.Benefiyts);
      formDataToSend.append('marketPrice', formData.marketPrice);
      if (formData.image) {
        formDataToSend.append('image', formData.image); // Note: matches your backend field name
      }

      const response = await axios.post('http://localhost:9010/api/fertilizer/add', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.message) {
        alert('Fertilizer added successfully!');
        setFormData({
          name: '',
          description: '',
          type: '',
          nutritentComposition: '',
          usage: '',
          suitableCrops: '',
          Benefiyts: '',
          marketPrice: '',
          image: null
        });
        setPreviewImage(null);
      }
    } catch (err) {
      setError(err.response?.data?.error || err.message);
      console.error('Error adding fertilizer:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <button className='bg-blue-200 px-4 py-2 rounded mb-4'>
        <Link to="/view-fertilizers">View Fertilizers</Link>
      </button>
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-700">Add New Fertilizer</h1>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
          <p className="font-medium">Error:</p>
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        {/* Name */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Name*</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            placeholder="Fertilizer name"
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description*</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
            required
            placeholder="Short description of the fertilizer"
          />
        </div>

        {/* Type */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Type*</label>
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            placeholder="Type of fertilizer (organic, chemical, etc.)"
          />
        </div>

        {/* Nutrient Composition */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Nutrient Composition*</label>
          <textarea
            name="nutritentComposition"
            value={formData.nutritentComposition}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            required
            placeholder="NPK values and other nutrient contents"
          />
        </div>

        {/* Image Upload */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Fertilizer Image*</label>
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
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
                accept="image/*"
                required
              />
              <p className="mt-1 text-xs text-gray-500">Upload an image of the fertilizer</p>
            </div>
            {previewImage && (
              <div className="w-24 h-24 border rounded-md overflow-hidden">
                <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </div>

        {/* Usage */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Usage Instructions*</label>
          <textarea
            name="usage"
            value={formData.usage}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            required
            placeholder="How to use the fertilizer"
          />
        </div>

        {/* Suitable Crops */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Suitable Crops*</label>
          <input
            type="text"
            name="suitableCrops"
            value={formData.suitableCrops}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            placeholder="Which crops this fertilizer is suitable for"
          />
        </div>

        {/* Benefits */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Benefits*</label>
          <textarea
            name="Benefiyts"
            value={formData.Benefiyts}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            required
            placeholder="Benefits of using this fertilizer"
          />
        </div>

        {/* Market Price */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Market Price*</label>
          <input
            type="text"
            name="marketPrice"
            value={formData.marketPrice}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            placeholder="Current market price"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Adding...' : 'Add Fertilizer'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddFertilizer;