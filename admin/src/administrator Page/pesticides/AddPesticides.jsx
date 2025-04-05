import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddPesticide() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    composition: '',
    usage: '',
    suitableCrops: '',
    benefits: '',
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
      formDataToSend.append('composition', formData.composition);
      formDataToSend.append('usage', formData.usage);
      formDataToSend.append('suitableCrops', formData.suitableCrops);
      formDataToSend.append('benefits', formData.benefits);
      formDataToSend.append('marketPrice', formData.marketPrice);
      if (formData.image) {
        formDataToSend.append('images', formData.image); // Note: matches your backend field name
      }

      const response = await axios.post('http://localhost:9010/api/pesticide/add', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.message) {
        alert('Pesticide added successfully!');
        setFormData({
          composition: '',
          usage: '',
          suitableCrops: '',
          benefits: '',
          marketPrice: '',
          image: null
        });
        setPreviewImage(null);
        navigate('/pesticides'); // Redirect after successful submission
      }
    } catch (err) {
      setError(err.response?.data?.error || err.message);
      console.error('Error adding pesticide:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-8xl">

  <button
      onClick={() => navigate("/view-pesticides")}
      className="relative px-6 py-3 font-semibold text-white transition duration-300 ease-in-out bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-xl active:scale-95"
    >
      Manage Pesticides
    </button>
      
      
      
      <h1 className="text-3xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-900 drop-shadow-md animate-fadeIn">
      Add New Pesticide
</h1>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
          <p className="font-medium">Error:</p>
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        {/* Image Upload */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Pesticide Image*</label>
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
              <p className="mt-1 text-xs text-gray-500">Upload an image of the pesticide</p>
            </div>
            {previewImage && (
              <div className="w-24 h-24 border rounded-md overflow-hidden">
                <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </div>

        {/* Composition */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            name="composition"
            value={formData.composition}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            required
            placeholder="Enter Name"
          />
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
            placeholder="How to use the pesticide"
          />
        </div>

        {/* Suitable Crops */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Suitable Crops*</label>
          <textarea
            type="text"
            name="suitableCrops"
            value={formData.suitableCrops}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            placeholder="Which crops this pesticide is suitable for"
          />
        </div>

        {/* Benefits */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Benefits*</label>
          <textarea
            name="benefits"
            value={formData.benefits}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            required
            placeholder="Benefits of using this pesticide"
          />
        </div>

        {/* Market Price */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Market Price*</label>
          <textarea
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
        <div className="flex justify-center h-11">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Adding...' : 'Add Pesticide'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddPesticide;