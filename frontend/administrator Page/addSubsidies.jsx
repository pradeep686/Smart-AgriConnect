import { useState } from "react";
import { UploadCloud } from "lucide-react";

const categories = [
  "Crops Subsidy", "Fertilizer & Pesticides Subsidy", "Irrigation Subsidy",
  "Equipment Subsidy", "Credit Subsidy", "Price Support Subsidies",
  "Power Subsidy", "Export & Import Subsidies", "Organic Farming Subsidy",
  "Infrastructure Development Subsidies"
];

export default function AddSubsidies() {
  const [formData, setFormData] = useState({
    category: "",
    name: "",
    image: null,
    summary: "",
    details: "",
    eligibility: "",
    documents: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      const response = await fetch("http://localhost:5000/api/subsidies", {
        method: "POST",
        body: data,
      });
      const result = await response.json();
      alert("Subsidy Added Successfully!");
    } catch (error) {
      console.error("Error adding subsidy:", error);
    }
  };

  return (
    <div >
      <div className="flex-1 p-6 bg-gray-1000 overflow-auto">
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Add New Subsidy</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <select name="category" value={formData.category} onChange={handleChange} className="w-full p-2 border rounded text-sm">
              <option value="">Select Subsidy Category</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>

            <input type="text" name="name" placeholder="Subsidy Name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded text-sm" />

            <label className="border border-dashed border-gray-400 p-3 rounded-lg text-center cursor-pointer block text-sm">
              <input type="file" className="hidden" onChange={handleImageChange} />
              <UploadCloud className="mx-auto text-gray-500" size={30} />
              <p className="text-gray-600 mt-1">{formData.image ? formData.image.name : "Upload Relevant Image"}</p>
            </label>

            <textarea name="summary" placeholder="Short Summary" value={formData.summary} onChange={handleChange} className="w-full p-2 border rounded text-sm" rows={2} />
            <textarea name="details" placeholder="Detailed Information" value={formData.details} onChange={handleChange} className="w-full p-2 border rounded text-sm" rows={3} />
            <textarea name="eligibility" placeholder="Who Can Apply?" value={formData.eligibility} onChange={handleChange} className="w-full p-2 border rounded text-sm" rows={2} />
            <textarea name="documents" placeholder="Documents Required" value={formData.documents} onChange={handleChange} className="w-full p-2 border rounded text-sm" rows={2} />

            <button
  type="submit"
  className="w-full !bg-green-500 text-white font-semibold !py-1 rounded transition-transform duration-200 hover:bg-green-500 hover:scale-101 active:scale-95 text-sm"
>
  Add Subsidy
</button>
          </form>
        </div>
      </div>
    </div>
  );
}
