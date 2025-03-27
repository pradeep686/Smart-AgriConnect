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
  const [editIndex, setEditIndex] = useState(null); // Track which address is being edited

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

      // Store only two addresses
      setAddresses(response.data.data.slice(0, 2));
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

      if (editIndex !== null) {
        // Update existing address
        await axios.put(
          `http://localhost:9009/userAddress/edit/${addresses[editIndex]._id}`,
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
      } else {
        // Add new address (if less than 2 addresses exist)
        if (addresses.length < 2) {
          await axios.post("http://localhost:9009/userAddress/add", formData, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          });
        } else {
          console.error("Cannot add more than two addresses.");
          return;
        }
      }

      fetchAddresses();
      setEditIndex(null);
      setFormData({ doorNo: "", street: "", city: "", pincode: "", district: "", state: "" }); // Reset form
    } catch (error) {
      console.error("Error saving address:", error.response?.data?.msg || error.message);
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setFormData(addresses[index]); // Load address data into form for editing
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      await axios.delete(`http://localhost:9009/userAddress/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      fetchAddresses(); // Refresh addresses after deletion
    } catch (error) {
      console.error("Error deleting address:", error.response?.data?.msg || error.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Profile</h1>

      {(addresses.length < 1 || editIndex !== null) && (
        <form onSubmit={handleSubmit} className="mt-4">
          <input type="text" name="doorNo" value={formData.doorNo} placeholder="Door No" onChange={handleChange} className="border p-2 m-2" required />
          <input type="text" name="street" value={formData.street} placeholder="Street" onChange={handleChange} className="border p-2 m-2" required />
          <input type="text" name="city" value={formData.city} placeholder="City" onChange={handleChange} className="border p-2 m-2" required />
          <input type="text" name="pincode" value={formData.pincode} placeholder="Pincode" onChange={handleChange} className="border p-2 m-2" required />
          <input type="text" name="district" value={formData.district} placeholder="District" onChange={handleChange} className="border p-2 m-2" required />
          <input type="text" name="state" value={formData.state} placeholder="State" onChange={handleChange} className="border p-2 m-2" required />
          <button type="submit" className="bg-blue-500 text-white p-2 m-2">
            {editIndex !== null ? "Update Address" : "Add Address"}
          </button>
        </form>
      )}

      <h2 className="text-xl font-bold mt-6">Saved Addresses</h2>
      <ul>
        {addresses.length > 0 ? (
          addresses.map((addr, index) => (
            <li key={addr._id} className="border p-2 mt-2 flex justify-between">
              <span>
                {addr.doorNo}, {addr.street}, {addr.city}, {addr.pincode}, {addr.district}, {addr.state}
              </span>
              <div>
                <button onClick={() => handleEdit(index)} className="bg-yellow-500 text-white p-1 ml-4">
                  Edit
                </button>
                <button onClick={() => handleDelete(addr._id)} className="bg-red-500 text-white p-1 ml-2">
                  Delete
                </button>
              </div>
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
