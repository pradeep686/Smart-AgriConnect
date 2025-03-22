import React, { useState } from "react";
import { motion } from "framer-motion";

const categories = [
  "UI Design Issues",
  "Navigation Problems",
  "Bugs & Errors",
  "Content Issues",
  "Feature Requests",
  "Other"
];

const FeedbackPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (!name || !email || !selectedCategory || !description) {
      alert("Please fill in all fields before submitting.");
      return;
    }
    alert("Feedback submitted! Thank you.");
    setName("");
    setEmail("");
    setSelectedCategory(null);
    setDescription("");
  };

  return (
  
    <div className="flex pr-40 min-h-screen bg-gray-100">
      {/* Main Content (After Navbar) */}
      <div className="ml-64 pl-29 w-full min-h-screen flex items-center justify-center p-15">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-4xl"
        >
          <div className="bg-white shadow-2xl rounded-2xl p-6 w-full">
            <h2 className="text-3xl font-bold text-gray-800 text-center">Feedback</h2>
            <p className="text-gray-600 text-center mt-2">We value your feedback to improve our platform.</p>
            <div className="mt-4">
              <input 
                type="text" 
                placeholder="Your Name" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border-2 border-green-400 rounded-xl focus:ring-2  mb-4"
              />
              <input 
                type="email" 
                placeholder="Your Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border-2 border-green-400 rounded-xl focus:ring-2 mb-4"
              />
              <div className="flex flex-wrap gap-2 mb-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full border-2 text-black transition-all duration-300 ${selectedCategory === category ? 'bg-orange-500 text-white' : 'bg-white border-gray-400'}`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              <textarea 
                placeholder="Describe your issue or request..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 border-2 border-green-400 rounded-xl focus:ring-2  mb-4"
              />
              <button 
                onClick={handleSubmit}
                className="w-full !bg-orange-400 hover:bg-orange-600 text-white font-bold py-2 px-4 shadow-md transition-all duration-200 hover:scale-[1.02]"

              >
                Submit Feedback
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FeedbackPage;
