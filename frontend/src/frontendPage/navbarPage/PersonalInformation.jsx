import React, { useState, useEffect } from "react";
import axios from "axios";

function PersonalInformation() {
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [isEditingFarm, setIsEditingFarm] = useState(false);
  const [infoId, setInfoId] = useState(null);

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
    animalFarm: "",
  });

  // Fetch token from local storage
  const getToken = () => localStorage.getItem("token");

  // Fetch user data on component mount
  useEffect(() => {
    axios
      .get("http://localhost:9009/userAddress/get", {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then((response) => {
        if (response.data.length > 0) {
          setUserFormData(response.data[0]);
          setFarmFormData(response.data[0]);
          setInfoId(response.data[0]._id);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Handle input changes
  const handleUserChange = (e) => {
    setUserFormData({ ...userFormData, [e.target.name]: e.target.value });
  };

  const handleFarmChange = (e) => {
    setFarmFormData({ ...farmFormData, [e.target.name]: e.target.value });
  };

  // Submit user data (POST/PUT)
  const handleUserSubmit = (e) => {
    e.preventDefault();
    const url = infoId
      ? `http://localhost:9009/userAddress/edit/${infoId}`
      : "http://localhost:9009/userAddress/add";
    const method = infoId ? "put" : "post";

    axios({
      method: method,
      url: url,
      data: userFormData,
      headers: { Authorization: `Bearer ${getToken()}` },
    })
      .then(() => setIsEditingUser(false))
      .catch((error) => console.error("Error saving user data:", error));
  };

  // Submit farm data (POST/PUT)
  const handleFarmSubmit = (e) => {
    e.preventDefault();
    const url = infoId
      ? `http://localhost:9009/userAddress/edit/${infoId}`
      : "http://localhost:9009/userAddress/add";
    const method = infoId ? "put" : "post";

    axios({
      method: method,
      url: url,
      data: farmFormData,
      headers: { Authorization: `Bearer ${getToken()}` },
    })
      .then(() => setIsEditingFarm(false))
      .catch((error) => console.error("Error saving farm data:", error));
  };

  // Delete user data
  const handleDelete = () => {
    axios
      .delete(`http://localhost:9009/userAddress/delete/${infoId}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then(() => {
        setUserFormData({
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
        setFarmFormData({
          farmSize: "",
          soilType: "",
          currentCrops: "",
          animalFarm: "",
        });
        setInfoId(null);
      })
      .catch((error) => console.error("Error deleting data:", error));
  };

  return (
    <div className="text-center font-extrabold text-2xl p-4">
      {userFormData.fullName}

      <div className="mt-6 flex flex-col items-center space-y-8">
        {/* Farmer Information */}
        <div className="bg-white shadow-xl rounded-3xl p-6 max-w-3xl w-full">
          <h2 className="text-gray-800 text-xl font-semibold">📋 Farmer Information</h2>
          {isEditingUser ? (
            <form onSubmit={handleUserSubmit} className="mt-4 space-y-4">
              {Object.entries(userFormData).map(([field, value]) => (
                <div key={field} className="flex items-center justify-between text-left">
                  <label className="text-sm font-medium text-gray-500 w-1/3">
                    {field.replace(/([A-Z])/g, " $1").trim()}:
                  </label>
                  <input
                    type="text"
                    name={field}
                    value={value}
                    onChange={handleUserChange}
                    placeholder={`Enter ${field.replace(/([A-Z])/g, " $1").trim()}`}
                    className="border p-2 rounded-lg w-2/3 text-gray-800"
                    required
                  />
                </div>
              ))}
              <button type="submit" className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg">Save</button>
            </form>
          ) : (
            <div>
              {Object.entries(userFormData).map(([field, value]) => (
                <div key={field} className="flex items-center justify-between text-left">
                  <label className="text-sm font-medium text-gray-500 w-1/3">
                    {field.replace(/([A-Z])/g, " $1").trim()}:
                  </label>
                  <p className="text-gray-800 w-2/3">{value}</p>
                </div>
              ))}
              <button onClick={() => setIsEditingUser(true)} className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg">Edit</button>
            </div>
          )}
        </div>

        {/* Farm Details */}
        <div className="bg-white shadow-xl rounded-3xl p-6 max-w-3xl w-full">
          <h2 className="text-gray-800 text-xl font-semibold">📋 Farm Details</h2>
          {isEditingFarm ? (
            <form onSubmit={handleFarmSubmit} className="mt-4 space-y-4">
              {Object.entries(farmFormData).map(([field, value]) => (
                <div key={field} className="flex items-center justify-between text-left">
                  <label className="text-sm font-medium text-gray-500 w-1/3">
                    {field.replace(/([A-Z])/g, " $1").trim()}:
                  </label>
                  <input
                    type="text"
                    name={field}
                    value={value}
                    onChange={handleFarmChange}
                    placeholder={`Enter ${field.replace(/([A-Z])/g, " $1").trim()}`}
                    className="border p-2 rounded-lg w-2/3 text-gray-800"
                    required
                  />
                </div>
              ))}
              <button type="submit" className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg">Save</button>
            </form>
          ) : (
            <div>
              {Object.entries(farmFormData).map(([field, value]) => (
                <div key={field} className="flex items-center justify-between text-left">
                  <label className="text-sm font-medium text-gray-500 w-1/3">
                    {field.replace(/([A-Z])/g, " $1").trim()}:
                  </label>
                  <p className="text-gray-800 w-2/3">{value}</p>
                </div>
              ))}
              <button onClick={() => setIsEditingFarm(true)} className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg">Edit</button>
            </div>
          )}
        </div>

        <button onClick={handleDelete} className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg">Delete</button>
      </div>
    </div>
  );
}

export default PersonalInformation;
