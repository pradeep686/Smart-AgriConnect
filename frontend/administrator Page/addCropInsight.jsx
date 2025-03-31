import { useState } from "react";
import { UploadCloud } from "lucide-react";

const categories = [
  "Tree Crop", "Cereal Crops", "Pulses (Legume Crops)", "Vegetable Crops",
  "Fruit Crops", "Flowering Crops", "Dry Fruit Crops", "Medicinal & Aromatic Plants",
  "Spices & Condiments", "Fodder Crops", "Sugar Crops", "Beverage Crops"
];

export default function AddCropInsight() {
  const [formData, setFormData] = useState({
    category: "", name: "", scientificName: "", image: null,
    summary: "", details: "", soilType: "", yieldPerAcre: "",
    marketValue: "", uses: "", nutritionalValue: ""
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
      const response = await fetch("http://localhost:5000/api/crop-insights", {
        method: "POST",
        body: data,
      });
      const result = await response.json();
      alert("Crop Insight Added Successfully!");
    } catch (error) {
      console.error("Error adding crop insight:", error);
    }
  };

  return (
    <div className="flex  h-screen  p-6">
      <div className="flex-1 max-w-5xl h-198 mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Add New Crop Insight</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <select name="category" value={formData.category} onChange={handleChange} className="p-2 border rounded bg-white col-span-2 text-sm">
            <option value="">Select Crop Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
          <input type="text" name="name" placeholder="Crop Name" value={formData.name} onChange={handleChange} className="p-2 border rounded bg-white text-sm" />
          <input type="text" name="scientificName" placeholder="Scientific Name" value={formData.scientificName} onChange={handleChange} className="p-2 border rounded bg-white text-sm" />
          <label className="border border-dashed border-gray-400 p-3 rounded-lg text-center cursor-pointer col-span-2 bg-white text-sm">
            <input type="file" className="hidden" onChange={handleImageChange} />
            <UploadCloud className="mx-auto text-gray-500" size={30} />
            <p className="text-gray-600 mt-2">{formData.image ? formData.image.name : "Upload Relevant Image"}</p>
          </label>
          <textarea name="summary" placeholder="Short Summary" value={formData.summary} onChange={handleChange} className="p-2 border rounded bg-white col-span-2 text-sm" rows={2} />
          <textarea name="details" placeholder="Detailed Information" value={formData.details} onChange={handleChange} className="p-2 border rounded bg-white col-span-2 text-sm" rows={3} />
          <input type="text" name="soilType" placeholder="Soil Type" value={formData.soilType} onChange={handleChange} className="p-2 border rounded bg-white text-sm" />
          <input type="text" name="yieldPerAcre" placeholder="Yield Per Acre" value={formData.yieldPerAcre} onChange={handleChange} className="p-2 border rounded bg-white text-sm" />
          <input type="text" name="marketValue" placeholder="Market Value" value={formData.marketValue} onChange={handleChange} className="p-2 border rounded bg-white text-sm" />
          <textarea name="uses" placeholder="Uses & Benefits" value={formData.uses} onChange={handleChange} className="p-2 border rounded bg-white col-span-2 text-sm" rows={2} />
          <textarea name="nutritionalValue" placeholder="Nutritional Value" value={formData.nutritionalValue} onChange={handleChange} className="p-2 border rounded bg-white col-span-2 text-sm" rows={2} />
          
          <button
  type="submit"
  className="w-full !bg-green-500 text-white font-semibold !py-1 ml-59 rounded transition-transform duration-200 hover:bg-green-500 hover:scale-101 active:scale-95 text-sm"
>
  Add CropInsight
</button>


        </form>
      </div>
    </div>
  );
}
