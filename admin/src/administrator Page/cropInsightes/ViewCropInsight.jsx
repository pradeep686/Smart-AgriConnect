import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ViewCropInsight() {
  const [cropInsights, setCropInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingInsight, setEditingInsight] = useState(null);
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
  const [expanded, setExpanded] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    fetchCropInsights();
  }, []);

  const fetchCropInsights = async () => {
    try {
      const response = await axios.get('http://localhost:9010/api/cropInsight/get');
      setCropInsights(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleEditClick = (insight) => {
    setEditingInsight(insight._id);
    setFormData({
      category: insight.category,
      name: insight.name,
      description: insight.description,
      scintificName: insight.scintificName,
      soilType: insight.soilType,
      yieldPricePerAcer: insight.yieldPricePerAcer,
      uses: insight.uses,
      nutritionlValue: insight.nutritionlValue,
      image: null
    });
    setImagePreview(insight.image);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleEditSubmit = async (id) => {
    try {
      const formDataToSend = new FormData();
      
      // Append all fields to FormData
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null && formData[key] !== undefined) {
          formDataToSend.append(key, formData[key]);
        }
      });

      await axios.put(`http://localhost:9010/api/cropInsight/edit/${id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      await fetchCropInsights();
      alert('Crop insight updated successfully');
      setEditingInsight(null);
      setImagePreview(null);
    } catch (error) {
      alert('Error updating crop insight: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this crop insight?')) {
      try {
        await axios.delete(`http://localhost:9010/api/cropInsight/delete/${id}`);
        setCropInsights(cropInsights.filter(insight => insight._id !== id));
        alert('Crop insight deleted successfully');
      } catch (error) {
        alert('Error deleting crop insight: ' + (error.response?.data?.error || error.message));
      }
    }
  };

  const toggleExpand = (id) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  if (loading) return <div className="text-center py-8"><p>Loading crop insights...</p></div>;
  if (error) return <div className="text-center py-8 text-red-500"><p>Error: {error}</p></div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Manage Crop Insights</h1>
      
      {cropInsights.length === 0 && !loading && (
        <div className="text-center py-8">
          <p>No crop insights found.</p>
        </div>
      )}

      <div className="space-y-6">
        {cropInsights.map((insight) => (
          <div key={insight._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {editingInsight === insight._id ? (
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">Edit Crop Insight</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category*</label>
                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name*</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description*</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded"
                      rows="3"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Scientific Name</label>
                    <input
                      type="text"
                      name="scintificName"
                      value={formData.scintificName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Soil Type</label>
                    <input
                      type="text"
                      name="soilType"
                      value={formData.soilType}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Yield Price Per Acre</label>
                    <input
                      type="text"
                      name="yieldPricePerAcer"
                      value={formData.yieldPricePerAcer}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Uses</label>
                    <textarea
                      name="uses"
                      value={formData.uses}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded"
                      rows="3"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nutritional Value</label>
                    <textarea
                      name="nutritionlValue"
                      value={formData.nutritionlValue}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded"
                      rows="3"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                    {imagePreview && (
                      <div className="mb-2">
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="w-32 h-32 object-contain border rounded"
                        />
                      </div>
                    )}
                    <input
                      type="file"
                      name="image"
                      onChange={handleImageChange}
                      className="w-full px-3 py-2 border rounded"
                      accept="image/*"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setEditingInsight(null)}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleEditSubmit(insight._id)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold">{insight.name}</h2>
                    <p className="text-gray-600"><span className="font-semibold">Category:</span> {insight.category}</p>
                    <p className="mt-2"><span className="font-semibold">Description:</span> {insight.description}</p>
                  </div>
                  {insight.image && (
                    <img 
                      src={insight.image} 
                      alt={insight.name} 
                      className="w-32 h-32 object-contain border rounded"
                    />
                  )}
                </div>

                {expanded[insight._id] && (
                  <div className="mt-4 space-y-3">
                    <p><span className="font-semibold">Scientific Name:</span> {insight.scintificName}</p>
                    <p><span className="font-semibold">Soil Type:</span> {insight.soilType}</p>
                    <p><span className="font-semibold">Yield Price Per Acre:</span> {insight.yieldPricePerAcer}</p>
                    <p><span className="font-semibold">Uses:</span> {insight.uses}</p>
                    <p><span className="font-semibold">Nutritional Value:</span> {insight.nutritionlValue}</p>
                  </div>
                )}

                <div className="mt-4 flex justify-between items-center">
                  <button
                    onClick={() => toggleExpand(insight._id)}
                    className="text-blue-600 hover:underline"
                  >
                    {expanded[insight._id] ? 'Show Less' : 'Show More'}
                  </button>
                  <div className="space-x-2">
                    <button
                      onClick={() => handleEditClick(insight)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(insight._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewCropInsight;