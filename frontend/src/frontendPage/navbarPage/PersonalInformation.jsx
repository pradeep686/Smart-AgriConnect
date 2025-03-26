import React, { useState, useEffect } from "react";
import axios from "axios";

function PersonalInformation() {
  const [addresses, setAddresses] = useState([]);
  const [formData, setFormData] = useState({
    doorNo: "",
    street: "",
    city: "",
    pincode: "",
    district: "",
    state: "",
  });

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }
      
      const response = await axios.get("http://localhost:9009/userAddress/get", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setAddresses(response.data.data);
    } catch (error) {
      console.error("Error fetching addresses:", error.response?.data?.msg || error.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }
      
      await axios.post("http://localhost:9009/userAddress/add", formData, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      fetchAddresses();
    } catch (error) {
      console.error("Error adding address:", error.response?.data?.msg || error.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Profile</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <input type="text" name="doorNo" placeholder="Door No" onChange={handleChange} className="border p-2 m-2" required />
        <input type="text" name="street" placeholder="Street" onChange={handleChange} className="border p-2 m-2" required />
        <input type="text" name="city" placeholder="City" onChange={handleChange} className="border p-2 m-2" required />
        <input type="text" name="pincode" placeholder="Pincode" onChange={handleChange} className="border p-2 m-2" required />
        <input type="text" name="district" placeholder="District" onChange={handleChange} className="border p-2 m-2" required />
        <input type="text" name="state" placeholder="State" onChange={handleChange} className="border p-2 m-2" required />
        <button type="submit" className="bg-blue-500 text-white p-2 m-2">Add Address</button>
      </form>
      <h2 className="text-xl font-bold mt-6">Saved Addresses</h2>
      <ul>
        {addresses.length > 0 ? (
          addresses.map((addr) => (
            <li key={addr._id} className="border p-2 mt-2">
              {`${addr.doorNo}, ${addr.street}, ${addr.city}, ${addr.pincode}, ${addr.district}, ${addr.state}`}
            </li>
          ))
        ) : (
          <p>No addresses found</p>
        )}
      </ul>
    </div>
  );
}

export default PersonalInformation;
