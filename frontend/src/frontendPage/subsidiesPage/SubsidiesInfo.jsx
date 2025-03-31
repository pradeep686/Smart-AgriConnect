import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const dummySubsidyData = {
  "Crops Subsidy": [
    {
      "name": "PM-Kisan Samman Nidhi",
      "image": "https://corpbiz.io/learning/wp-content/uploads/2021/10/Pradhan-Mantri-Kisan-Samman-Nidhi-scheme-PM-KISAN.jpg",
      "shortInfo": "A direct cash transfer scheme providing ₹6,000 per year to small & marginal farmers in three installments.",
      "details": "The Pradhan Mantri Kisan Samman Nidhi (PM-Kisan) is a Central Sector Scheme by the Government of India that provides financial assistance of ₹6,000 annually to eligible farmers. This amount is distributed in three equal installments of ₹2,000 each and transferred directly to farmers' bank accounts via the Direct Benefit Transfer (DBT) system.",
      "objective": "To provide income support to all landholding farmer families in the country to help them meet agricultural and allied expenses and ensure financial security.",
      "eligibility": {
        "whoCanApply": [
          "Small and marginal farmers",
          "Landholding farmer families as per State/UT land records",
          "Farmers owning cultivable land"
        ],
        "whoCannotApply": [
          "Institutional landholders",
          "Government employees (except Group D/Multi-Tasking Staff)",
          "Income tax payers in the last assessment year",
          "Professionals such as doctors, engineers, lawyers, and chartered accountants"
        ]
      },
      "benefits": [
        "₹6,000 annual financial support in three equal installments",
        "Direct Benefit Transfer (DBT) ensures timely assistance",
        "Helps farmers purchase seeds, fertilizers, and other agricultural inputs",
        "Aims to reduce financial stress and enhance farm productivity"
      ],
      "documentsRequired": [
        "Aadhaar Card (mandatory for verification)",
        "Land ownership documents (land deed, passbook, or records of rights)",
        "Bank account details (passbook or canceled cheque)",
        "Proof of citizenship (Voter ID, PAN Card, or Passport)"
      ],
      "applicationProcess": {
        "methods": [
          "Visit a Common Service Centre (CSC) and apply with required documents",
          "Register through local revenue offices (Patwari/Tehsildar)",
          "Self-register on the official PM-Kisan portal"
        ],
        "onlineRegistrationSteps": [
          "Go to the official PM-Kisan portal (https://pmkisan.gov.in)",
          "Click on 'Farmer's Corner' and select 'New Farmer Registration'",
          "Enter Aadhaar number and verify with OTP",
          "Fill in personal, bank, and land details",
          "Submit the form and note the registration number"
        ]
      },
      "howToCheckBeneficiaryStatus": [
        "Go to the official PM-Kisan portal",
        "Click on 'Beneficiary Status' under 'Farmer's Corner'",
        "Enter Aadhaar number, bank account number, or registered mobile number",
        "View application status and payment details"
      ],
      "importantConsiderations": [
        "Aadhaar linking is mandatory for registration",
        "Ensure accurate data to avoid payment delays",
        "Update bank account and mobile number for smooth transactions"
      ],
      "officialWebsite": "https://pmkisan.gov.in"
    },
    {
      "name": "National Food Security Mission (NFSM) - Seed Subsidy",
      "image": "https://th.bing.com/th/id/OIP.nasdsLIfgS5uvr-VHEaAEAHaEs?rs=1&pid=ImgDetMain",
      "shortInfo": "Subsidized seeds for rice, wheat, pulses, and coarse cereals to enhance production.",
      "details": "The National Food Security Mission (NFSM) provides subsidies on high-yielding and climate-resilient seeds for essential food crops, ensuring increased productivity and food security in India.",
      "objective": "To boost food grain production by promoting improved seed varieties and scientific farming practices.",
      "eligibility": {
        "whoCanApply": [
          "All registered farmers growing rice, wheat, pulses, or coarse cereals",
          "Small and marginal farmers",
          "Farmers adopting modern agricultural techniques"
        ],
        "whoCannotApply": [
          "Large landholders without proper cultivation records",
          "Institutional farms or corporate-owned agricultural lands"
        ]
      },
      "benefits": [
        "Subsidized certified seeds of high-yielding crop varieties",
        "Improved resistance to pests, diseases, and climate conditions",
        "Support for sustainable agriculture and better soil management"
      ],
      "documentsRequired": [
        "Aadhaar Card",
        "Land ownership documents",
        "Farm registration details (if applicable)"
      ],
      "applicationProcess": {
        "methods": [
          "Apply through State Agriculture Department offices",
          "Purchase subsidized seeds from authorized government centers",
          "Register via the official NFSM website"
        ],
        "onlineRegistrationSteps": [
          "Visit the official NFSM website (https://www.nfsm.gov.in)",
          "Check eligibility criteria for subsidized seeds",
          "Apply online with required documents",
          "Receive confirmation and collect seeds from local centers"
        ]
      },
      "howToCheckBeneficiaryStatus": [
        "Visit the NFSM website",
        "Log in using Aadhaar or registered details",
        "Check subsidy status under 'Farmer Benefits' section"
      ],
      "importantConsiderations": [
        "Ensure timely registration for subsidies before sowing season",
        "Follow proper seed storage and sowing guidelines",
        "Keep purchase receipts for verification"
      ],
      "officialWebsite": "https://www.nfsm.gov.in"
    },
    {
      "name": "National Mission on Edible Oils - Oilseeds Subsidy",
      "image": "https://st.adda247.com/https://s3-ap-south-1.amazonaws.com/adda247jobs-wp-assets-adda247/jobs/wp-content/uploads/sites/4/2021/12/29113601/National-Mission-on-Edible-Oil-Oil-Palm-Business-Summit-01.png",
      "shortInfo": "Subsidized high-quality seeds and fertilizers for oilseed crops like mustard, sunflower, and soybean.",
      "details": "The National Mission on Edible Oils (NMEO) provides financial support to farmers growing oilseeds to enhance domestic edible oil production and reduce dependence on imports.",
      "objective": "To boost the production of oilseeds and reduce India's reliance on imported edible oils.",
      "eligibility": {
        "whoCanApply": [
          "Farmers cultivating mustard, sunflower, soybean, groundnut, or palm oil",
          "Small and marginal farmers practicing oilseed farming"
        ],
        "whoCannotApply": [
          "Large-scale corporate agribusinesses",
          "Non-agricultural landholders"
        ]
      },
      "benefits": [
        "Subsidy on high-quality oilseed seeds",
        "Support for modern irrigation systems",
        "Encouragement for crop diversification and sustainable farming"
      ],
      "documentsRequired": [
        "Aadhaar Card",
        "Land ownership certificate",
        "Bank account details"
      ],
      "applicationProcess": {
        "methods": [
          "Apply through local agricultural offices",
          "Enroll in NMEO schemes via online portals",
          "Buy subsidized seeds from authorized dealers"
        ],
        "onlineRegistrationSteps": [
          "Visit the official NMEO website",
          "Fill out the application form",
          "Upload required documents",
          "Submit and track application status"
        ]
      },
      "howToCheckBeneficiaryStatus": [
        "Check subsidy status through the NMEO portal",
        "Visit local agriculture departments for updates"
      ],
      "importantConsiderations": [
        "Apply before the start of the sowing season",
        "Follow recommended sowing practices for maximum yield"
      ],
      "officialWebsite": "https://nmoop.gov.in"
    }
  ]
};



const SubsidiesInfo = () => {
    const location = useLocation();
    const [selectedCategory, setSelectedCategory] = useState(
      location.state?.category || "Crops Subsidy"
    );
    const [filteredSubsidies, setFilteredSubsidies] = useState(
      dummySubsidyData[selectedCategory] || []
    );
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [search, setSearch] = useState("");
  
    useEffect(() => {
      setFilteredSubsidies(
        dummySubsidyData[selectedCategory]?.filter((subsidy) =>
          subsidy.name.toLowerCase().includes(search.toLowerCase())
        ) || []
      );
    }, [selectedCategory, search]);
  
    return (
      <div className="ml-64 p-8 flex-1 overflow-hidden">

        <div className="mb-4">
          <h2 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
          {selectedCategory}
          </h2>
          <motion.p
            className="mt-2 text-sm !font-bold text-violet-600"
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 10, opacity: 1 }}
            transition={{ repeat: Infinity, repeatType: "reverse", duration: 5 }}
          >
           Smart Farming Starts Here – Avail Your Agricultural Subsidy!
          </motion.p>
        </div>


        <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="Search Subsidy..."
          className="w-80 bg-white/30 backdrop-blur-lg !text-gray-800 placeholder-gray-600 border border-gray-300 rounded-full py-3 px-5 focus:outline-none focus:ring-2 focus:ring-gray-500 shadow-lg transition-all duration-300"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={() => {}} className="ml-2 !bg-gray-700 text-white px-4 py-2 rounded-lg">Search</button>
      </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-2">
          {filteredSubsidies.map((subsidy, index) => (
            <motion.div
              key={index}
              className={`bg-white p-6 rounded-lg shadow-lg cursor-pointer transition-all duration-300 ${
                expandedIndex === index ? "col-span-3" : ""
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <img
                src={subsidy.image}
                alt={subsidy.name}
                className={`w-full ${expandedIndex === index ? "h-40" : "h-32"} object-contain rounded-md mb-4`}
              />
              <h3 className="text-lg font-semibold">{subsidy.name}</h3>
              <p className="text-gray-600 text-sm mb-3">{subsidy.shortInfo}</p>
              {expandedIndex === index ? (
  <div>
    <p className="text-gray-700 mb-2">{subsidy.details}</p>
    
    <p className="font-semibold">Objective:</p>
    <p className="text-gray-600 mb-2">{subsidy.objective}</p>

    <p className="font-semibold mt-2">Eligibility:</p>
    <ul className="text-gray-600 list-disc list-inside">
      <li><strong>Who Can Apply:</strong> {subsidy.eligibility.whoCanApply.join(", ")}</li>
      <li><strong>Who Cannot Apply:</strong> {subsidy.eligibility.whoCannotApply.join(", ")}</li>
    </ul>

    <p className="font-semibold mt-2">Benefits:</p>
    <ul className="text-gray-600 list-disc list-inside">
      {subsidy.benefits.map((benefit, i) => (
        <li key={i}>{benefit}</li>
      ))}
    </ul>

    <p className="font-semibold mt-2">Documents Required:</p>
    <ul className="text-gray-600 list-disc list-inside">
      {subsidy.documentsRequired.map((doc, i) => (
        <li key={i}>{doc}</li>
      ))}
    </ul>

    <p className="font-semibold mt-2">Application Process:</p>
    <ul className="text-gray-600 list-disc list-inside">
      {subsidy.applicationProcess.methods.map((method, i) => (
        <li key={i}>{method}</li>
      ))}
    </ul>

    <p className="font-semibold mt-2">How to Check Beneficiary Status:</p>
    <ul className="text-gray-600 list-disc list-inside">
      {subsidy.howToCheckBeneficiaryStatus.map((step, i) => (
        <li key={i}>{step}</li>
      ))}
    </ul>

    <p className="font-semibold mt-2">Important Considerations:</p>
    <ul className="text-gray-600 list-disc list-inside">
      {subsidy.importantConsiderations.map((point, i) => (
        <li key={i}>{point}</li>
      ))}
    </ul>

    <p className="font-semibold mt-2">
      Official Website:{" "}
      <a href={subsidy.officialWebsite} className="!text-blue-500" target="_blank" rel="noopener noreferrer">
        {subsidy.officialWebsite}
      </a>
    </p>

    <button onClick={() => setExpandedIndex(null)} className="mt-4 px-4 py-2 !bg-red-600 text-white rounded-lg">
      Show Less
    </button>
  </div>
) : (
  <button onClick={() => setExpandedIndex(index)} className="mt-2 px-4 py-2 !bg-green-600 text-white rounded-lg">
    Learn More
  </button>
)}

            </motion.div>
          ))}
        </div>
      </div>
    );
  };
  
  export default SubsidiesInfo;
  