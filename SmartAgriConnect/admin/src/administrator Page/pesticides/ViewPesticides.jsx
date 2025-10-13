import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ViewPesticides() {

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    composition: '',
    usage: '',
    suitableCrops: '',
    benefits: '',
    marketPrice: '',
    image: null
  });
  const [expanded, setExpanded] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:9010/api/pesticide/get');
      setProducts(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product._id);
    setFormData({
      composition: product.composition,
      usage: product.usage,
      suitableCrops: product.suitableCrops,
      benefits: product.benefits,
      marketPrice: product.marketPrice,
      image: null
    });
    setImagePreview(product.images);
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

      await axios.put(`http://localhost:9010/api/pesticide/edit/${id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      await fetchProducts();
      alert('Product updated successfully');
      setEditingProduct(null);
      setImagePreview(null);
    } catch (error) {
      alert('Error updating product: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`http://localhost:9010/api/pesticide/delete/${id}`);
        setProducts(products.filter(product => product._id !== id));
        alert('Product deleted successfully');
      } catch (error) {
        alert('Error deleting product: ' + (error.response?.data?.error || error.message));
      }
    }
  };

  const toggleExpand = (id) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  if (loading) return <div className="text-center py-8"><p>Loading products...</p></div>;
  if (error) return <div className="text-center py-8 text-red-500"><p>Error: {error}</p></div>;

  return (
    <div className="container mx-auto px-4 py-8">

<button
      onClick={() => navigate("/add-pesticides")}
      className="relative px-6 py-3 font-semibold text-white transition duration-300 ease-in-out bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-xl active:scale-95"
    >
      Add Pesticide
    </button>
     <h1 className="text-3xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-900 drop-shadow-md animate-fadeIn">
     Manage Pesticide Products
</h1>
      
      
      {products.length === 0 && !loading && (
        <div className="text-center py-8">
          <p>No products found.</p>
        </div>
      )}

      <div className="space-y-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {editingProduct === product._id ? (
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">Edit Product</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Composition*</label>
                    <input
                      type="text"
                      name="composition"
                      value={formData.composition}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Usage*</label>
                    <input
                      type="text"
                      name="usage"
                      value={formData.usage}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Suitable Crops*</label>
                    <input
                      type="text"
                      name="suitableCrops"
                      value={formData.suitableCrops}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Benefits*</label>
                    <textarea
                      name="benefits"
                      value={formData.benefits}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded"
                      rows="3"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Market Price*</label>
                    <input
                      type="text"
                      name="marketPrice"
                      value={formData.marketPrice}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded"
                      required
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
                    onClick={() => setEditingProduct(null)}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleEditSubmit(product._id)}
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
                    <h2 className="text-xl font-bold">{product.composition}</h2>
                    <p className="text-gray-600"><span className="font-semibold">Usage:</span> {product.usage}</p>
                    <p className="mt-2"><span className="font-semibold">Suitable Crops:</span> {product.suitableCrops}</p>
                  </div>
                  {product.images && (
                    <img 
                      src={product.images} 
                      alt={product.composition} 
                      className="w-32 h-32 object-contain border rounded"
                    />
                  )}
                </div>

                {expanded[product._id] && (
                  <div className="mt-4 space-y-3">
                    <p><span className="font-semibold">Benefits:</span> {product.benefits}</p>
                    <p><span className="font-semibold">Market Price:</span> {product.marketPrice}</p>
                  </div>
                )}

                <div className="mt-4 flex justify-between items-center">
                  <button
                    onClick={() => toggleExpand(product._id)}
                    className="text-blue-600 hover:underline"
                  >
                    {expanded[product._id] ? 'Show Less' : 'Show More'}
                  </button>
                  <div className="space-x-2">
                    <button
                      onClick={() => handleEditClick(product)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
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

export default ViewPesticides;