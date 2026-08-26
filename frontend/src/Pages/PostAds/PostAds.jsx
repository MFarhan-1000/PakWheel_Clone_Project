import React, { useState } from "react";

// Import API_URL
const API_URL = import.meta.env.VITE_API_URL;

export default function PostAdSection() {

  const apiEndpoint = `${API_URL}/car/create` 

  const [formData, setFormData] = useState({
    title: "",
    make: "",
    model: "",
    vehicalType: "",
    price: "",
    catagory: "",
    city: "",
    year: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Handle standard text & select inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image input & preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Handle form submission to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    // Validate image selection
    if (!imageFile) {
      setMessage({ type: "error", text: "Please upload an image for your listing." });
      setLoading(false);
      return;
    }

    // Prepare FormData payload for Multer
    const data = new FormData();
    data.append("title", formData.title);
    data.append("make", formData.make);
    data.append("model", formData.model);
    data.append("vehicalType", formData.vehicalType);
    data.append("catagory", formData.catagory);
    data.append("price", Number(formData.price));
    data.append("city", formData.city);
    if (formData.year) data.append("year", Number(formData.year));
    data.append("image", imageFile); // 'image' matches Multer upload.single("image")

    try {

      const response = await fetch(apiEndpoint, {
        method: "POST",
        credentials: "include",
        body: data, 
      });

      const responseData = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(responseData?.message || "Failed to create listing.");
      }

      setMessage({ type: "success", text: "Car listing created successfully!" });

      // Reset form on success
      setFormData({
        title: "",
        make: "",
        model: "",
        vehicalType: "",
        catagory: "",
        price: "",
        city: "",
        year: "",
      });
      setImageFile(null);
      setImagePreview(null);
    } catch (err) {
      console.error("Submission error:", err);
      setMessage({ type: "error", text: err.message || "Something went wrong." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-lg shadow-sm p-6 sm:p-8">
        
        {/* Section Header */}
        <div className="border-b border-gray-200 pb-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Post Your Car Ads for sell Sale</h2>
          <p className="text-sm text-gray-500 mt-1">
            Fill in all required fields to register your listing on PakWheels.
          </p>
        </div>

        {/* Feedback Messages */}
        {message.text && (
          <div
            className={`p-3 rounded-md mb-6 text-sm font-medium ${
              message.type === "success"
                ? "bg-green-100 text-green-700 border border-green-200"
                : "bg-red-100 text-red-700 border border-red-200"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Section 1: Listing Details */}
          <div>
            <h3 className="text-md font-semibold text-blue-900 mb-3">1. Listing Info</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ad Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="e.g. Toyota Corolla GLi 1.3 Automatic 2020 for Sale"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vehicle Type
                  </label>
                  <select
                    name="vehicalType"
                    value={formData.vehicalType}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="car">Car</option>
                    <option value="bike">Bike</option>
                  </select>
                </div>
<br />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    placeholder="e.g. Lahore, Karachi, Islamabad"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-md p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  {/*  */}
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    catagory<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="catagory"
                    placeholder="e.g. Used Or New"
                    value={formData.catagory}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-md p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {/*  */}
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Vehicle Specifications */}
          <div>
            <h3 className="text-md font-semibold text-blue-900 mb-3">2. Specifications</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Make (Brand) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="make"
                  placeholder="e.g. Toyota"
                  value={formData.make}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Model <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="model"
                  placeholder="e.g. Corolla"
                  value={formData.model}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                <input
                  type="number"
                  name="year"
                  placeholder="e.g. 2021"
                  value={formData.year}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Pricing & Media */}
          <div>
            <h3 className="text-md font-semibold text-blue-900 mb-3">3. Price & Image</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price (PKR) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  placeholder="e.g. 4500000"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vehicle Image <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                  className="w-full border border-gray-300 rounded-md p-1.5 text-sm file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
            </div>

            {/* Image Preview */}
            {imagePreview && (
              <div className="mt-4">
                <p className="text-xs text-gray-500 mb-2">Image Preview:</p>
                <img
                  src={imagePreview}
                  alt="Vehicle Preview"
                  className="w-40 h-28 object-cover rounded-md border border-gray-200"
                />
              </div>
            )}
          </div>

          {/* Submit CTA */}
          <div className="pt-4 border-t border-gray-200">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-semibold py-3 rounded-md transition-colors text-base"
            >
              {loading ? "Posting Ad..." : "Post Your Car Ad"}
            </button>
          </div>

        </form>
      </div>
    </section>
  );
}