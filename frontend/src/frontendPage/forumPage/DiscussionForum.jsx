import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPlus, FaReply, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import axios from "axios";

// Set the base URL for API requests
const API_BASE_URL = "http://localhost:9010/api";

const DiscussionForum = () => {
  const [discussions, setDiscussions] = useState([]);
  const [filteredDiscussions, setFilteredDiscussions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [view, setView] = useState("all"); // 'all' or 'my'
  const [searchTerm, setSearchTerm] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [editingDiscussion, setEditingDiscussion] = useState(null);
  const [currentUser, setCurrentUser] = useState({ id: "123", name: "Current User" }); // Mock user - replace with your auth
  
  const [newDiscussion, setNewDiscussion] = useState({
    title: "",
    tags: "",
    content: "",
    image: null,
    imageFile: null
  });

  const [newReply, setNewReply] = useState({ content: "" });

  // Fetch discussions based on view
  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        const endpoint = view === "my" 
          ? `${API_BASE_URL}/discussions/my-discussions` 
          : `${API_BASE_URL}/discussions`;
        
        const { data } = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` // Add if using JWT
          }
        });
        setDiscussions(data.data || data); // Adjust based on your API response
        setFilteredDiscussions(data.data || data);
      } catch (error) {
        console.error("Error fetching discussions:", error);
      }
    };

    fetchDiscussions();
  }, [view]);

  // Filter discussions based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredDiscussions(discussions);
    } else {
      const filtered = discussions.filter(discussion => 
        discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        discussion.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (discussion.tags && discussion.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))) ||
        discussion.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredDiscussions(filtered);
    }
  }, [searchTerm, discussions]);

  // Handle new discussion submission
  const handlePostDiscussion = async () => {
    if (!newDiscussion.title || !newDiscussion.content) return;

    try {
      const formData = new FormData();
      formData.append("title", newDiscussion.title);
      formData.append("tags", newDiscussion.tags);
      formData.append("content", newDiscussion.content);
      if (newDiscussion.imageFile) {
        formData.append("image", newDiscussion.imageFile);
      }

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      };

      const { data } = editingDiscussion 
        ? await axios.put(`${API_BASE_URL}/discussions/${editingDiscussion}`, formData, config)
        : await axios.post(`${API_BASE_URL}/discussions`, formData, config);

      if (editingDiscussion) {
        setDiscussions(discussions.map(d => d._id === editingDiscussion ? data.data : d));
      } else {
        setDiscussions([data.data, ...discussions]);
      }

      setShowForm(false);
      setNewDiscussion({
        title: "",
        tags: "",
        content: "",
        image: null,
        imageFile: null
      });
      setEditingDiscussion(null);
    } catch (error) {
      console.error("Error posting discussion:", error);
    }
  };

  // Handle reply submission
  const handlePostReply = async (discussionId) => {
    if (!newReply.content) return;
    
    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/discussions/${discussionId}/replies`,
        { content: newReply.content },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      setDiscussions(discussions.map(discussion => 
        discussion._id === discussionId ? data.data : discussion
      ));

      setReplyingTo(null);
      setNewReply({ content: "" });
    } catch (error) {
      console.error("Error posting reply:", error);
    }
  };

  // Handle discussion deletion
  const handleDeleteDiscussion = async (id) => {
    if (window.confirm("Are you sure you want to delete this discussion?")) {
      try {
        await axios.delete(`${API_BASE_URL}/discussions/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setDiscussions(discussions.filter(d => d._id !== id));
      } catch (error) {
        console.error("Error deleting discussion:", error);
      }
    }
  };

  // Handle discussion edit
  const handleEditDiscussion = (discussion) => {
    setEditingDiscussion(discussion._id);
    setNewDiscussion({
      title: discussion.title,
      tags: discussion.tags ? discussion.tags.join(",") : "",
      content: discussion.content,
      image: discussion.image?.url || null,
      imageFile: null
    });
    setShowForm(true);
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewDiscussion(prev => ({
        ...prev,
        image: imageUrl,
        imageFile: file
      }));
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      {/* Header and Search */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
              📝 Discussion Forum
            </h2>
            <motion.p
              className="mt-2 text-sm font-bold text-pink-600"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 10, opacity: 1 }}
              transition={{ repeat: Infinity, repeatType: "reverse", duration: 5 }}
            >
              A Community for Farmers, By Farmers – Share & Learn Together!
            </motion.p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search by title, tags or author..."
                className="w-full bg-white/30 backdrop-blur-lg text-gray-800 placeholder-gray-600 border border-gray-300 rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-gray-500 shadow-lg transition-all duration-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setView("all")}
                className={`px-4 py-2 rounded-full ${view === "all" ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                All Discussions
              </button>
              
            </div>
          </div>
        </div>
      </div>

      {/* Discussions List */}
      <div className="mt-6 space-y-6">
        {filteredDiscussions.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">No discussions found. Start a new one!</p>
          </div>
        ) : (
          filteredDiscussions.map((discussion) => (
            <div key={discussion._id} className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-xl text-orange-600">{discussion.title}</h3>
                {view === "my" && discussion.user === currentUser.id && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditDiscussion(discussion)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteDiscussion(discussion._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </div>
                )}
              </div>

              {discussion.tags && discussion.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {discussion.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                      onClick={() => setSearchTerm(tag)}
                      style={{ cursor: 'pointer' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <p style={{ whiteSpace: "pre-line" }} className="text-gray-700 mt-4">
                {discussion.content}
              </p>

              {discussion.image?.url && (
                <img 
                  src={discussion.image.url} 
                  alt="Discussion" 
                  className="mt-4 w-full max-w-md h-auto object-cover rounded-lg shadow-md"
                />
              )}

              <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                <span className="text-sm text-gray-500">
                  Posted by {discussion.name || "Unknown"} • {new Date(discussion.createdAt).toLocaleDateString()}
                </span>
                <button
                  onClick={() => setReplyingTo(replyingTo === discussion._id ? null : discussion._id)}
                  className="flex items-center gap-1 bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 transition-colors"
                >
                  <FaReply size={14} /> <span>Reply</span>
                </button>
              </div>

              {/* Reply Form */}
              {replyingTo === discussion._id && (
                <div className="mt-4 p-4 bg-gray-50 rounded-md">
                  <textarea
                    placeholder="Write your reply..."
                    className="border p-2 rounded w-full"
                    rows="3"
                    value={newReply.content}
                    onChange={(e) => setNewReply({ content: e.target.value })}
                  ></textarea>
                  <div className="flex justify-end gap-2 mt-2">
                    <button
                      onClick={() => setReplyingTo(null)}
                      className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handlePostReply(discussion._id)}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Post Reply
                    </button>
                  </div>
                </div>
              )}

              {/* Replies Section */}
              {discussion.replies && discussion.replies.length > 0 && (
                <details className="mt-4">
                  <summary className="text-blue-600 cursor-pointer font-medium">
                    View {discussion.replies.length} {discussion.replies.length === 1 ? 'Reply' : 'Replies'}
                  </summary>
                  <div className="mt-3 space-y-3 pl-4 border-l-2 border-gray-200">
                    {discussion.replies.map((reply) => (
                      <div key={reply._id} className="bg-gray-50 p-3 rounded-md">
                        <div className="flex justify-between items-start">
                          <strong className="text-green-600">{reply.name}</strong>
                          <span className="text-xs text-gray-500">
                            {new Date(reply.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <p style={{ whiteSpace: "pre-line" }} className="mt-1 text-gray-700">
                          {reply.content}
                        </p>
                      </div>
                    ))}
                  </div>
                </details>
              )}
            </div>
          ))
        )}
      </div>

      {/* Add Discussion Floating Button */}
      <motion.button
        onClick={() => setShowForm(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-10 right-10 bg-green-500 text-white text-3xl rounded-full p-4 shadow-lg w-14 h-14 flex items-center justify-center hover:bg-green-600 transition-colors z-10"
      >  
        <FaPlus size={20} />
      </motion.button>

      {/* Discussion Form Modal */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-orange-600">
              {editingDiscussion ? "Edit Discussion" : "Start a Discussion"}
            </h2>
            
            <div className="mt-4 space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  placeholder="Enter discussion title"
                  className="border p-2 rounded w-full"
                  value={newDiscussion.title}
                  onChange={(e) => setNewDiscussion({...newDiscussion, title: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
                <input
                  type="text"
                  placeholder="e.g., Dairy Farming, Cattle Health"
                  className="border p-2 rounded w-full"
                  value={newDiscussion.tags}
                  onChange={(e) => setNewDiscussion({...newDiscussion, tags: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                <textarea
                  placeholder="Write your discussion..."
                  className="border p-2 rounded w-full"
                  rows="5"
                  value={newDiscussion.content}
                  onChange={(e) => setNewDiscussion({...newDiscussion, content: e.target.value})}
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image (optional)
                </label>
                <input
                  type="file"
                  className="mt-1 block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-green-50 file:text-green-700
                    hover:file:bg-green-100"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {newDiscussion.image && (
                  <div className="mt-3">
                    <img
                      src={newDiscussion.image}
                      alt="Preview"
                      className="w-40 h-40 object-cover rounded-lg shadow-md"
                    />
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingDiscussion(null);
                  setNewDiscussion({
                    title: "",
                    tags: "",
                    content: "",
                    image: null,
                    imageFile: null
                  });
                }}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handlePostDiscussion}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                {editingDiscussion ? "Update Discussion" : "Post Discussion"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiscussionForum;