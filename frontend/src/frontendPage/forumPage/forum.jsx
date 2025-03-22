import {motion} from "framer-motion"

const Forum = () => {
    return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="ml-64 p-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Fertilizer Section */}
          <motion.div
            className="bg-white p-8 rounded-lg shadow-lg cursor-pointer transform transition-all duration-300"
            onClick={() => alert("Agriculture Loan Subsidy clicked!")}
            initial={{ opacity: 0, scale: 0.8 }}  // Starts small and transparent
            animate={{ opacity: 1, scale: 1 }}   // Becomes visible
            transition={{ duration: 0.1 }}       // Smooth transition
            whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)" }} // Hover effect
          >
            <div className="w-full h-48 bg-cover bg-center rounded-t-lg" 
                 style={{ backgroundImage: "url('/images/discussion.jpg')" }}>
            </div>
            <h2 className="text-xl font-bold mt-4 mb-2 text-green-700">Discussion Forum</h2>
            <p className="text-gray-700">
            Connect with fellow farmers, share insights, and find solutions to agricultural challenges. Click below to join the conversation!
            </p>
          </motion.div>

          {/* Pesticides Section */}
          <motion.div
            className="bg-white p-8 rounded-lg shadow-lg cursor-pointer transform transition-all duration-300"
            onClick={() => alert("Fertilizer Subsidy clicked!")}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.1 }}
            whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)" }}
          >
            <div className="w-full h-48 bg-cover bg-center rounded-t-lg" 
                 style={{ backgroundImage: "url('/images/success.avif')" }}>
            </div>
            <h2 className="text-xl font-bold mt-4 mb-2 text-green-700">Success Stories</h2>
            <p className="text-gray-700">
            Get inspired by real farmers who achieved success with innovative farming techniques. Click below to explore their journeys!
            </p>
          </motion.div>

        </div>
      </div>
    </div>
  );
  };
  
  export default Forum;
  