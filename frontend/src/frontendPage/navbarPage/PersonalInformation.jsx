import React, { useState } from "react";

function PersonalInformation() {
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [isEditingFarm, setIsEditingFarm] = useState(false);

  const [userFormData, setUserFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    dateOfBirth: "",
    gender: "",
    village: "",
    taluk: "",
    district: "",
    state: "",
    pinCode: "",
  });

  const [farmFormData, setFarmFormData] = useState({
    farmSize: "",
    soilType: "",
    currentCrops: "",
    AnimalFarm: "",
  });

  const handleUserChange = (e) => {
    setUserFormData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  };

  const handleFarmChange = (e) => {
    setFarmFormData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  };

  const handleUserSubmit = (e) => {
    e.preventDefault();
    setIsEditingUser(false);
    console.log("Updated User Data:", userFormData);
  };

  const handleFarmSubmit = (e) => {
    e.preventDefault();
    setIsEditingFarm(false);
    console.log("Updated Farm Data:", farmFormData);
  };

  const renderFormFields = (formData, handleChange) => (
    Object.entries(formData).map(([field, value]) => (
      <div key={field} className="flex items-center justify-between text-left">
        <label className="text-sm font-medium text-gray-500 w-1/3">{field.replace(/([A-Z])/g, " $1").trim()}:</label>
        <input
          type="text"
          name={field}
          value={value}
          onChange={handleChange}
          placeholder={`Enter ${field.replace(/([A-Z])/g, " $1").trim()}`}
          className="border p-2 rounded-lg w-2/3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400"
          required
        />
      </div>
    ))
  );

  const renderDisplayFields = (formData) => (
    Object.entries(formData).map(([field, value]) => (
      <div key={field} className="flex items-center justify-between text-left">
        <label className="text-sm font-medium text-gray-500 w-1/3">{field.replace(/([A-Z])/g, " $1").trim()}:</label>
        <span className="w-2/3 text-gray-800">{value}</span>
      </div>
    ))
  );

  return (
    <div className="text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600 text-2xl md:text-xl p-4 rounded-2xl">
      {userFormData.fullName}

      <div className="mt-6 flex flex-col items-center space-y-8">
        <div className="bg-white shadow-xl rounded-3xl p-6 max-w-3xl w-full">
          <h2 className="text-gray-800 text-xl font-semibold">📋 Farmer Information</h2>

          {isEditingUser ? (
            <form onSubmit={handleUserSubmit} className="mt-4 space-y-4">
              {renderFormFields(userFormData, handleUserChange)}
              <button
                type="submit"
                className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
              >
                Save Information
              </button>
            </form>
          ) : (
            <div className="mt-4 text-sm text-gray-700 space-y-2">
              {renderDisplayFields(userFormData)}
              <button
                onClick={() => setIsEditingUser(true)}
                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Edit Information
              </button>
            </div>
          )}
        </div>

        <div className="bg-white shadow-xl rounded-3xl p-6 max-w-3xl w-full">
          <h2 className="text-gray-800 text-xl font-semibold">📋 Farm Details</h2>

          {isEditingFarm ? (
            <form onSubmit={handleFarmSubmit} className="mt-4 space-y-4">
              {renderFormFields(farmFormData, handleFarmChange)}
              <button
                type="submit"
                className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
              >
                Save Farm Details
              </button>
            </form>
          ) : (
            <div className="mt-4 text-sm text-gray-700 space-y-2">
              {renderDisplayFields(farmFormData)}
              <button
                onClick={() => setIsEditingFarm(true)}
                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Edit Farm Details
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default PersonalInformation;
