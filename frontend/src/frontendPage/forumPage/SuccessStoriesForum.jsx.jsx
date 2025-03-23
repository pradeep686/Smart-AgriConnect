import React, { useState , useEffect} from "react";
import { motion } from "framer-motion";
import { FaPlus, FaReply } from "react-icons/fa";

const SuccessStoriesForum = () => {
  const [discussions, setDiscussions] = useState([
    {
      id: 1,
      name: "Mr. Senthil Kumar",
      title: "🌱 High-Yield Tomato Farming Using Precision Techniques",
      tags: ["Farming", "Tomato Cultivation", "Tomato"],
      content: `🌾 Crop: Tomato (Varieties: Arka Rakshak & Heem Sohna)
📅 Duration: Planted in June, Harvested in September (90-100 days)

🛠️ Cultivation Process:

🔹 🌍 Soil Preparation:-
Used well-drained loamy soil enriched with farmyard manure and compost. Conducted soil testing to check nutrient levels and pH balance. Applied organic fertilizers like vermicompost for better root development. 
Created raised beds to improve drainage and root aeration.

🔹 🌱 Planting & Spacing:-
Selected Arka Rakshak & Heem Sohna for disease resistance & high yield. Maintained spacing of 2.5 ft between rows & 1.5 ft between plants. Used staking & trellising to support plants and prevent diseases. Applied mulching sheets to retain moisture and reduce weed growth. 

🔹 💧 Irrigation Management:-
Installed drip irrigation system, saving 40% water compared to flood irrigation. Provided frequent light watering to maintain soil moisture. Used organic mulch like dry leaves to prevent excessive evaporation. Avoided overhead irrigation to reduce fungal infections.

🔹 🦠 Pest & Disease Control:-
Applied Neem oil & Trichoderma as a natural pest repellent. Released beneficial insects like ladybugs to control aphids. Used crop rotation & companion planting (marigold to deter nematodes). Regularly pruned infected leaves to prevent disease spread.

🔹 🌾 Fertilizer & Growth Management:-
Applied organic manure & bio-fertilizers like Azospirillum for nitrogen fixation. Used foliar sprays of micronutrients for plant strength. Applied potassium-rich fertilizers at the flowering stage for better fruiting. Ensured balanced nutrient supply to avoid blossom end rot.

💰 Financial Breakdown:-

💸 Total Cost Spent: ₹80,000 per acre (including seeds, fertilizers, irrigation, and labor)
📈 Total Turnover: ₹3,50,000 per acre
💵 Net Profit: ₹2,70,000 per acre

📊 Key Takeaways:-
✅ Smart agricultural techniques = higher yield & profit
✅ Organic pest control reduces expenses
✅ Efficient irrigation improves productivity

Its my farming way proves that adopting modern precision farming methods leads to better profits and sustainable agriculture.

`,
      image: "https://th.bing.com/th/id/OIP.rWL5KfNG5cenRJtnyaoaOAHaE7?rs=1&pid=ImgDetMain",
      replies: [
        {
          id: 101,
          name: "Mugil_daney",
          content: "I want to cultivate tomatoes and ensure healthy growth with minimal pest attacks. What are the best organic and chemical fertilizers for tomatoes? Also, which pesticides should I use to prevent common diseases like blight and leaf curl.",
          timestamp: "2025-03-23 10:00 AM",
        }
      ],
    },
    {
        "id": 2,
        "name": "Mr. Karthik Raja",
        "title": "🐔 Profitable Poultry Farming with Sustainable Practices",
        "tags": ["Poultry Farming", "Layer Farming", "Broiler Farming"],
        "content": `🐓 Poultry Type: Layer & Broiler Farming  
      📅 Duration: 45 Days (Broilers), 18-20 Weeks (Layers for Egg Production)  
      
      🛠️ Farming Process:  
      
      🔹 🏡 Housing & Setup:-  
      Built a well-ventilated deep litter system to reduce disease risks.  
      Maintained 1 sq. ft per bird to avoid overcrowding.  
      Used temperature-controlled sheds with proper insulation for climate control.  
      Installed automated feeders and water dispensers for efficiency.  
      
      🔹 🍲 Feeding & Nutrition:-  
      Provided high-protein starter feed (22-24%) for broilers in the first 3 weeks.  
      Fed layers a calcium-rich diet for stronger eggshell quality.  
      Supplemented with probiotics & herbal tonics to boost immunity.  
      Used maize, soybean meal, and fish meal for a balanced diet.  
      
      🔹 🛡️ Disease & Health Management:-  
      Followed a strict vaccination schedule (Newcastle, Marek’s, Gumboro).  
      Used herbal solutions like garlic extract for natural antibiotic benefits.  
      Maintained strict biosecurity measures to prevent infections.  
      Regularly checked birds for early signs of illness and treated accordingly.  
      
      🔹 📈 Market & Profitability:-  
      Sold broilers at 45 days with an average weight of 2.2 kg per bird.  
      Supplied eggs directly to local retailers and restaurants.  
      Adopted contract farming with poultry integrators for stable income.  
      Diversified revenue by selling poultry manure as organic fertilizer.  
      
      💰 Financial Breakdown:-  
      
      💸 Total Cost Spent: ₹1,20,000 (including chicks, feed, medicine, and labor)  
      📈 Total Turnover: ₹3,80,000 (from broilers & eggs)  
      💵 Net Profit: ₹2,60,000  
      
      📊 Key Takeaways:-  
      ✅ Proper housing & hygiene reduces mortality rates  
      ✅ Balanced feed improves growth & egg production  
      ✅ Market research helps get better prices  
      
      This farming journey proves that well-planned poultry farming can be highly profitable with the right techniques.  
        `,
        "image": "https://www.aci-bd.com/assets/images/rnd/poultry-industry.jpg",
        "replies": [
          {
            "id": 102,
            "name": "Selva_erimalai",
            "content": "What is the best feed combination for increasing broiler growth naturally without using growth boosters?",
            "timestamp": "2025-03-23 11:00 AM"
          }
        ]
      }, 
  ]);  
  

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

<h2
      style={{
        fontSize: "24px",
        fontWeight: "bold",
        color: "#333",
        padding: "10px",
        display: "inline-block",
      }}
    >
      🏆 Success Stories
    </h2>

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
            <p style={{ whiteSpace: "pre-line" }} className="text-gray-700">{discussion.content}</p><br/>
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
                      <strong className="text-green-600">{reply.name}:</strong> <p  style={{ whiteSpace: "pre-line" }} >  {reply.content}  </p>
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


export default SuccessStoriesForum;



