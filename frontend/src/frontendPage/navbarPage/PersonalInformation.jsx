import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { Trash2 } from "lucide-react";

import axios from "axios";

const API_BASE_URL = "http://localhost:9009/userAddress";

function PersonalInformation () {
    const [formData, setFormData] = useState({
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
        farmSize: "",
        soilType: "",
        currentCrops: "",
        animalFarm: "",
    });

    const [personalInfo, setPersonalInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const token = localStorage.getItem("token"); // Retrieve token from localStorage

    useEffect(() => {
        fetchPersonalInfo();
    }, []);

    // Fetch Personal Info
    const fetchPersonalInfo = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_BASE_URL}/get`, {
                withCredentials: true,
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.data.success) {
                setPersonalInfo(response.data.data);
                setFormData(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching data:", error.response?.data?.msg || error.message);
        } finally {
            setLoading(false);
        }
    };

    // Handle Input Change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Add Personal Info
    const handleAdd = async () => {
        try {
            const response = await axios.post(`${API_BASE_URL}/add`, formData, {
                withCredentials: true,
                headers: { Authorization: `Bearer ${token}` },
            });
            alert(response.data.msg);
            fetchPersonalInfo();
        } catch (error) {
            alert(error.response?.data?.msg || "Error adding information");
        }
    };

    // Edit Personal Info
    const handleEdit = async () => {
        try {
            const response = await axios.put(`${API_BASE_URL}/edit`, formData, {
                withCredentials: true,
                headers: { Authorization: `Bearer ${token}` },
            });
            alert(response.data.msg);
            fetchPersonalInfo();
            setEditMode(false);
        } catch (error) {
            alert(error.response?.data?.msg || "Error updating information");
        }
    };

    // Delete Personal Info
    const handleDelete = async () => {
        try {
            await axios.delete(`${API_BASE_URL}/delete`, {
                withCredentials: true,
                headers: { Authorization: `Bearer ${token}` },
            });
            alert("Personal information deleted successfully");
            setPersonalInfo(null);
            setFormData({
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
                farmSize: "",
                soilType: "",
                currentCrops: "",
                animalFarm: "",
            });
        } catch (error) {
            alert(error.response?.data?.msg || "Error deleting information");
        }
    };


    return (
        <div style={{ display: "flex", height: "160vh", backgroundColor: "#f8f9fa" }}>
            <div className="absolute inset-0  ml-54  min-h-screen">
            
            {/* Main Content */}
            <div style={{ flex: 1, padding: "40px", borderRadius: "10px", backgroundColor: "white", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", margin: "40px" }}>
                <h2 style={{ textAlign: "center", marginBottom: "20px", fontSize: "24px", fontWeight: "bold" }}>{editMode ? "📝 Edit Personal Information" : "📝 Personal Information"}</h2>
                {editMode || !personalInfo ? (
                    <form style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                        {Object.keys(formData)
                        .map((key) => (
                            <input
                                key={key}
                                type={key === "email" ? "email" : key === "dateOfBirth" ? "date" : "text"}
                                name={key}
                                placeholder={key.replace(/([A-Z])/g, " $1").trim()}
                                value={formData[key]}
                                onChange={handleChange}
                                style={{ padding: "8px", borderRadius: "10px", border: "2px solid #ccc" }}
                                required
                            />
                        ))}
                        <button type="button" style={{ gridColumn: "span 2", padding: "12px", backgroundColor: "#008bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }} onClick={editMode ? handleEdit : handleAdd}>
                            {editMode ? "Update" : "Add"}
                        </button>
                    </form>
                ) : (
                    <div style={{ marginTop: "20px", padding: "20px", border: "1px solid #ddd", borderRadius: "5px", backgroundColor: "#f8f9fa" }}>
                        <h3 style={{ marginBottom: "15px" }}>💬 Saved Information: </h3>

                        <button 
    style={{ 
        marginRight: "10px", 
        paddingLeft: "10px", 
        marginLeft: "1020px", 
        backgroundColor: "#008bff", 
        color: "white", 
        border: "none", 
        borderRadius: "5px", 
        cursor: "pointer", 
        display: "flex", 
        alignItems: "center", 
        gap: "5px" // Adds spacing between text and icon
    }} 
    onClick={() => setEditMode(true)}
>
    <FaEdit /> Edit
</button>
{Object.entries(personalInfo)
  .filter(([key]) => !["_id", "userId", "__v"].includes(key)) // Exclude these fields
  .map(([key, value]) => (
    <div
      key={key}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #ddd",
        padding: "10px 0",
      }}
    >
      {/* Left-aligned Key */}
      <h2 style={{ flex: 1, textAlign: "left", margin: 0 }}>
        <strong>
          {key
            .replace(/([A-Z])/g, " $1")
            .trim()
            .charAt(0)
            .toUpperCase() +
            key.replace(/([A-Z])/g, " $1").trim().slice(1)}
          :
        </strong>
      </h2>

      {/* Centered Value */}
      <h2 style={{ flex: 1, textAlign: "center", margin: 0 }}>{value}</h2>
    </div>
  ))}
<br />
                        
<button 
  style={{ 
    display: "flex", 
    alignItems: "center", 
    gap: "8px",  /* Adjust space between icon and text */
    padding: "10px", 
    backgroundColor: "red", 
    color: "white", 
    border: "none", 
    borderRadius: "7px", 
    cursor: "pointer"
  }} 
  onClick={handleDelete}
>
  <Trash2 size={24} color="white" />
  <span>Delete</span>
</button>
</div>
        )}
            </div>
            </div>
        </div>
    );
}





export default PersonalInformation ;






