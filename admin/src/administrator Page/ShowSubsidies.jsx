import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { motion } from "framer-motion";


function ShowSubsidies() {

  const navigate = useNavigate();

    useEffect(() => {
      // Show the loader for 3 seconds before fetching weather data
      const timer = setTimeout(() => {
        fetchWeatherData("Erode");
      }, 2500);
  
      return () => clearTimeout(timer); // Cleanup on unmount
    }, []);


  const [subsidies, setSubsidies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingSubsidy, setEditingSubsidy] = useState(null);
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
  const [expanded, setExpanded] = useState({});

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
      subsidyName: subsidy.subsidyName || '',
      category: subsidy.category || '',
      shortInfo: subsidy.shortInfo || '',
      briefInfo: subsidy.briefInfo || '',
      objective: subsidy.objective || '',
      eligibility: subsidy.eligibility || {
        whoCanApply: [],
        whoCannotApply: []
      },
      benefits: subsidy.benefits || [],
      documentsRequired: subsidy.documentsRequired || [],
      applicationProcess: subsidy.applicationProcess || [],
      beneficiaryStatus: subsidy.beneficiaryStatus || [],
      importantConsiderations: subsidy.importantConsiderations || [],
      officialWebsite: subsidy.officialWebsite || '',
      image: null
    });
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setFormData(prev => ({ ...prev, image: e.target.files[0] }));
  };

  const handleEditSubmit = async (id) => {
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null && formData[key] !== undefined) {
          formDataToSend.append(key, formData[key]);
        }
      });

      await axios.put(`http://localhost:9010/api/subsidie/edit/${id}`, formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      await fetchSubsidies();
      alert('Subsidy updated successfully');
      setEditingSubsidy(null);
    } catch (error) {
      alert('Error updating subsidy: ' + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this subsidy?')) {
      try {
        await axios.delete(`http://localhost:9010/api/subsidie/delete/${id}`);
        setSubsidies(subsidies.filter(subsidy => subsidy._id !== id));
        alert('Subsidy deleted successfully');
      } catch (error) {
        alert('Error deleting subsidy: ' + error.message);
      }
    }
  };

  const toggleExpand = (id) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

   {/* Glowing "Loading..." Text */}
     
  if (loading) return <p className="text-red-500 text-center">Loading... </p>;
  
  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;

  return (
    <div className="justify-center items-center min-h-screen w-full h-full">
  <div className="container mx-auto p-0 w-full max-w-xl">

  
  </div>
    <div className="container mx-auto  p-6">
    <button
      onClick={() => navigate("/add-subsidies")}
      className="relative px-6 py-3 font-semibold text-white transition-all duration-300 ease-in-out bg-teal-600 rounded-lg shadow-lg hover:bg-teal-700 hover:shadow-xl active:scale-95"
    >
      <span className="transition-transform transform group-hover:-translate-x-1 text-white">⬅</span>
    back
    </button>
      <h1 className="text-2xl font-bold text-center text-orange-600 mb-4">📋 Subsidies List</h1>
      {subsidies.map((subsidy) => (
        <div key={subsidy._id} className="bg-white p-6 rounded-lg shadow-lg mb-6">
          {editingSubsidy === subsidy._id ? (
            <div className="space-y-4">
              {/* Subsidy Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Subsidy Name*</label>
                <input required className="border p-2 w-full rounded" type="text" name="subsidyName" 
                  value={formData.subsidyName} onChange={handleInputChange} />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Category*</label>
                <input required className="border p-2 w-full rounded" type="text" name="category" 
                  value={formData.category} onChange={handleInputChange} />
              </div>

              {/* Short Info */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Short Info*</label>
                <textarea required className="border p-2 w-full rounded" name="shortInfo" rows="3"
                  value={formData.shortInfo} onChange={handleInputChange} />
              </div>

              {/* Brief Info */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Brief Info</label>
                <textarea className="border p-2 w-full rounded" name="briefInfo" rows="3"
                  value={formData.briefInfo} onChange={handleInputChange} />
              </div>

              {/* Objective */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Objective</label>
                <textarea className="border p-2 w-full rounded" name="objective" rows="3"
                  value={formData.objective} onChange={handleInputChange} />
              </div>

              {/* Eligibility */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Eligibility</label>
                <textarea className="border p-2 w-full rounded" name="eligibility" rows="3"
                  value={formData.eligibility} onChange={handleInputChange} />
              </div>

              {/* Benefits */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Benefits</label>
                <textarea className="border p-2 w-full rounded" name="benefits" rows="3"
                  value={formData.benefits} onChange={handleInputChange} />
              </div>

              {/* Documents Required */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Documents Required</label>
                <textarea className="border p-2 w-full rounded" name="documentsRequired" rows="3"
                  value={formData.documentsRequired} onChange={handleInputChange} />
              </div>

              {/* Application Process */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Application Process</label>
                <textarea className="border p-2 w-full rounded" name="applicationProcess" rows="3"
                  value={formData.applicationProcess} onChange={handleInputChange} />
              </div>

              {/* Beneficiary Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Beneficiary Status</label>
                <textarea className="border p-2 w-full rounded" name="beneficiaryStatus" rows="3"
                  value={formData.beneficiaryStatus} onChange={handleInputChange} />
              </div>

              {/* Important Considerations */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Important Considerations</label>
                <textarea className="border p-2 w-full rounded" name="importantConsiderations" rows="3"
                  value={formData.importantConsiderations} onChange={handleInputChange} />
              </div>

              {/* Official Website */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Official Website</label>
                <input className="border p-2 w-full rounded" type="text" name="officialWebsite" 
                  value={formData.officialWebsite} onChange={handleInputChange} />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Image</label>
                {subsidy.image && (
                  <div className="mb-2">
                    <p className="text-sm text-gray-500">Current Image:</p>
                    <img src={subsidy.image} alt="Current" className="w-48 h-32 object-contain" />
                  </div>
                )}
                <input className="border p-2 w-full rounded" type="file" name="image" 
                  accept="image/*" onChange={handleImageChange} />
              </div>

              <div className="flex justify-between pt-4">
                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded" 
                  onClick={() => handleEditSubmit(subsidy._id)}>
                  Save Changes
                </button>
                <button className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded" 
                  onClick={() => setEditingSubsidy(null)}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold">{subsidy.subsidyName}</h2>
                  <p className="text-gray-600"><strong>Category:</strong> {subsidy.category}</p>
                </div>
                {subsidy.image && (
                  <img src={subsidy.image} alt={subsidy.subsidyName} 
                    className="w-32 h-24 object-contain rounded" />
                )}
              </div>

              <p className="text-gray-700"><strong>Short Info:</strong> {subsidy.shortInfo}</p>

              {expanded[subsidy._id] && (
                <div className="space-y-3">
                  <p className="text-gray-700"><strong>Brief Info:</strong> {subsidy.briefInfo}</p>
                  <p className="text-gray-700"><strong>Objective:</strong> {subsidy.objective}</p>
                  <p className="text-gray-700"><strong>Eligibility:</strong> {subsidy.eligibility}</p>
                  <p className="text-gray-700"><strong>Benefits:</strong> {subsidy.benefits}</p>
                  <p className="text-gray-700"><strong>Documents Required:</strong> {subsidy.documentsRequired}</p>
                  <p className="text-gray-700"><strong>Application Process:</strong> {subsidy.applicationProcess}</p>
                  <p className="text-gray-700"><strong>Beneficiary Status:</strong> {subsidy.beneficiaryStatus}</p>
                  <p className="text-gray-700"><strong>Important Considerations:</strong> {subsidy.importantConsiderations}</p>
                  {subsidy.officialWebsite && (
                    <p className="text-gray-700">
                      <strong>Official Website:</strong>{' '}
                      <a href={subsidy.officialWebsite} target="_blank" rel="noopener noreferrer" 
                        className="text-blue-500 hover:underline">
                        {subsidy.officialWebsite}
                      </a>
                    </p>
                  )}
                </div>
              )}

              <div className="flex justify-between items-center pt-2">
                <button 
                  className="text-blue-500 hover:text-blue-700 font-medium"
                  onClick={() => toggleExpand(subsidy._id)}
                >
                  {expanded[subsidy._id] ? 'Show Less' : 'Show More'}
                </button>
                <div className="space-x-2">
                  <button 
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                    onClick={() => handleEditClick(subsidy)}
                  >
                    Edit
                  </button>
                  <button 
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                    onClick={() => handleDelete(subsidy._id)}
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