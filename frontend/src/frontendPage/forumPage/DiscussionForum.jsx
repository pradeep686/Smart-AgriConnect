import React, { useState , useEffect} from "react";
import { motion } from "framer-motion";
import { FaPlus, FaReply } from "react-icons/fa";

const DiscussionForum = () => {
  const [discussions, setDiscussions] = useState([
    {
      "id": 1,
      "name": "Pradeep",
      "title": "🐄 How to Improve Cattle Health & Boost Milk Production Naturally?",
      "tags": ["Dairy Farming", "Cattle Health", "Milk Production"],
      "content": "What are the best natural ways to improve cattle health and maximize milk production without synthetic supplements?",
      "image": "https://th.bing.com/th/id/OIP.eTOpV2CVtM8i_kJgkVAt9gHaE8?w=301&h=200&c=7&r=0&o=5&dpr=1.3&pid=1.7",
      "replies": [
        {
          "id": 101,
          "name": "Sukant_sakayam",
          "content": `✅ **Balanced Diet** – Provide green fodder, dry fodder, and mineral mixtures.  
  ✅ **Hydration** – Freshwater improves digestion & milk yield.  
  ✅ **Exercise** – Allow grazing for better health.  
  ✅ **Herbal Supplements** – Fenugreek & garlic enhance immunity.  
  ✅ **Hygienic Milking** – Reduces infections and stress.`,
          "timestamp": "2025-03-23 10:00 AM"
        }
      ]
    },
    {
      "id": 2,
      "name": "Naveen",
      "title": "🌾 Best Natural Methods to Protect Crops from Pests?",
      "tags": ["Crop Protection", "Organic Farming", "Sustainable Agriculture"],
      "content": "What are effective organic solutions to control pests without using chemical pesticides?",
      "image": "https://www.farmersalmanac.com/wp-content/uploads/2020/11/garden-pests-japanese-beetle-F_24851439.jpg",
      "replies": [
        {
          "id": 102,
          "name": "Sasvin_duraisingam",
          "content": `🐛 Neem Oil Spray – Repels aphids, caterpillars, and beetles.            
  🕷️ Beneficial Insects – Ladybugs & spiders control pests.  
  🔄 Crop Rotation** – Reduces pest infestations.  
  🌿 Companion Planting – Marigold, basil deter insects.  
  🎯 Organic Traps – Sticky & pheromone traps catch harmful bugs.`,
          "timestamp": "2025-03-23 10:00 AM"
        }
      ]
    }
  ]
  );

  
  

  const [showForm, setShowForm] = useState(false);
  const [newDiscussion, setNewDiscussion] = useState({
    name: "",
    title: "",
    tags: "",
    content: "",
    image: null,
  });

  const [replyingTo, setReplyingTo] = useState(null);
  const [newReply, setNewReply] = useState({ name: "", content: "" });

  // Handle new discussion submission
  const handlePostDiscussion = () => {
    if (!newDiscussion.name || !newDiscussion.title || !newDiscussion.content) return;
    setDiscussions([
      ...discussions,
      {
        id: discussions.length + 1,
        ...newDiscussion,
        tags: newDiscussion.tags.split(","),
        replies: [],
      },
    ]);
    setShowForm(false);
    setNewDiscussion({ name: "", title: "", tags: "", content: "", image: null });
  };

  // Handle reply submission
  const handlePostReply = (discussionId) => {
    if (!newReply.name || !newReply.content) return;
    
    const timestamp = new Date().toLocaleString();
  
    setDiscussions(
      discussions.map((discussion) =>
        discussion.id === discussionId
          ? { 
              ...discussion, 
              replies: [...discussion.replies, { id: Date.now(), ...newReply, timestamp }] 
            }
          : discussion
      )
    );
  
    setReplyingTo(null);
    setNewReply({ name: "", content: "" });
  };

  useEffect(() => {
    console.log("showForm:", showForm);
  }, [showForm]);

  return (

    

    
    
    <div className="w-full max-w-5xl mx-auto px-4">
{/* Search Bar */}

    <div className="mb-4">
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


    
<div className="flex justify-end mt-4">
  <div className="relative w-80">
    <input
      type="text"
      placeholder="Search..."
      className="w-full bg-white/30 backdrop-blur-lg text-gray-800 placeholder-gray-600 border border-gray-300 rounded-full py-3 pl-5 pr-12 focus:outline-none focus:ring-2 focus:ring-gray-500 shadow-lg transition-all duration-300"
    />
    <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-gray-700 to-black p-3 rounded-full flex items-center justify-center hover:scale-105 transition-all duration-300">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="white"
        className="w-5 h-5"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M15 10a5 5 0 1 1-10 0 5 5 0 0 1 10 0z" />
      </svg>
    </button>
  </div>
</div>



      {/* Discussions List */}
      <div className="mt-6 space-y-6">
        {discussions.map((discussion) => (
          <div key={discussion.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h3 className="font-bold text-xl text-orange-600">{discussion.title}</h3><br/>
            <p style={{ whiteSpace: "pre-line" }}  className="text-gray-700 ">{discussion.content}</p><br/>
            <img 
  src={discussion.image} 
  alt="Discussion" 
  className="mt-5 w-full max-w-md h-50 object-cover rounded-lg shadow-md"
/>

            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-white-500">Posted by {discussion.name}</span>
              <button
                onClick={() => setReplyingTo(discussion.id)}
                className="!bg-yellow-400 text-white  flex items-center space-x-1"
              >
                <FaReply /> <span>Reply</span>
              </button>
            </div>
            {/* Replies Section */}
            {replyingTo === discussion.id && (
              <div className="mt-4 p-3 bg-gray-200 rounded-md">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="border p-2 rounded w-full"
                  value={newReply.name}
                  onChange={(e) => setNewReply({ ...newReply, name: e.target.value })}
                />
                <textarea
                  placeholder="Your Reply"
                  className="border p-2 rounded w-full mt-2"
                  value={newReply.content}
                  onChange={(e) => setNewReply({ ...newReply, content: e.target.value })}
                ></textarea>
                <button
                  onClick={() => handlePostReply(discussion.id)}
                  className="mt-2 !bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Submit Reply
                </button>
              </div>
            )}
            {discussion.replies.length > 0 && (
              <details className="mt-2">
                <summary className="text-blue-600 cursor-pointer">View Replies ({discussion.replies.length})</summary>
                <div className="mt-2 space-y-2">
                  {discussion.replies.map((reply, index) => (
                    <div key={index} className="bg-white p-2 rounded-md shadow-md">
                      <strong className="text-green-600">{reply.name}:</strong> <p style={{ whiteSpace: "pre-line" }} >  {reply.content}  </p>
                    </div>
                  ))}
                </div>
              </details>
            )}
          </div>
        ))}
      </div>

      {/* Add Discussion Floating Button */}
      <motion.button
  onClick={() => setShowForm(true)}
  className="fixed bottom-10 right-10 !bg-green-500 text-white text-3xl !rounded-full !p-4 shadow-lg !w-14 !h-14 flex items-center justify-center hover:!bg-green-500 "
>  
  <FaPlus size={20} />
</motion.button>



{showForm && (
  <div className="fixed inset-0 flex items-center justify-center !bg-black/60  z-50">


          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold text-orange-600">Start a Discussion</h2>
            <input
              type="text"
              placeholder="Your Name"
              className="border p-2 rounded w-full mt-2"
              value={newDiscussion.name}
              onChange={(e) => setNewDiscussion({ ...newDiscussion, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Title"
              className="border p-2 rounded w-full mt-2"
              value={newDiscussion.title}
              onChange={(e) => setNewDiscussion({ ...newDiscussion, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Tags (comma-separated)"
              className="border p-2 rounded w-full mt-2"
              value={newDiscussion.tags}
              onChange={(e) => setNewDiscussion({ ...newDiscussion, tags: e.target.value })}
            />
            <textarea
              placeholder="Write your discussion..."
              className="border p-2 rounded w-full mt-2"
              value={newDiscussion.content}
              onChange={(e) => setNewDiscussion({ ...newDiscussion, content: e.target.value })}
            ></textarea>
 <input
        type="file"
        className="mt-2"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            const imageUrl = URL.createObjectURL(file);
            setNewDiscussion((prev) => ({ ...prev, image: imageUrl }));
          }
        }}
      />

      {/* Display Image Preview */}
      {newDiscussion.image && (
        <div className="mt-4">
          <img
            src={newDiscussion.image}
            alt="Selected"
            className="w-40 h-40 object-cover rounded-lg shadow-md"
          />
        </div>
      )}
            <button
              onClick={handlePostDiscussion}
              className="mt-3 !bg-green-500 text-white px-4 py-2 rounded w-full hover:bg-green-700"
            >
              Post Discussion
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="mt-2 !bg-red-500 text-white w-full text-center"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      
    </div>
  );
};

export default DiscussionForum;
