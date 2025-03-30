import { useState } from "react";
import { UploadCloud } from "lucide-react";

export default function AddFertilizer() {
  const [formData, setFormData] = useState({
    name: "", type: "", image: null, composition: "", usage: "",
    suitableCrops: "", benefits: "",marketPrice: ""
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
      const response = await fetch("http://localhost:5000/api/fertilizers", {
        method: "POST",
        body: data,
      });
      const result = await response.json();
      alert("Fertilizer Added Successfully!");
    } catch (error) {
      console.error("Error adding fertilizer:", error);
    }
  };

  return (
    <div >
      <div className="max-w-3xl h-178 mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Add New Fertilizer</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <input type="text" name="name" placeholder="Fertilizer Name" value={formData.name} onChange={handleChange} className="p-2 border rounded bg-white col-span-2 text-sm" />
          <input type="text" name="type" placeholder="Type" value={formData.type} onChange={handleChange} className="p-2 border rounded bg-white col-span-2 text-sm" />
          <label className="border border-dashed border-gray-400 p-3 rounded-lg text-center cursor-pointer col-span-2 bg-white text-sm">
            <input type="file" className="hidden" onChange={handleImageChange} />
            <UploadCloud className="mx-auto text-gray-500" size={30} />
            <p className="text-gray-600 mt-2">{formData.image ? formData.image.name : "Upload Relevant Image"}</p>
          </label>
          <textarea name="composition" placeholder="Nutrient Composition" value={formData.composition} onChange={handleChange} className="p-2 border rounded bg-white col-span-2 text-sm" rows={2} />
          <textarea name="usage" placeholder="Usage" value={formData.usage} onChange={handleChange} className="p-2 border rounded bg-white col-span-2 text-sm" rows={2} />
          <textarea name="suitableCrops" placeholder="Suitable Crops" value={formData.suitableCrops} onChange={handleChange} className="p-2 border rounded bg-white col-span-2 text-sm" rows={2} />
          <textarea name="benefits" placeholder="Benefits" value={formData.benefits} onChange={handleChange} className="p-2 border rounded bg-white col-span-2 text-sm" rows={2} />
          <input type="text" name="marketPrice" placeholder="Market Price" value={formData.marketPrice} onChange={handleChange} className="p-2 border rounded bg-white col-span-2 text-sm" />
          <div className="flex justify-center mt-4 col-span-2">
            <button
              type="submit"
              className="!bg-green-500 text-white font-semibold !px-14  !py-1 rounded transition-transform duration-200 hover:bg-green-600 hover:scale-101 active:scale-95 text-sm"
            >
              Add Fertilizer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
