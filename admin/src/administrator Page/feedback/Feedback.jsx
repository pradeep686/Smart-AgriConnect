import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  // Fetch unresolved feedbacks
  useEffect(() => {
    axios.get("http://localhost:9010/api/feedback/all")
      .then((response) => {
        setFeedbacks(response.data.filter(fb => !fb.resolved));
      })
      .catch((error) => {
        console.error("Error fetching feedbacks:", error);
      });
  }, []);

  // Mark feedback as resolved
  const markAsResolved = (id) => {
    axios.put(`http://localhost:9010/api/feedback/resolve/${id}`)
      .then(() => {
        setFeedbacks(prevFeedbacks => prevFeedbacks.filter(fb => fb._id !== id));
      })
      .catch((error) => {
        console.error("Error resolving feedback:", error);
      });
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">

        <button className="bg-pink-500 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition-transform transform hover:scale-105 hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
  <Link to="/ResolvedFeedback" className="flex items-center gap-2">
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
    </svg>
    Resolved Feedback
  </Link>
</button>

      <h2 className="text-3xl font-bold text-center text-gray-800">Unresolved Feedback</h2>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {feedbacks.length > 0 ? feedbacks.map((fb) => (
          <div key={fb._id} className="bg-white p-4 shadow-lg rounded-lg">
            <p><strong>Name:</strong> {fb.name}</p>
            <p><strong>Email:</strong> {fb.email}</p>
            <p><strong>Category:</strong> {fb.category}</p>
            <p><strong>Description:</strong> {fb.description}</p>
            <p><strong>Rating:</strong> {fb.rating} ⭐</p>
            <button
              onClick={() => markAsResolved(fb._id)}
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              Mark as Resolved
            </button>
          </div>
        )) : <p className="text-center text-gray-600">No pending feedbacks.</p>}
      </div>
    </div>
  );
};

export default Feedback;
