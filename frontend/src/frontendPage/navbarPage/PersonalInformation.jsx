import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:9009/userAddress";

function App() {
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
        <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
            <h2>{editMode ? "Edit Personal Info" : "Add Personal Info"}</h2>
            <form>
                <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
                <input type="text" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input type="date" name="dateOfBirth" placeholder="Date of Birth" value={formData.dateOfBirth} onChange={handleChange} required />
                <input type="text" name="gender" placeholder="Gender" value={formData.gender} onChange={handleChange} />
                <input type="text" name="village" placeholder="Village" value={formData.village} onChange={handleChange} />
                <input type="text" name="taluk" placeholder="Taluk" value={formData.taluk} onChange={handleChange} />
                <input type="text" name="district" placeholder="District" value={formData.district} onChange={handleChange} />
                <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} />
                <input type="text" name="pinCode" placeholder="Pin Code" value={formData.pinCode} onChange={handleChange} />
                <input type="text" name="farmSize" placeholder="Farm Size" value={formData.farmSize} onChange={handleChange} />
                <input type="text" name="soilType" placeholder="Soil Type" value={formData.soilType} onChange={handleChange} />
                <input type="text" name="currentCrops" placeholder="Current Crops" value={formData.currentCrops} onChange={handleChange} />
                <input type="text" name="animalFarm" placeholder="Animal Farm" value={formData.animalFarm} onChange={handleChange} />
                <br />
                {editMode ? (
                    <button type="button" onClick={handleEdit}>Update</button>
                ) : (
                    <button type="button" onClick={handleAdd}>Add</button>
                )}
            </form>

            {personalInfo && (
                <div>
                    <h3>Saved Information:</h3>
                    <p><strong>Name:</strong> {personalInfo.fullName}</p>
                    <p><strong>Phone:</strong> {personalInfo.phoneNumber}</p>
                    <p><strong>Email:</strong> {personalInfo.email}</p>
                    <p><strong>DOB:</strong> {personalInfo.dateOfBirth}</p>
                    <p><strong>Gender:</strong> {personalInfo.gender}</p>
                    <p><strong>Village:</strong> {personalInfo.village}</p>
                    <p><strong>Taluk:</strong> {personalInfo.taluk}</p>
                    <p><strong>District:</strong> {personalInfo.district}</p>
                    <p><strong>State:</strong> {personalInfo.state}</p>
                    <p><strong>Pin Code:</strong> {personalInfo.pinCode}</p>
                    <p><strong>Farm Size:</strong> {personalInfo.farmSize}</p>
                    <p><strong>Soil Type:</strong> {personalInfo.soilType}</p>
                    <p><strong>Current Crops:</strong> {personalInfo.currentCrops}</p>
                    <p><strong>Animal Farm:</strong> {personalInfo.animalFarm}</p>
                    <button onClick={() => setEditMode(true)}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            )}
        </div>
    );
}

export default App;
