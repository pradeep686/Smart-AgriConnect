import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyDiscussions = () => {
  const [discussions, setDiscussions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: '',
    image: null,
    currentImageUrl: '',
  });

  const token = localStorage.getItem('token'); // assuming auth token is stored here

  const fetchDiscussions = async () => {
    try {
      const res = await axios.get('http://localhost:9010/api/discussions/my-discussions', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDiscussions(res.data.data);
    } catch (err) {
      console.error('Error fetching discussions:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:9010/api/discussions/my/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDiscussions(discussions.filter(d => d._id !== id));
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleEdit = (disc) => {
    setEditingId(disc._id);
    setFormData({
      title: disc.title,
      content: disc.content,
      tags: disc.tags.join(', '),
      image: null,
      currentImageUrl: disc.image?.url || '',
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append('title', formData.title);
      form.append('content', formData.content);
      form.append('tags', formData.tags);

      if (formData.image) {
        form.append('image', formData.image);
      }

      await axios.put(`http://localhost:9010/api/discussions/my/${editingId}`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setEditingId(null);
      setFormData({
        title: '',
        content: '',
        tags: '',
        image: null,
        currentImageUrl: '',
      });
      fetchDiscussions();
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  useEffect(() => {
    fetchDiscussions();
  }, []);

  if (loading) return <p>Loading discussions...</p>;

  return (
    <div className="p-6 ml-100">
      <h2 className="text-2xl font-bold mb-4">My Discussions</h2>

      {discussions.map((disc) => (
        <div key={disc._id} className="border p-4 rounded mb-4 shadow-md">
          {disc.image?.url && (
            <img
              src={disc.image.url}
              alt="discussion"
              className="w-full max-w-xs mb-3 rounded cursor-pointer hover:scale-105 transition"
              onClick={() => window.open(disc.image.url, '_blank')}
            />
          )}
          <h3 className="text-xl font-semibold">{disc.title}</h3>
          <p className="text-gray-600">{disc.content}</p>
          <div className="text-sm text-blue-500 mt-1">Tags: {disc.tags.join(', ')}</div>
          <div className="mt-3 space-x-2">
            <button
              onClick={() => handleEdit(disc)}
              className="bg-yellow-500 px-3 py-1 text-white rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(disc._id)}
              className="bg-red-600 px-3 py-1 text-white rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {editingId && (
        <form onSubmit={handleUpdate} className="border p-4 mt-6 rounded shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Edit Discussion</h3>

          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={e => setFormData({ ...formData, title: e.target.value })}
            className="block w-full border mb-2 p-2"
          />

          <textarea
            placeholder="Content"
            value={formData.content}
            onChange={e => setFormData({ ...formData, content: e.target.value })}
            className="block w-full border mb-2 p-2"
          />

          <input
            type="text"
            placeholder="Tags (comma separated)"
            value={formData.tags}
            onChange={e => setFormData({ ...formData, tags: e.target.value })}
            className="block w-full border mb-2 p-2"
          />

          <input
            type="file"
            accept="image/*"
            onChange={e => setFormData({ ...formData, image: e.target.files[0] })}
            className="block w-full border mb-2 p-2"
          />

          {formData.currentImageUrl && (
            <div>
              <p className="text-sm text-gray-600 mb-1">Current Image:</p>
              <img
                src={formData.currentImageUrl}
                alt="current"
                className="w-40 mb-2 rounded cursor-pointer hover:scale-105 transition"
                onClick={() => window.open(formData.currentImageUrl, '_blank')}
              />
            </div>
          )}

          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
            Update
          </button>
          <button
            onClick={() => setEditingId(null)}
            type="button"
            className="ml-2 text-gray-600"
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default MyDiscussions;
