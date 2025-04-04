import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ShowSubsidies() {
  const [subsidies, setSubsidies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingSubsidy, setEditingSubsidy] = useState(null);
  const [formData, setFormData] = useState({
    subsidyName: '',
    category: '',
    shortInfo: '',
    briefInfo: '',
    objective: '',
    eligibility: '',
    benefits: '',
    documentsRequired: '',
    applicationProcess: '',
    beneficiaryStatus: '',
    importantConsiderations: '',
    officialWebsite: '',
    image: null
  });
  const [expanded, setExpanded] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    fetchSubsidies();
  }, []);

  const fetchSubsidies = async () => {
    try {
      const response = await axios.get('http://localhost:9010/api/subsidie/get');
      setSubsidies(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleEditClick = (subsidy) => {
    setEditingSubsidy(subsidy._id);
    setFormData({
      subsidyName: subsidy.subsidyName,
      category: subsidy.category,
      shortInfo: subsidy.shortInfo,
      briefInfo: subsidy.briefInfo,
      objective: subsidy.objective,
      eligibility: subsidy.eligibility,
      benefits: subsidy.benefits,
      documentsRequired: subsidy.documentsRequired,
      applicationProcess: subsidy.applicationProcess,
      beneficiaryStatus: subsidy.beneficiaryStatus,
      importantConsiderations: subsidy.importantConsiderations,
      officialWebsite: subsidy.officialWebsite,
      image: null
    });
    setImagePreview(subsidy.image);
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

      await axios.put(`http://localhost:9010/api/subsidie/edit/${id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      await fetchSubsidies();
      alert('Subsidy updated successfully');
      setEditingSubsidy(null);
      setImagePreview(null);
    } catch (error) {
      alert('Error updating subsidy: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this subsidy?')) {
      try {
        await axios.delete(`http://localhost:9010/api/subsidie/delete/${id}`);
        setSubsidies(subsidies.filter(subsidy => subsidy._id !== id));
        alert('Subsidy deleted successfully');
      } catch (error) {
        alert('Error deleting subsidy: ' + (error.response?.data?.error || error.message));
      }
    }
  };

  const toggleExpand = (id) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  if (loading) return <div className="text-center py-8"><p>Loading subsidies...</p></div>;
  if (error) return <div className="text-center py-8 text-red-500"><p>Error: {error}</p></div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Manage Subsidies</h1>
      
      {subsidies.length === 0 && !loading && (
        <div className="text-center py-8">
          <p>No subsidies found.</p>
        </div>
      )}

      <div className="space-y-6">
        {subsidies.map((subsidy) => (
          <div key={subsidy._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {editingSubsidy === subsidy._id ? (
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">Edit Subsidy</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subsidy Name*</label>
                    <input
                      type="text"
                      name="subsidyName"
                      value={formData.subsidyName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </div>
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
                </div>

                <div className="space-y-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Short Info*</label>
                    <textarea
                      name="shortInfo"
                      value={formData.shortInfo}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded"
                      rows="2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Brief Info</label>
                    <textarea
                      name="briefInfo"
                      value={formData.briefInfo}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded"
                      rows="3"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Objective</label>
                    <textarea
                      name="objective"
                      value={formData.objective}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded"
                      rows="2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Eligibility</label>
                    <textarea
                      name="eligibility"
                      value={formData.eligibility}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded"
                      rows="3"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Benefits</label>
                    <textarea
                      name="benefits"
                      value={formData.benefits}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded"
                      rows="3"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Documents Required</label>
                    <textarea
                      name="documentsRequired"
                      value={formData.documentsRequired}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded"
                      rows="3"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Application Process</label>
                    <textarea
                      name="applicationProcess"
                      value={formData.applicationProcess}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded"
                      rows="3"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Beneficiary Status</label>
                    <textarea
                      name="beneficiaryStatus"
                      value={formData.beneficiaryStatus}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded"
                      rows="2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Important Considerations</label>
                    <textarea
                      name="importantConsiderations"
                      value={formData.importantConsiderations}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded"
                      rows="2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Official Website</label>
                    <input
                      type="url"
                      name="officialWebsite"
                      value={formData.officialWebsite}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded"
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
                    onClick={() => setEditingSubsidy(null)}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleEditSubmit(subsidy._id)}
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
                    <h2 className="text-xl font-bold">{subsidy.subsidyName}</h2>
                    <p className="text-gray-600"><span className="font-semibold">Category:</span> {subsidy.category}</p>
                    <p className="mt-2"><span className="font-semibold">Short Info:</span> {subsidy.shortInfo}</p>
                  </div>
                  {subsidy.image && (
                    <img 
                      src={subsidy.image} 
                      alt={subsidy.subsidyName} 
                      className="w-32 h-32 object-contain border rounded"
                    />
                  )}
                </div>

                {expanded[subsidy._id] && (
                  <div className="mt-4 space-y-3">
                    <p><span className="font-semibold">Brief Info:</span> {subsidy.briefInfo}</p>
                    <p><span className="font-semibold">Objective:</span> {subsidy.objective}</p>
                    <p><span className="font-semibold">Eligibility:</span> {subsidy.eligibility}</p>
                    <p><span className="font-semibold">Benefits:</span> {subsidy.benefits}</p>
                    <p><span className="font-semibold">Documents Required:</span> {subsidy.documentsRequired}</p>
                    <p><span className="font-semibold">Application Process:</span> {subsidy.applicationProcess}</p>
                    <p><span className="font-semibold">Beneficiary Status:</span> {subsidy.beneficiaryStatus}</p>
                    <p><span className="font-semibold">Important Considerations:</span> {subsidy.importantConsiderations}</p>
                    {subsidy.officialWebsite && (
                      <p>
                        <span className="font-semibold">Official Website:</span>{' '}
                        <a 
                          href={subsidy.officialWebsite} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {subsidy.officialWebsite}
                        </a>
                      </p>
                    )}
                  </div>
                )}

                <div className="mt-4 flex justify-between items-center">
                  <button
                    onClick={() => toggleExpand(subsidy._id)}
                    className="text-blue-600 hover:underline"
                  >
                    {expanded[subsidy._id] ? 'Show Less' : 'Show More'}
                  </button>
                  <div className="space-x-2">
                    <button
                      onClick={() => handleEditClick(subsidy)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(subsidy._id)}
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

export default ShowSubsidies;