import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function AddSubsidies() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    category: '',
    subsidyName: '',
    shortInfo: '',
    briefInfo: '',
    objective: '',
    eligibility: {
      whoCanApply: [],
      whoCannotApply: []
    },
    benefits: [],
    documentsRequired: [],
    applicationProcess: [],
    beneficiaryStatus: [],
    importantConsiderations: [],
    officialWebsite: '',
    image: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEligibilityChange = (e) => {
    const { name, value } = e.target;
    const arrayValue = value.split('\n').filter(item => item.trim() !== '');
    
    setFormData(prev => ({
      ...prev,
      eligibility: {
        ...prev.eligibility,
        [name]: arrayValue
      }
    }));
  };

  const handleArrayInputChange = (e) => {
    const { name, value } = e.target;
    const arrayValue = value.split('\n').filter(item => item.trim() !== '');
    setFormData(prev => ({ ...prev, [name]: arrayValue }));
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
      
      // Append all fields except eligibility
      Object.keys(formData).forEach(key => {
        if (key !== 'eligibility' && formData[key] !== null && formData[key] !== undefined) {
          if (Array.isArray(formData[key])) {
            formDataToSend.append(key, JSON.stringify(formData[key]));
          } else {
            formDataToSend.append(key, formData[key]);
          }
        }
      });

      // Append eligibility separately
      formDataToSend.append('eligibility', JSON.stringify(formData.eligibility));

      const response = await axios.post('http://localhost:9010/api/subsidie/add', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.message) {
        alert('Subsidy added successfully!');
        setFormData({
          category: '',
          subsidyName: '',
          shortInfo: '',
          briefInfo: '',
          objective: '',
          eligibility: {
            whoCanApply: [],
            whoCannotApply: []
          },
          benefits: [],
          documentsRequired: [],
          applicationProcess: [],
          beneficiaryStatus: [],
          importantConsiderations: [],
          officialWebsite: '',
          image: null
        });
        setPreviewImage(null);
      }
    } catch (err) {
      setError(err.response?.data?.error || err.message);
      console.error('Error adding subsidy:', err);
    } finally {
      setLoading(false);
    }
  };

  const displayArrayField = (array) => {
    return array ? array.join('\n') : '';
  };

  return (
<div>

 
    <button className="relative  px-6 py-3 font-semibold text-white transition-all duration-300 ease-in-out bg-blue-600 rounded-lg shadow-lg hover:bg-blue-600 hover:shadow-xl active:scale-95 group">
  <Link to="/all-subsidies" className="flex items-center gap-2">
    View Subsidies List 📋
  </Link>
</button>

      <h1 className="text-3xl font-bold text-center mb-8 text-green-700">📝 Add New Subsidy</h1>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
          <p className="font-medium">Error:</p>
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg mb-6">
        {/* Image Upload */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Subsidy Image*</label>
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
              <p className="mt-1 text-xs text-gray-500">Upload an image for the subsidy</p>
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
  <label className="block text-sm font-medium text-gray-700 mb-1">Category*</label>
  <select
    name="category"
    value={formData.category}
    onChange={handleInputChange}
    className="w-full px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white cursor-pointer"
    required
  >
    <option value="" disabled>Select a category</option>
    {[
      "Crops Subsidy",
      "Fertilizer & Pesticides Subsidy",
      "Irrigation Subsidy",
      "Equipment Subsidy",
      "Credit Subsidy",
      "Price Support Subsidies",
      "Power Subsidy",
      "Export & Import Subsidies",
      "Organic Farming Subsidy",
      "Infrastructure Development Subsidies",
    ].map((title) => (
      <option key={title} value={title}>
        {title}
      </option>
    ))}
  </select>
</div>


          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subsidy Name*</label>
            <input
              type="text"
              name="subsidyName"
              value={formData.subsidyName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
        </div>

        {/* Text Information */}
        <div className="space-y-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Short Info*</label>
            <textarea
              name="shortInfo"
              value={formData.shortInfo}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              rows="3"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Brief Info</label>
            <textarea
              name="briefInfo"
              value={formData.briefInfo}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              rows="4"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Objective</label>
            <textarea
              name="objective"
              value={formData.objective}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              rows="3"
            />
          </div>
        </div>

        {/* Eligibility Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Who Can Apply (one per line)*</label>
            <textarea
              name="whoCanApply"
              value={displayArrayField(formData.eligibility.whoCanApply)}
              onChange={handleEligibilityChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              rows="5"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Who Cannot Apply (one per line)*</label>
            <textarea
              name="whoCannotApply"
              value={displayArrayField(formData.eligibility.whoCannotApply)}
              onChange={handleEligibilityChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              rows="5"
              required
            />
          </div>
        </div>

        {/* Other Array Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Benefits (one per line)</label>
            <textarea
              name="benefits"
              value={displayArrayField(formData.benefits)}
              onChange={handleArrayInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              rows="5"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Documents Required (one per line)</label>
            <textarea
              name="documentsRequired"
              value={displayArrayField(formData.documentsRequired)}
              onChange={handleArrayInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              rows="5"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Application Process (one per line)</label>
            <textarea
              name="applicationProcess"
              value={displayArrayField(formData.applicationProcess)}
              onChange={handleArrayInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              rows="5"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Beneficiary Status (one per line)</label>
            <textarea
              name="beneficiaryStatus"
              value={displayArrayField(formData.beneficiaryStatus)}
              onChange={handleArrayInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              rows="5"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Important Considerations (one per line)</label>
            <textarea
              name="importantConsiderations"
              value={displayArrayField(formData.importantConsiderations)}
              onChange={handleArrayInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              rows="5"
            />
          </div>
        </div>

        {/* Website */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Official Website</label>
          <input
            type="url"
            name="officialWebsite"
            value={formData.officialWebsite}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="https://example.com"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="px-25 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Adding...' : 'Add Subsidy'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddSubsidies;